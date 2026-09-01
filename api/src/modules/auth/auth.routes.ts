import { Router } from "express";
import { authController } from "./auth.dependencies.js";
import { requireAuthMiddleware } from "../../middlewares/requireAuth.middleware.js";


export const authRouter = Router()

authRouter.post('/register/patient', authController.registerPatient)
authRouter.post('/login/patient', authController.loginPatient)
authRouter.post('/logout', requireAuthMiddleware, authController.logout)
authRouter.post('/register/psychologist', authController.registerPsychologist)
authRouter.post('/login/psychologist', authController.loginPsychologist)
