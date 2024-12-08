import express from 'express'

import saveGoals from '../controllers/goalsController.js'
import verifyUser from '../middleware/verifyUser.js'

const router= express.Router()

router.post("/save", verifyUser, saveGoals)
router.get("/fetch")

export default router