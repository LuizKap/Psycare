import { Router } from "express"

import { psychologistController, requirePsychologist } from "./psychologist.dependencies.js"
import { requireAuthMiddleware } from "../../middlewares/requireAuth.middleware.js"
import { requirePatient } from "../patient/patient.dependencies.js"


export const psychologistRouter = Router()

psychologistRouter.use(
    requireAuthMiddleware
)

psychologistRouter.get(
    "/me",
    requirePsychologist,
    psychologistController.showProfile
)

psychologistRouter.patch(
    "/",
    requirePsychologist,
    psychologistController.updatePsychologist
)

psychologistRouter.get(
    "/about",
    requirePatient
)