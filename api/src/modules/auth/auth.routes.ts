import { Router } from "express";
import { authController, authMiddlewareInstance } from "./auth.dependencies.js";
import { requireAuthMiddleware } from "../../middlewares/requireAuth.middleware.js";


export const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/logout', requireAuthMiddleware, authController.logout)
