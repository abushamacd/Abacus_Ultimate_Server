import { IErrorResponse } from '../interface/common'
import { Prisma } from '@prisma/client'

export const handleValidationError = (
  error: Prisma.PrismaClientValidationError,
): IErrorResponse => {
  const errors = [
    {
      path: '',
      message: error.message,
    },
  ]
  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors,
  }
}
