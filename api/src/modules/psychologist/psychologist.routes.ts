import { Router } from "express";
import { psychologistController } from "./psychologist.dependencies.js";
import { requireAuthMiddleware } from "../../middlewares/requireAuth.middleware.js";
import { requirePsychologistMiddleware } from "../../middlewares/requirePsychologist.middleware.js";


export const psychologistRouter = Router()
psychologistRouter.use(requireAuthMiddleware, requirePsychologistMiddleware)

psychologistRouter.get('/me', psychologistController.showProfile)
psychologistRouter.patch('/', psychologistController.updatePsychologist)