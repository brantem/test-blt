import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function initDb(filename = ':memory:') {
  const db = await open({ filename, driver: sqlite3.Database });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
}
