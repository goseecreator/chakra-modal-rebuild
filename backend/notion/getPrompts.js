import { Client } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

async function getPrompts() {
  try {
    const response = await notion.databases.query({ database_id: databaseId });
    response.results.forEach(page => {
      const title = page.properties.Name.title[0]?.text?.content || "Untitled";
      console.log(`📝 ${title} - ID: ${page.id}`);
    });
  } catch (error) {
    console.error("❌ Failed to fetch prompts:", error.body || error);
  }
}

getPrompts();
