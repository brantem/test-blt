import { useEffect } from 'react';
import { useRouter } from 'next/router';

import ChatBox from '~/components/ChatBox';

export default function Home() {
  const router = useRouter();
  const roomId = router.query.roomId ? Number(router.query.roomId) : null;

  // auto generate roomId
  useEffect(() => {
    if (!router.isReady) return;
    if (roomId) return;
    router.push(`/?roomId=${Date.now()}`, undefined, { shallow: true });
  }, [router.isReady]);

  return (
    <div className="max-w-[130ch] grid grid-cols-2 divide-x divide-neutral-200 relative rounded-lg overflow-hidden h-full w-full mx-auto border border-neutral-200">
      <ChatBox roomId={roomId} userId={1} />
      <ChatBox roomId={roomId} userId={2} />
    </div>
  );
}
