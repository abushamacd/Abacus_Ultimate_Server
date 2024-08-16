import { IErrorMessage } from './error'

export type IErrorResponse = {
  statusCode: number
  message: string
  errorMessage: IErrorMessage[]
}

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}
