# Blsky

A simple chat app with **Next.js**, **Node.js**, and **WebSocket** where users can send messages between two windows. The chat history is persisted and available even after closing and reopening the tab.

### Features

- Left and right chat windows, where each side can send messages to the other.
- Message persistence: all messages are saved and accessible after reopening the tab.
- Message flashing: when a message is sent, the receiving window flashes.
- Responsive design: Works seamlessly on both desktop and mobile devices.

### How to Run

```sh
cp .env.example .env
npm run install
npm run build
npm run start
```

Access the app at http://localhost:3000.
