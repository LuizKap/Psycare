import { Router } from "express";
import { patientController } from "./patient.dependencies.js";
import { requireAuthMiddleware } from "../../middlewares/requireAuth.middleware.js";


export const patientRouter = Router()

patientRouter.get('/me', requireAuthMiddleware, patientController.getPatientProfile)
patientRouter.patch('/', requireAuthMiddleware, patientController.updatePatient)