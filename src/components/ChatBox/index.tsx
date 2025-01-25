import { useRef } from 'react';

import Messages from './Messages';
import Form from './Form';

import { useChat } from '~/lib/hooks';

type ChatBoxProps = {
  roomId: string | null;
  userId: number;
};

export default function ChatBox({ roomId, userId }: ChatBoxProps) {
  const messagesRef = useRef<HTMLDivElement>(null);

  const { send, messages } = useChat(roomId, userId, {
    onReceive(message) {
      if (message.userId === userId) {
        // scroll current chatbox to the bottom
        messagesRef.current?.scrollTo(0, 0);
      } else {
        // flash the other chatbox
        messagesRef.current?.classList.add('animate-flash');
        setTimeout(() => messagesRef.current?.classList.remove('animate-flash'), 1000);
      }
    },
  });

  return (
    <div className="flex flex-col divide-y divide-neutral-200 overflow-hidden bg-white outline-none">
      <h1 className="flex h-10 items-center pl-2 font-semibold select-none">User {userId}</h1>
      <Messages ref={messagesRef} userId={userId} data={messages} />
      <Form onSubmit={(content) => send({ type: 'message', data: content })} isDisabled={!roomId} />
    </div>
  );
}
