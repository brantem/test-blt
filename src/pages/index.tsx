import ChatBox from '~/components/ChatBox';

export default function Home() {
  return (
    <div className="max-w-[130ch] grid grid-cols-2 rounded-lg overflow-hidden h-full divide-x w-full mx-auto border border-neutral-200 divide-neutral-200">
      <ChatBox userId={1} />
      <ChatBox userId={2} />
    </div>
  );
}
