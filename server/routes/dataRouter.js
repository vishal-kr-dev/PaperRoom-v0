import express from "express";
import { getAllData } from "../controllers/dataController.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/",verifyUser, getAllData);

export default router;
