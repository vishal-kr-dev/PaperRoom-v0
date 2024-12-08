import express from 'express'

import verifyUser from '../middleware/verifyUser.js'
import { saveGoals } from "../controllers/goalsController.js";

const router= express.Router()

router.post("/save", verifyUser, saveGoals)

export default router