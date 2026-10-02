import type { Request, Response } from "express";
import type { PsychologistService } from "./psychologist.service.js";
import { updatePsychologistSchema } from "./psychologist.schema.js";

export class PsychologistController {
    constructor(private psychologistService: PsychologistService) { }

    showProfile = async (req: Request, res: Response) => {
        const psychologist_id = req.psychologistId

        const psychologist = await this.psychologistService.showProfile(psychologist_id)

        res.json(psychologist)
    }

    updatePsychologist = async (req: Request, res: Response) => {
        const psychologist_id = req.psychologistId
        const data = updatePsychologistSchema.parse(req.body)

        const psychologist = await this.psychologistService.updatePsychologist(psychologist_id, data)

        res.json({
            psychologist,
            message: 'Dados atualizados'
        })
    }
}