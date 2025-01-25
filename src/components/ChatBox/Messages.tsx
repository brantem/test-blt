import { cn } from '~/lib/helpers';

import { Message } from '~/types';

type MessagesProps = {
  userId: number;
  data: Message[];
};

export default function Messages({ userId, data }: MessagesProps) {
  // IMPROVE: use a virtualized list with infinite scroll to improve performance
  return (
    <div className="flex flex-1 flex-col-reverse gap-2 p-4">
      {data.map((message) => {
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
  );
}
