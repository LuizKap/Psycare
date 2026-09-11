import type { Request, Response } from "express";
import type { PsychologistService } from "./psychologist.service.js";
import type { PsychologistUser } from "../../middlewares/auth.middleware.js";
import { updatePsychologistSchema } from "./psychologist.schema.js";

export class PsychologistController {
    constructor(private psychologistService: PsychologistService) { }

    showProfile = async (req: Request, res: Response) => {
        const user = req.user as PsychologistUser

        const psychologist = await this.psychologistService.showProfile(user.psychologist_id)

        res.json(psychologist)
    }

    updatePsychologist = async (req: Request, res: Response) => {
        const user = req.user as PsychologistUser
        const data = updatePsychologistSchema.parse(req.body)

        const psychologist = await this.psychologistService.updatePsychologist(user.psychologist_id, data)

        res.json({
            psychologist,
            message: 'Dados atualizados'
        })
    }
}