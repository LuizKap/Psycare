import type { Psychologist, User } from "../../generated/prisma/client.js";
import type { updatePsychologistData } from "./psychologist.schema.js";

export interface IPsychologistRepository {

     findPsychologistByUserId(id: User['id']): Promise<Psychologist | null>

     findPsychologists(): Promise<Psychologist[]>

     findPsychologist(id: Psychologist['id']):Promise<Psychologist | null>

     updatePsychologist(id: Psychologist['id'], updateData: updatePsychologistData): Promise<Psychologist>
}