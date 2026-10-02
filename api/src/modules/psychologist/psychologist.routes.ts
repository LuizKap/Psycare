import { Router } from "express"

import { psychologistController, requirePsychologist } from "./psychologist.dependencies.js"
import { requireAuthMiddleware } from "../../middlewares/requireAuth.middleware.js"


export const psychologistRouter = Router()

psychologistRouter.use(
    requireAuthMiddleware,
    requirePsychologist
)

psychologistRouter.get(
    "/me",
    psychologistController.showProfile
)

psychologistRouter.patch(
    "/",
    psychologistController.updatePsychologist
)