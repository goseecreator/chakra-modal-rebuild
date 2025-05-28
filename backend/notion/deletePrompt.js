import { Client } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Paste a valid page ID here
const promptId = "replace-this-with-a-real-page-id";

async function deletePrompt() {
  try {
    await notion.pages.update({
      page_id: promptId,
      archived: true,
    });
    console.log("🗑️ Prompt archived (soft deleted):", promptId);
  } catch (error) {
    console.error("❌ Failed to delete prompt:", error.body || error);
  }
}

deletePrompt();
