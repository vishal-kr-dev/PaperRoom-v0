import express from "express";
import dotev from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import HistoryRoute from "./routes/HistoryRoute.js";
import authRouter from "./routes/authRouter.js";
import dataRouter from "./routes/dataRouter.js"

// Load variable from .env file
dotev.config();
connectDB();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Routes
app.use("/history", HistoryRoute);
app.use("/user", authRouter);
app.use("/home", dataRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
