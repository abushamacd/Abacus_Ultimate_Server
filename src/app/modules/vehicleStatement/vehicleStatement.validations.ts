import { z } from 'zod'

// Create vehicleStatement zod validation schema
export const createVehicleStatementZod = z.object({
  body: z.object({
    date: z.string({
      required_error: 'Date is required',
    }),
    route: z.string({
      required_error: 'Route is required',
    }),
    oil: z.number({
      required_error: 'Oil (Liter) is required',
    }),
    income: z.number({
      required_error: 'Income is required',
    }),
    expense: z.number({
      required_error: 'Expense is required',
    }),
    vehicleId: z.string({
      required_error: 'Vehicle Id is required',
    }),
  }),
})
