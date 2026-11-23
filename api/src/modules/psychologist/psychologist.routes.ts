import { Router } from "express"

import { psychologistController, requirePsychologist } from "./psychologist.dependencies.js"
import { requireAuthMiddleware } from "../../middlewares/requireAuth.middleware.js"


export const psychologistRouter = Router()


psychologistRouter.get(
    "/me",
    requireAuthMiddleware,
    requirePsychologist,
    psychologistController.showProfile
)

psychologistRouter.patch(
    "/",
    requireAuthMiddleware,
    requirePsychologist,
    psychologistController.updatePsychologist
)

psychologistRouter.get(
    "/about",
    psychologistController.getPublicProfile
)