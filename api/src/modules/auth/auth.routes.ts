import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { prisma } from '../../lib/prisma.js'
import { AuthRepository } from "./auth.repository.js";
import { AuthService } from "./auth.service.js";

const authRepository = new AuthRepository(prisma)
const authService = new AuthService(authRepository)
const authController = new AuthController(authService)

export const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)