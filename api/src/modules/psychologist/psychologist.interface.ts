import type { Psychologist, User } from "../../generated/prisma/client.js";

interface IPsychologistRepository {

     findPsychologistByUserId(id: User['id']): Promise<Psychologist | null>
            
    
}