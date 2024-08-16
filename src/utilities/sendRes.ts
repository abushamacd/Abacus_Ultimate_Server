import { Response } from 'express'
import { IApiRes } from '../interface/apiRes'

export const sendRes = <T>(res: Response, data: IApiRes<T>): void => {
  const resData: IApiRes<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  }
  res.status(data.statusCode).send(resData)
}
