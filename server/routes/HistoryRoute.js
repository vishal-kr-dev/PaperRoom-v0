import express from "express";
import getAllData from "../controllers/HistoryController.js";

const router = express.Router();

router.get("/:id", getAllData);
router.post("/");

export default router;
