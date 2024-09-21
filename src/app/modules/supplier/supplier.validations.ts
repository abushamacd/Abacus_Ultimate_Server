import { z } from 'zod'

// Create supplier zod validation schema
export const createSupplierZod = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    ownerName: z.string({
      required_error: 'Owner name is required',
    }),
    ownerPhone: z.string({
      required_error: 'Owner phone is required',
    }),
    srName: z.string({
      required_error: 'SR. name is required',
    }),
    srPhone: z.string({
      required_error: 'SR. phone is required',
    }),
    comment: z.string().optional(),
  }),
})
