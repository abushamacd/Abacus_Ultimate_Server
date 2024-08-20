import { z } from 'zod'

export const signUpZod = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    phone: z.string({
      required_error: 'Phone number is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
  }),
})

export const signInZod = z.object({
  body: z.object({
    phone: z.string({
      required_error: 'Phone number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

export const refreshTokenZod = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})

export const changePasswordZod = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({
      required_error: 'New password is required',
    }),
  }),
})

export const forgetPasswordZod = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
  }),
})

export const resetPasswordZod = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})
