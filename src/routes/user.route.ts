import { Router } from "express";
import { createUser } from "../controllers/user.controller";

const router = Router()

router.get("/signUp", createUser)

export default router
