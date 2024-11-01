import express from "express";
import getAllData from "../controllers/HistoryController.js";

const router = express.Router();

router.get("/profile", getAllData);
router.post("/profile");

export default router;
