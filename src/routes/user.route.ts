import { Router } from "express";
import { createUser, reSendOtp, signIn, verifyOtp } from "../controllers/user.controller";

const router = Router()

router.post("/signUp", createUser)
router.post("/verifyOtp", verifyOtp)
router.post("/reSendOtp", reSendOtp)
router.post("/login", signIn)

export default router
