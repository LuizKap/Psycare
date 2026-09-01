import { AuthController } from "./auth.controller.js";
import { prisma } from '../../lib/prisma.js'
import { AuthRepository } from "./auth.repository.js";
import { AuthService } from "./auth.service.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { patientRepository } from "../patient/patient.dependencies.js";
import { psychologistRepository } from "../psychologist/psychologist.dependencies.js";


export const authRepository = new AuthRepository(prisma)
export const authService = new AuthService(authRepository, patientRepository, psychologistRepository)
export const authController = new AuthController(authService)
export const authMiddlewareInstance = authMiddleware(authRepository)