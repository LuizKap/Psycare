import type { Psychologist } from "../../generated/prisma/client.js";
import { HttpError } from "../errors/HttpError.js";
import type { IPsychologistRepository } from "./psychologist.interface.js";
import type { updatePsychologistData } from "./psychologist.schema.js";

export class PsychologistService {
    constructor(private psychologistRepository: IPsychologistRepository) { }

    async showProfile(id: Psychologist['id']): Promise<Psychologist> {

        const psychologist = await this.psychologistRepository.findPsychologist(id)
        if (!psychologist) throw new HttpError(404, 'Psicólogo não encontrado')

        return psychologist
    }

    async updatePsychologist(id: Psychologist['id'], data: updatePsychologistData): Promise<Psychologist> {

        const psychologist = await this.psychologistRepository.updatePsychologist(id, data)

        return psychologist
    }
}