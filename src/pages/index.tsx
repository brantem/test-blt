import { useEffect } from 'react';
import { useRouter } from 'next/router';

import ChatBox from '~/components/ChatBox';

export default function Home() {
  const router = useRouter();
  const roomId = router.query.roomId?.toString() || null;

  const generateRoomId = () => router.push(`/?roomId=${window.crypto.randomUUID()}`, undefined, { shallow: true });

  useEffect(() => {
    if (!router.isReady) return;

    const el = document.querySelector('input:first-of-type') as HTMLInputElement | null;
    if (el) el?.focus(); // focus the first input

    if (roomId) return;
    generateRoomId(); // auto generate roomId if it doesnt exists
  }, [roomId]);

  return (
    <div className="mx-auto flex size-full max-w-[130ch] flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="rounded-lg border border-neutral-200 bg-white px-2 py-1 font-mono text-sm">
          <span className="text-neutral-400 select-none">Room ID:</span>
          <span className="ml-2 select-all">{roomId}</span>
        </span>

        <button className="rounded-lg bg-neutral-900 px-3 py-1 text-white" onClick={generateRoomId}>
          New Room
        </button>
      </div>

      <div className="grid h-full grid-cols-2 divide-x divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200">
        <ChatBox roomId={roomId} userId={1} />
        <ChatBox roomId={roomId} userId={2} />
      </div>
    </div>
  );
}
