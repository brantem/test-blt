import { cn } from '~/lib/helpers';
import { useMessages } from '~/lib/hooks';

type ChatBoxProps = {
  userId: number;
};

export default function ChatBox({ userId }: ChatBoxProps) {
  const messages = useMessages();

  return (
    <div className="bg-white flex flex-col divide-y divide-neutral-200" tabIndex={-1}>
      <h1 className="h-10 flex items-center pl-2 font-semibold">User {userId}</h1>
      <div className="flex-1 p-4 flex flex-col-reverse">
        {messages.map((message) => {
          const isMe = message.userId === userId;
          return (
            <div key={message.id} className={cn('flex', isMe ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'rounded-xl px-3 py-1',
                  isMe ? 'bg-neutral-200 rounded-br-none' : 'bg-black text-white rounded-bl-none '
                )}
              >
                {message.content}
              </div>
            </div>
          );
        })}
      </div>
      <form
        className="bg-white flex"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="text" className="px-2 h-10 flex-1" />
        <button
          type="submit"
          className="bg-neutral-800 text-white aspect-square shrink-0 h-full flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
