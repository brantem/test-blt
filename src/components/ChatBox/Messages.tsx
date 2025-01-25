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
                'rounded-xl px-3 py-1',
                isMe ? 'rounded-br-none bg-neutral-200 text-neutral-900' : 'rounded-bl-none bg-neutral-900 text-white',
              )}
            >
              {message.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
