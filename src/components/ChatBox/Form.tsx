import { useRef, useState } from 'react';

type FormProps = {
  onSubmit(content: string): void;
  isDisabled: boolean;
};

export default function Form({ onSubmit, isDisabled }: FormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState('');

  return (
    <form
      className="flex bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(content.trim());
        setContent('');
        inputRef.current?.focus(); // refocus input manually
      }}
    >
      <input
        ref={inputRef}
        type="text"
        className="h-10 flex-1 px-2 outline-none disabled:bg-neutral-100"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isDisabled}
        required
        placeholder="Say something..."
      />
      <button
        type="submit"
        className="flex aspect-square h-full shrink-0 items-center justify-center bg-neutral-800 text-white disabled:bg-neutral-200 disabled:text-neutral-400"
        disabled={isDisabled}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
          <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
        </svg>
      </button>
    </form>
  );
}
