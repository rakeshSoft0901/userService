import { Router } from "express";
import { createUser, getUsers, reSendOtp, signIn, updateProfile, verifyOtp } from "../controllers/user.controller";

const router = Router()

router.get("/getUsers", getUsers)
router.post("/signUp", createUser)
router.post("/verifyOtp", verifyOtp)
router.post("/reSendOtp", reSendOtp)
router.post("/login", signIn)
router.put("/updateProfile/:userId", updateProfile)

export default router
