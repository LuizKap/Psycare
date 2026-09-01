import { prisma } from "../../lib/prisma.js";
import { PsychologistRepository } from "./psychologist.repository.js";


export const psychologistRepository = new PsychologistRepository(prisma)