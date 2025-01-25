import { useEffect } from 'react';
import { useRouter } from 'next/router';

import ChatBox from '~/components/ChatBox';

export default function Home() {
  const router = useRouter();
  const roomId = router.query.roomId?.toString() || null;

  useEffect(() => {
    if (!router.isReady) return;

    const el = document.querySelector('input:first-of-type') as HTMLInputElement | null;
    if (el) el?.focus(); // focus the first input

    // auto generate roomId if it doesnt exists
    if (roomId) return;
    router.push(`/?roomId=${Date.now()}`, undefined, { shallow: true });
  }, [router.isReady]);

  return (
    <div className="relative mx-auto grid h-full w-full max-w-[130ch] grid-cols-2 divide-x divide-neutral-200 overflow-hidden rounded-lg border border-neutral-200">
      <ChatBox roomId={roomId} userId={1} />
      <ChatBox roomId={roomId} userId={2} />
    </div>
  );
}
