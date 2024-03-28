import * as z from "zod"

export const userUpdateSchema = z.object({
    name: z.string().min(3, 'Name must contain at least 3 character').max(100, 'Name must contain maximum 100 character'),
})