import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import bodyParser from "body-parser";
import db from "./db.js"; // add this at the top


dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

app.use(cors());

// ✅ Webhook must come BEFORE express.json()
app.post("/webhook", bodyParser.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    console.log("✅ Payment succeeded:", paymentIntent.id);
    const stmt = db.prepare(`
      INSERT INTO transactions (id, amount, currency, email, created_at)
      VALUES (?, ?, ?, ?, ?)
    `);

    stmt.run(
      paymentIntent.id,
      paymentIntent.amount,
      paymentIntent.currency,
      paymentIntent.receipt_email || "unknown",
      new Date().toISOString()
    );
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
});

// JSON parsing middleware for other routes
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is live!");
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});
app.get("/transactions", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM transactions ORDER BY created_at DESC");
    const transactions = stmt.all();
    res.json(transactions);
  } catch (err) {
    console.error("Failed to fetch transactions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/prompts", async (req, res) => {
  const prompts = await getPrompts(); // import and call from your getPrompts.js
  res.json(prompts);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

