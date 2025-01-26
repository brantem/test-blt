import { useEffect } from 'react';
import { useRouter } from 'next/router';

import ChatBox from '~/components/ChatBox';

const generateRandomId = () => window.crypto.randomUUID().split('-')[0]; // shorter

export default function Home() {
  const router = useRouter();
  const roomId = router.query.roomId?.toString() || null;

  useEffect(() => {
    if (!router.isReady) return;

    const el = document.querySelector('input:first-of-type') as HTMLInputElement | null;
    if (el) el?.focus(); // focus the first input

    // auto generate roomId if it doesnt exists
    if (roomId) return;
    // use replace, to replace history from / -> /?roomId=abc
    router.replace(`/?roomId=${generateRandomId()}`, undefined, { shallow: true });
  }, [roomId]);

  return (
    <div className="mx-auto flex size-full max-w-[130ch] flex-col lg:gap-4">
      <div className="flex items-center justify-between lg:gap-2">
        <span
          key={roomId}
          className="animate-flash flex items-center border border-neutral-200 bg-white px-2 py-1 font-mono text-sm max-lg:h-10 max-lg:flex-1 lg:rounded-lg"
        >
          <span className="text-neutral-400 select-none">Room ID:</span>
          <span className="ml-2 select-all">{roomId}</span>
        </span>

        <button
          className="bg-neutral-900 px-3 py-1 text-white max-lg:h-10 lg:rounded-lg"
          onClick={() => {
            // use push so the user can click the back button to navigate back to the previous room
            router.push(`/?roomId=${generateRandomId()}`, undefined, { shallow: true });
          }}
        >
          New Room
        </button>
      </div>

      <div className="grid h-full flex-1 divide-neutral-200 overflow-hidden border-neutral-200 max-lg:divide-y lg:grid-cols-2 lg:divide-x lg:rounded-lg lg:border">
        <ChatBox roomId={roomId} userId={1} />
        <ChatBox roomId={roomId} userId={2} />
      </div>
    </div>
  );
}
