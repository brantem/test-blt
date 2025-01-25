export function useMessages() {
  const messages = [
    {
      id: 1,
      userId: 1,
      content: 'Hello',
      created_at: Date.now() - 1,
    },
    {
      id: 2,
      userId: 2,
      content: 'World',
      created_at: Date.now(),
    },
  ];

  return messages;
}
