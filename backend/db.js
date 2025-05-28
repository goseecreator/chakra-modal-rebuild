// backend/db.js
import Database from "better-sqlite3";

const db = new Database("bitbloom.db");

// Optional: initialize your schema if needed
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    amount INTEGER,
    currency TEXT,
    email TEXT,
    created_at TEXT
  );
`);

export default db; // ✅ make sure this line exists
