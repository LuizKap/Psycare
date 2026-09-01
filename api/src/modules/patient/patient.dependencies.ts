import { prisma } from "../../lib/prisma.js";
import { PatientRepository } from "./patient.repository.js";


export const patientRepository = new PatientRepository(prisma)