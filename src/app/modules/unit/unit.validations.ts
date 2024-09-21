import { z } from 'zod'

// Create unit zod validation schema
export const createUnitZod = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Unit name is required',
    }),
  }),
})
