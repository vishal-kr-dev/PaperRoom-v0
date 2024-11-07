import express from "express";
<<<<<<< HEAD
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
// import HistoryRoute from "./routes/HistoryRoute.js";
import authRouter from "./routes/authRouter.js"

// Load variable from .env file
dotenv.config();

//Connection
=======
import dotev from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import HistoryRoute from "./routes/HistoryRoute.js";

// Load variable from .env file
dotev.config();
>>>>>>> History
connectDB();

const app = express();

<<<<<<< HEAD
app.use(cors())
app.use(express.json())

// Routes
// app.use("/profile", HistoryRoute);
app.use("/user", authRouter)
=======
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
>>>>>>> History

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
