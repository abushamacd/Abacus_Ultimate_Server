import { z } from 'zod'

// Create product zod validation schema
export const createProductZod = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Product name is required',
    }),

    supplierId: z.string().optional(),
    unitId: z.string({
      required_error: 'Unit is required',
    }),
    quantity: z
      .number({
        required_error: 'Quantity is required',
      })
      .int('Quantity must be an integer')
      .min(0, 'Quantity must be at least 0'),

    minQuantity: z
      .number({
        required_error: 'Minimum quantity is required',
      })
      .int('Minimum quantity must be an integer')
      .min(0, 'Minimum quantity must be at least 0'),
    purchase: z
      .number({
        required_error: 'Purchase price is required',
      })
      .int('Purchase price must be an integer')
      .min(0, 'Purchase price must be at least 0'),
    sell: z
      .number({
        required_error: 'Sell price is required',
      })
      .int('Sell price must be an integer')
      .min(0, 'Sell price must be at least 0'),
    retail: z
      .number({
        required_error: 'Retail price is required',
      })
      .int('Retail price must be an integer')
      .min(0, 'Retail price must be at least 0'),
    comment: z
      .string()
      .max(500, 'Comment can be a maximum of 500 characters')
      .optional(),
  }),
})
