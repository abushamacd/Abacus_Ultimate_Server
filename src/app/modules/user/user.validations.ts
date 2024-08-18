import { z } from 'zod'

// Create user zod validation schema
export const createUserZod = z.object({
  body: z.object({
    key: z.string({
      required_error: 'Z: Key name is required',
    }),
  }),
})
