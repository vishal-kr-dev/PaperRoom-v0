import express from "express";
import dotev from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import HistoryRoute from "./routes/HistoryRoute.js";
import authRouter from "./routes/authRouter.js"

// Load variable from .env file
dotev.config();

//Connection
connectDB();

const app = express();

app.use(cors())
app.use(express.json())

// Routes
app.use("/profile", HistoryRoute);
app.use("/user", authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log(`Server running at port ${PORT}`)
})
