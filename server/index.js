import express from "express";
import dotev from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import HistoryRoute from "./routes/HistoryRoute.js";
import authRouter from "./routes/authRouter.js";
import dataRouter from "./routes/dataRouter.js";
import goalsRouter from "./routes/goalsRouter.js"

// Load variable from .env file
dotev.config();
connectDB();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/history", HistoryRoute);
app.use("/user", authRouter);
app.use("/home", dataRouter);
app.use("/goals", goalsRouter)
app.get("/", (req, res) => {
  res.status(200).json({ msg: "The server is up and running" });
});

//const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server running at port 5000`);
});
