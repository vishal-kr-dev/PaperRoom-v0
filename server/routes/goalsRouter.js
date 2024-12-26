import express from 'express'

import verifyUser from '../middleware/verifyUser.js'
import { saveGoals, updateGoals, updateSubGoal, deleteGoal } from "../controllers/goalsController.js";

const router= express.Router()

router.post("/save", verifyUser, saveGoals)
router.delete("/delete", verifyUser, deleteGoal);
router.put("/update/:goalId", verifyUser, updateGoals);
router.put("/update-subtask/:goalId/:subtaskId", verifyUser, updateSubGoal);

export default router