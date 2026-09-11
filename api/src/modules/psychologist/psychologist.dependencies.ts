import { prisma } from "../../lib/prisma.js";
import { PsychologistController } from "./psychologist.controller.js";
import { PsychologistRepository } from "./psychologist.repository.js";
import { PsychologistService } from "./psychologist.service.js";


export const psychologistRepository = new PsychologistRepository(prisma)
export const psychologistService = new PsychologistService(psychologistRepository)
export const psychologistController = new PsychologistController(psychologistService)