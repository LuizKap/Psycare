import { AuthController } from "./auth.controller.js";
import { prisma } from '../../lib/prisma.js'
import { AuthRepository } from "./auth.repository.js";
import { AuthService } from "./auth.service.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

export const authRepository = new AuthRepository(prisma)
export const authService = new AuthService(authRepository)
export const authController = new AuthController(authService)
export const authMiddlewareInstance = authMiddleware(authRepository)