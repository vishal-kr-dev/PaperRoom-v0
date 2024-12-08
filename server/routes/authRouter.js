import express from "express";
import { login, register, getDetails } from "../controllers/authController.js";
import verifyUser from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/details", verifyUser, getDetails)

export default router;
