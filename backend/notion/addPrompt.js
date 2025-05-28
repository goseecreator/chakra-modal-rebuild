import { Client } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

const prompt = {
  Title: "Sample Prompt",
  Description: "Generate a creative slogan for a startup.",
  Category: "Marketing",
  Price: "0.0005",
  BTCImpact: 100,
};

async function addPrompt() {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: { title: [{ text: { content: prompt.Title } }] },
        Description: { rich_text: [{ text: { content: prompt.Description } }] },
        Category: { select: { name: prompt.Category } },
        Price: { rich_text: [{ text: { content: prompt.Price } }] },
        BTCImpact: { number: prompt.BTCImpact },
      },
    });
    console.log("✅ Prompt added:", response.id);
  } catch (error) {
    console.error("❌ Failed to add prompt:", error.body || error);
  }
}

addPrompt();
