import http from 'node:http';
import url from 'node:url';
import next from 'next';
import WebSocket, { WebSocketServer } from 'ws';

import initDb from './lib/db';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const db = await initDb(process.env.DB_PATH);

  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  // store rooms and their connected clients
  const rooms = new Map<string, Set<WebSocket>>();

  // 1. noServer is set to true to handle the upgrade manually and avoid interfering with next ws server (hmr)
  // 2. path is set to /api to prevent immediate disconnection after connecting
  const wss = new WebSocketServer({ noServer: true, path: '/api' });
  wss.on('connection', async (ws, req) => {
    // get roomId and userId
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const roomId = url.searchParams.get('roomId');
    const userId = Number(url.searchParams.get('userId'));

    if (!roomId || !userId) {
      console.log('Missing roomId or userId. Closing connection.');
      return ws.close();
    }

    // add client
    if (!rooms.has(roomId)) rooms.set(roomId, new Set());
    rooms.get(roomId)!.add(ws);

    console.log(`Room ${roomId}: User ${userId} connected`);

    // IMPROVE: fetch and send messages in smaller chunks to improve performance and reduce load

    // send previous messages
    const messages = await db.all(
      `
        SELECT id, user_id AS userId, content, created_at as createdAt
        FROM messages
        WHERE room_id = ?
        ORDER BY created_at DESC
      `,
      roomId,
    );
    ws.send(JSON.stringify({ type: 'previous_messages', data: messages }));

    ws.on('message', async (v) => {
      const { type, data } = JSON.parse(v.toString());
      switch (type) {
        case 'message':
          const message = await db.get(
            `
              INSERT INTO messages (room_id, user_id, content)
              VALUES (?, ?, ?)
              RETURNING id, user_id AS userId, content, created_at as createdAt
            `,
            [roomId, userId, data],
          );

          const clients = rooms.get(roomId);
          if (!clients) return;

          clients.forEach((client) => {
            if (client.readyState !== WebSocket.OPEN) return;

            // send new message
            client.send(JSON.stringify({ type: 'new_message', data: message }));
          });
          break;
      }
    });

    ws.on('close', () => {
      console.log(`Room ${roomId}: User ${userId} disconnected`);

      const clients = rooms.get(roomId);
      if (!clients) return;
      clients.delete(ws);

      if (clients.size !== 0) return;
      rooms.delete(roomId);
    });
  });

  // handle ws upgrade
  server.on('upgrade', function (req, socket, head) {
    const { pathname } = url.parse(req.url!, true);
    if (pathname === '/_next/webpack-hmr') return;
    wss.handleUpgrade(req, socket, head, function done(ws) {
      wss.emit('connection', ws, req);
    });
  });

  server.listen(port);
  console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
});
