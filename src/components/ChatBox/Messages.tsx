import { cn } from '~/lib/helpers';

import { Message } from '~/types';

type MessagesProps = {
  ref: React.Ref<HTMLDivElement>;
  userId: number;
  data: Message[];
};

export default function Messages({ ref, userId, data }: MessagesProps) {
  // IMPROVE: use a virtualized list with infinite scroll to improve performance
  return (
    <div ref={ref} className="flex flex-1 flex-col-reverse gap-1 overflow-y-auto p-3" tabIndex={-1}>
      {data.map((message) => {
        const isMe = message.userId === userId;
        return (
          <div key={message.id} className={cn('flex', isMe ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'flex items-end gap-3 rounded-xl px-3 py-1',
                isMe ? 'rounded-br-none bg-neutral-200 text-neutral-900' : 'rounded-bl-none bg-neutral-900 text-white',
              )}
            >
              {isMe && <Timestamp isMe>{message.createdAt}</Timestamp>}
              <span>{message.content}</span>
              {!isMe && <Timestamp>{message.createdAt}</Timestamp>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Timestamp({ isMe = false, children }: { isMe?: boolean; children: number }) {
  const createdAt = children * 1000; // sqlite stores timestamps in seconds, so this needs to be converted to milliseconds
  return (
    <span
      className={cn('text-xs', isMe ? 'text-neutral-400' : 'text-neutral-500')}
      title={new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'long' }).format(createdAt)}
    >
      {new Intl.DateTimeFormat('id-ID', { hour: 'numeric', minute: 'numeric' }).format(createdAt)}
    </span>
  );
}
