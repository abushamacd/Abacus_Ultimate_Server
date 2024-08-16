/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import config from '../config'
import { IErrorMessage } from '../interface/error'
import { handleValidationError } from '../errorFormating/handleValidationError'
import { ApiError } from '../errorFormating/apiError'
import { errorLogger } from '../utilities/logger'
import { ZodError } from 'zod'
import { handleZodError } from '../errorFormating/handleZodError'
import { handleCastError } from '../errorFormating/handleCastError'
import { Prisma } from '@prisma/client'

export const globalError: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 400
  let message = 'Something went wrong'
  let errorMessage: IErrorMessage[] = []

  // Dependency
  config.env === 'development'
    ? console.log(`Global Error Handler ==`, error)
    : errorLogger.error(`Global Error Handler ==`, error)

  // Check
  if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessage = simplifiedError.errorMessage
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  // Return Response
  res.status(statusCode).send({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
}
