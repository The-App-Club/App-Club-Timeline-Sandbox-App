import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avator: z.string(),
})

export type User = z.infer<typeof UserSchema>
