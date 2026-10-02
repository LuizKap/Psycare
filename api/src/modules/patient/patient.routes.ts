import { Router } from "express"

import { patientController, requirePatient } from "./patient.dependencies.js"

import { requireAuthMiddleware } from "../../middlewares/requireAuth.middleware.js"
import upload from "../../middlewares/upload.middleware.js"
import { requirePsychologist } from "../psychologist/psychologist.dependencies.js"


export const patientRouter = Router()

patientRouter.use(
    requireAuthMiddleware
)


patientRouter.get(
    "/me",
    requirePatient,
    patientController.getPatientProfile
)

patientRouter.get(
    "/count",
    requirePsychologist,
    patientController.countPatients
)

patientRouter.patch(
    "/",
    requirePatient,
    patientController.updatePatient
)

patientRouter.patch(
    "/me/profile-picture",
    requirePatient,
    upload.single("file"),
    patientController.uploadProfilePicture
)

patientRouter.delete(
    "/me/profile-picture",
    requirePatient,
    patientController.removeProfilePicture
)