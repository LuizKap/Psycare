import { CloudinaryService } from "../../cloudinary/cloudinary.service.js";
import { prisma } from "../../lib/prisma.js";
import { PatientController } from "./patient.controller.js";
import { PatientRepository } from "./patient.repository.js";
import { PatientService } from "./patient.service.js";

export const cloudinaryService = new CloudinaryService()

export const patientRepository = new PatientRepository(prisma)
export const patientService = new PatientService(patientRepository, cloudinaryService)
export const patientController = new PatientController(patientService, cloudinaryService)
