import { z } from 'zod'

// Create vehicleRoute zod validation schema
export const createVehicleRouteZod = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
  }),
})
