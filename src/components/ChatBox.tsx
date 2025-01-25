import { useState } from 'react';

import { cn } from '~/lib/helpers';
import { useChat } from '~/lib/hooks';

type ChatBoxProps = {
  roomId: number | null;
  userId: number;
};

export default function ChatBox({ roomId, userId }: ChatBoxProps) {
  const [content, setContent] = useState('');

  const { send, messages } = useChat(roomId, userId);

  // TODO: flash

  return (
    <div className="flex flex-col divide-y divide-neutral-200 bg-white outline-none" tabIndex={-1}>
      <h1 className="flex h-10 items-center pl-2 font-semibold">User {userId}</h1>
      <div className="flex flex-1 flex-col-reverse gap-2 p-4">
        {messages.map((message) => {
          const isMe = message.userId === userId;
          return (
            <div key={message.id} className={cn('flex', isMe ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'rounded-xl px-3 py-1',
                  isMe ? 'rounded-br-none bg-neutral-200' : 'rounded-bl-none bg-black text-white',
                )}
              >
                {message.content}
              </div>
            </div>
          );
        })}
      </div>

      <form
        className="flex bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          send({ type: 'message', data: content.trim() });
          setContent('');
        }}
      >
        <input
          type="text"
          className="h-10 flex-1 px-2 outline-none disabled:bg-neutral-100"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setContent((prev) => prev.trim())}
          disabled={!roomId}
        />
        <button
          type="submit"
          className="flex aspect-square h-full shrink-0 items-center justify-center bg-neutral-800 text-white disabled:bg-neutral-200 disabled:text-neutral-400"
          disabled={!roomId}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
