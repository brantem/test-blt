import Messages from './Messages';
import Form from './Form';

import { useChat } from '~/lib/hooks';

type ChatBoxProps = {
  roomId: number | null;
  userId: number;
};

export default function ChatBox({ roomId, userId }: ChatBoxProps) {
  const { send, messages } = useChat(roomId, userId);

  // TODO: flash

  return (
    <div className="flex flex-col divide-y divide-neutral-200 bg-white outline-none" tabIndex={-1}>
      <h1 className="flex h-10 items-center pl-2 font-semibold">User {userId}</h1>
      <Messages userId={userId} data={messages} />
      <Form onSubmit={(content) => send({ type: 'message', data: content })} isDisabled={!roomId} />
    </div>
  );
}
