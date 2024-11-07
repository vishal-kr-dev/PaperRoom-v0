import express from "express";
import { createHistoryEntry, getHistoryEntries } from "../controllers/HistoryController.js";

const router = express.Router();

router.post("/", createHistoryEntry);
router.get("/:userId", getHistoryEntries);

export default router;
