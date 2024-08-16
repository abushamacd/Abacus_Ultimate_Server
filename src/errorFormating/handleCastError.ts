import { Prisma } from '@prisma/client'
import { IErrorMessage } from '../interface/error'

export const handleCastError = (
  error: Prisma.PrismaClientKnownRequestError
) => {
  let errors: IErrorMessage[] = []
  let message = ''
  const statusCode = 400

  if (error.code === 'P2025') {
    message = (error.meta?.cause as string) || 'Record not found!'
    errors = [
      {
        path: '',
        message,
      },
    ]
  } else if (error.code === 'P2003') {
    if (error.message.includes('delete()` invocation:')) {
      message = 'Delete failed'
      errors = [
        {
          path: '',
          message,
        },
      ]
    }
  }

  return {
    statusCode,
    message,
    errorMessage: errors,
  }
}
