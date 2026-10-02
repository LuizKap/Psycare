import type { Request, Response } from "express";
import type { PatientService } from "./patient.service.js";
import { updatePatientSchema } from "./patient.schema.js";
import { HttpError } from "../errors/HttpError.js";



export class PatientController {
    constructor(
        private patientService: PatientService,
    ) { }

    getPatientProfile = async (req: Request, res: Response) => {
        const patient_id = req.patientId

        const patient = await this.patientService.getPatientProfile(patient_id)

        res.json(patient)
    }

    countPatients = async (req: Request, res: Response) => {
        const count = await this.patientService.countPatients()
        res.json(count)
    }

    updatePatient = async (req: Request, res: Response) => {
        const patient_id = req.patientId
        const updatedData = updatePatientSchema.parse(req.body)

        const updatedPatient = await this.patientService.updatePatient(patient_id, updatedData)

        res.json(updatedPatient)
    }

    uploadProfilePicture = async (req: Request, res: Response) => {
        const patient_id = req.patientId
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
        const patient_id = req.patientId

        const patient = await this.patientService.removeProfilePicture(patient_id)

        res.json(patient)
    }

}