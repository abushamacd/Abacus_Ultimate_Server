type IOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: string
}

type IOptionsResult = {
  page: number
  limit: number | undefined
  skip: number
  sortBy: string
  sortOrder: string
}

export const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1)
  // const limit = Number(options.limit || 10)
  // const skip = (page - 1) * limit
  const limit = options.limit !== undefined ? Number(options.limit) : undefined
  const skip = (page - 1) * (limit || 0)
  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  }
}
