import { useEffect, useRef, useState } from 'react';

import type { Message } from '~/types';

export function useChat(roomId: number | null, userId: number) {
  const wsRef = useRef<WebSocket>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!roomId) return;

    // TODO: url
    const ws = new WebSocket(`ws://localhost:3000/api?roomId=${roomId}&userId=${userId}`);
    wsRef.current = ws;

    ws.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data);
      switch (type) {
        case 'new_message':
          setMessages((prev) => [data, ...prev]);
          break;
      }
    };

    return () => {
      ws.close();
    };
  }, [roomId]);

  return {
    messages,
    send(message: Record<string, any>) {
      if (wsRef.current?.readyState !== WebSocket.OPEN) return;
      wsRef.current.send(JSON.stringify(message));
    },
  };
}
