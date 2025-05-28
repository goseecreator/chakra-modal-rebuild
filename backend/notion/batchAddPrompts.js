import { Client } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

const prompts = [
  {
    Title: "Name a new pet brand",
    Description: "Come up with a unique name for a premium pet accessory brand.",
    Category: "Branding",
    Price: "0.001",
    BTCImpact: 200,
  },
  {
    Title: "Create a product hook",
    Description: "Write a 1-line hook for a mental wellness app.",
    Category: "Copywriting",
    Price: "0.0008",
    BTCImpact: 150,
  },
];

async function batchAdd() {
  for (const prompt of prompts) {
    try {
      const res = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          Name: { title: [{ text: { content: prompt.Title } }] },
          Description: { rich_text: [{ text: { content: prompt.Description } }] },
          Category: { select: { name: prompt.Category } },
          Price: { rich_text: [{ text: { content: prompt.Price } }] },
          BTCImpact: { number: prompt.BTCImpact },
        },
      });
      console.log("✅ Added:", res.id);
    } catch (err) {
      console.error("❌ Error adding prompt:", prompt.Title, err.body || err);
    }
  }
}

batchAdd();
