import { Router } from "express";
import { authController } from "./auth.dependencies.js";
import { requireAuthMiddleware } from "../../middlewares/requireAuthMiddleware.js";


export const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/logout', requireAuthMiddleware, authController.logout)
