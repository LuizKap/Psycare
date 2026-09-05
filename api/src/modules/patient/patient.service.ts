import type { CloudinaryService } from "../../cloudinary/cloudinary.service.js";
import type { Patient } from "../../generated/prisma/client.js";
import { HttpError } from "../errors/HttpError.js";

import type { IPatientRepository } from "./patient.interface.js";
import type { UpdatePatientData } from "./patient.schema.js";



export class PatientService {
    constructor(
        private patientRepository: IPatientRepository,
        private cloudinaryService: CloudinaryService
    ) { }

    async getPatientProfile(patient_id: Patient['id']): Promise<Patient> {

        const patient = await this.patientRepository.findPatientById(patient_id)
        if (!patient) throw new HttpError(404, 'Paciente não encontrado')

        return patient
    }

    async updatePatient(id: Patient['id'], updateData: UpdatePatientData
    ): Promise<Patient> {

        return await this.patientRepository.updatePatient(id, updateData)

    }

    async uploadProfilePicture(patient_id: Patient['id'], file: Buffer
    ): Promise<Patient> {

        try {
            const imageUrl = await this.cloudinaryService.uploadImage(file)

            const patient = await this.patientRepository.saveProfilePicture(patient_id, imageUrl)

            return patient

        } catch (error) {

            throw new HttpError(502, 'Erro ao processar imagem')
        }
    }

    async removeProfilePicture(patient_id: Patient['id']): Promise<Patient>{
        
        const patient = await this.patientRepository.removeProfilePicture(patient_id)

        return patient
    }
}