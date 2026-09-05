import { Router } from "express";
import { patientController } from "./patient.dependencies.js";
import { requireAuthMiddleware } from "../../middlewares/requireAuth.middleware.js";
import { requirePatientMiddleware } from "../../middlewares/requirePatient.middleware.js";
import upload from '../../middlewares/upload.middleware.js'

export const patientRouter = Router()
patientRouter.use(requireAuthMiddleware, requirePatientMiddleware)

patientRouter.get('/me', patientController.getPatientProfile)
patientRouter.patch('/', patientController.updatePatient)
patientRouter.patch('/me/profile-picture', upload.single('file'), patientController.uploadProfilePicture)
patientRouter.patch('/me/profile-picture/remove', patientController.removeProfilePicture)