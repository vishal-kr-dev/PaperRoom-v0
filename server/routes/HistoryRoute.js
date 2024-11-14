import express from "express";
import { createHistoryEntry, getHistoryEntries } from "../controllers/HistoryController.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/",verifyUser, createHistoryEntry);
router.get("/:userId", getHistoryEntries);

export default router;
