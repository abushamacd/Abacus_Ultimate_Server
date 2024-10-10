import { z } from 'zod'

// Create invoice zod validation schema
export const createInvoiceZod = z.object({
  body: z.object({
    customerName: z.string({
      required_error: 'Customer name is required',
    }),
    date: z.string({
      required_error: 'Date is required',
    }),
    due: z.number().nonnegative({
      message: 'Due is required and should be a non-negative integer',
    }),
    total: z.number().nonnegative({
      message: 'Total is required and should be a non-negative integer',
    }),
    profit: z.number().nonnegative({
      message: 'Profit is required and should be a non-negative integer',
    }),
    note: z.string().max(500).optional(),
    products: z.any({
      required_error: 'Products are required',
    }),
    customerId: z.string({
      required_error: 'Customer ID is required',
    }),
  }),
})
