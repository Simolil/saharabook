import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Stripe Integration Placeholder
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, currency } = req.body;
      // In a real app, you'd initialize Stripe here
      // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      // const paymentIntent = await stripe.paymentIntents.create({ amount, currency });
      res.json({ clientSecret: "mock_secret_" + Math.random().toString(36).substring(7) });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bivouac.ma Server running on http://localhost:${PORT}`);
  });
}

startServer();
