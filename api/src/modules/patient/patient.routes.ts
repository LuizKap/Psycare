import { Router } from "express"

import { patientController } from "./patient.dependencies.js"

import { requireAuthMiddleware } from "../../middlewares/requireAuth.middleware.js"
import { requirePatientMiddleware } from "../../middlewares/requirePatient.middleware.js"
import upload from "../../middlewares/upload.middleware.js"
import { requirePsychologistMiddleware } from "../../middlewares/requirePsychologist.middleware.js"


export const patientRouter = Router()

patientRouter.use(
    requireAuthMiddleware
)


patientRouter.get(
    "/me",
    requirePatientMiddleware,
    patientController.getPatientProfile
)

patientRouter.get(
    "/count",
    requirePsychologistMiddleware,
    patientController.countPatients
)

patientRouter.patch(
    "/",
    requirePatientMiddleware,
    patientController.updatePatient
)

patientRouter.patch(
    "/me/profile-picture",
    requirePatientMiddleware,
    upload.single("file"),
    patientController.uploadProfilePicture
)

patientRouter.delete(
    "/me/profile-picture",
    requirePatientMiddleware,
    patientController.removeProfilePicture
)