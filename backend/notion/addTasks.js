const { Client } = require("@notionhq/client");

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Replace with your actual Database ID
const databaseId = process.env.NOTION_DATABASE_ID;

// Example task data
const tasks = [
  {
    Task: "Webhook endpoint logs successful transactions",
    Status: "Done",
    Type: "Backend",
    Priority: "High",
    RelatedArea: "Stripe"
  },
  {
    Task: "Add thank-you modal post-payment",
    Status: "In Progress",
    Type: "Frontend",
    Priority: "Medium",
    RelatedArea: "UI/UX"
  }
  // Add more tasks as needed
];

async function addTasks() {
  for (const task of tasks) {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Task: {
          title: [
            {
              text: {
                content: task.Task
              }
            }
          ]
        },
        Status: {
          select: {
            name: task.Status
          }
        },
        Type: {
          select: {
            name: task.Type
          }
        },
        Priority: {
          select: {
            name: task.Priority
          }
        },
        "Related Area": {
          rich_text: [
            {
              text: {
                content: task.RelatedArea
              }
            }
          ]
        }
      }
    });
  }
  console.log("Tasks added successfully!");
}

addTasks().catch(console.error);
