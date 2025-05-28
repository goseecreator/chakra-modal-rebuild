// backend/migration/addPriceColumn.js
import db from "../db.js"; // reuse your existing db setup

try {
  db.prepare("ALTER TABLE transactions ADD COLUMN price INTEGER").run();
  console.log("✅ 'price' column added to transactions table.");
} catch (err) {
  if (err.message.includes("duplicate column name")) {
    console.log("ℹ️ 'price' column already exists.");
  } else {
    console.error("❌ Failed to add column:", err.message);
  }
}
