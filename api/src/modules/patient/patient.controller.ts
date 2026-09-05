import type { Request, Response } from "express";
import type { PatientService } from "./patient.service.js";
import type { PatientUser } from "../../middlewares/auth.middleware.js";
import { updatePatientSchema } from "./patient.schema.js";
import { HttpError } from "../errors/HttpError.js";
import type { CloudinaryService } from "../../cloudinary/cloudinary.service.js";


export class PatientController {
    constructor(
        private patientService: PatientService,
        private cloudinaryService: CloudinaryService
    ) { }

    getPatientProfile = async (req: Request, res: Response) => {
        const user = req.user as PatientUser

        const patient = await this.patientService.getPatientProfile(user.patient_id)

        res.json(patient)
    }

    updatePatient = async (req: Request, res: Response) => {
        const { patient_id } = req.user as PatientUser
        const updatedData = updatePatientSchema.parse(req.body)

        const updatedPatient = await this.patientService.updatePatient(patient_id, updatedData)

        res.json(updatedPatient)
    }

    uploadProfilePicture = async (req: Request, res: Response) => {
        const { patient_id } = req.user as PatientUser
        const file = req.file

        if (!file) {
            throw new HttpError(400, 'Imagem não enviada')
        }

        const patient = await this.patientService.uploadProfilePicture(
            patient_id,
            file.buffer
        )

        res.json(patient)
    }

    removeProfilePicture = async (req: Request, res: Response) => {
        const {patient_id} = req.user as PatientUser

        const patient = await this.patientService.removeProfilePicture(patient_id)

        res.json(patient)
    }

}