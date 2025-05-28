import { Client } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

const prompts = pages.map((page) => {
    return {
      id: page.id,
      title: page.properties.Title?.title?.[0]?.plain_text || "Untitled",
      description: page.properties.Description?.rich_text?.[0]?.plain_text || "",
      category: page.properties.Category?.select?.name || "General",
      BTCImpact: page.properties.BTCImpact?.number || 0,
      price: page.properties.Price?.number || 500, // 💵 fallback to 500 cents = $5
    };
  });
  

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
