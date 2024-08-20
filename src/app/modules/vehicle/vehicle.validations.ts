import { z } from 'zod'

// Create vehicle zod validation schema
export const createVehicleZod = z.object({
  body: z.object({
    vNumber: z.string({
      required_error: 'Vehicle number is required',
    }),
    route: z.string({
      required_error: 'Vehicle route is required',
    }),
    driverId: z.string({
      required_error: 'Driver ID is required',
    }),
    supervisorId: z.string({
      required_error: 'Supervisor ID is required',
    }),
  }),
})
