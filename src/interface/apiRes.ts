export type IApiRes<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  meta?: {
    page: number
    limit: number | undefined
    total: number
  }
  data?: T | null
}
