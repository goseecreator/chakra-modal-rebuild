// backend/db.js
import Database from "better-sqlite3";
const db = new Database("bitbloom.db");

// Create table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    amount INTEGER,
    currency TEXT,
    email TEXT,
    created_at TEXT
  );
`);

export default db;
