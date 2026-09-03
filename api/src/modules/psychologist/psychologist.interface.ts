import type { Psychologist, User } from "../../generated/prisma/client.js";

export interface IPsychologistRepository {

     findPsychologistByUserId(id: User['id']): Promise<Psychologist | null>

     findPsychologist(): Promise<Psychologist[]>
}