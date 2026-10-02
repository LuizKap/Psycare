import { prisma } from "../../lib/prisma.js";
import { requirePsychologistMiddleware } from "../../middlewares/requirePsychologist.middleware.js";
import { PsychologistController } from "./psychologist.controller.js";
import { PsychologistRepository } from "./psychologist.repository.js";
import { PsychologistService } from "./psychologist.service.js";


export const psychologistRepository = new PsychologistRepository(prisma)
export const psychologistService = new PsychologistService(psychologistRepository)
export const psychologistController = new PsychologistController(psychologistService)
export const requirePsychologist = requirePsychologistMiddleware(psychologistRepository)