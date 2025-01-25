import { useEffect, useRef, useState } from 'react';

import type { Message } from '~/types';

export function useChat(
  roomId: number | null,
  userId: number,
  options?: {
    onReceive?: (message: Message) => void;
  },
) {
  const wsRef = useRef<WebSocket>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const ws = new WebSocket(`ws://${window.location.host}/api?roomId=${roomId}&userId=${userId}`);
    wsRef.current = ws;

    ws.onmessage = (e) => {
      const { type, data } = JSON.parse(e.data);
      switch (type) {
        case 'previous_messages':
          setMessages(data);
          break;
        case 'new_message':
          setMessages((prev) => [data, ...prev]);
          options?.onReceive?.(data);
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
