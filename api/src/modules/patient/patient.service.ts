import type { Patient } from "../../generated/prisma/client.js";
import { HttpError } from "../errors/HttpError.js";

import type { IPatientRepository } from "./patient.interface.js";
import type { UpdatePatientData } from "./patient.schema.js";


export class PatientService {
    constructor(private patientRepository: IPatientRepository) { }

    async getPatientProfile(patient_id: Patient['id']): Promise<Patient> {

        const patient = await this.patientRepository.findPatientById(patient_id)
        if (!patient) throw new HttpError(404, 'Paciente não encontrado')

        return patient
    }

    async updatePatient(id: Patient['id'], updateData: UpdatePatientData
    ): Promise<Patient> {

        const { name, phone } = updateData

        const patient = await this.patientRepository.findPatientById(id)

        if (!patient) {
            throw new HttpError(404, 'Paciente não encontrado')
        }

        return await this.patientRepository.updatePatient(id, updateData)
    }
}