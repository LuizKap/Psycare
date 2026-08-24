import {z} from 'zod'

const globalIdSchema = z.object({
    id: z.uuid()
})