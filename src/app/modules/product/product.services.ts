/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Product } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'
import { IProductFilterRequest } from './product.interfaces'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { productPopulate, productSearchableFields } from './product.constants'
import { JwtPayload } from 'jsonwebtoken'
// import { asyncForEach } from '../../../utilities/asyncForEach'

// create product service
export const createProductService = async (
  user: JwtPayload | null,
  data: Product,
): Promise<Product | null> => {
  data.updateBy = user?.name
  const product = await prisma.product.findFirst({
    where: {
      name: data?.name,
    },
  })

  if (product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product is already exist')
  }

  const result = await prisma.product.create({
    data,
  })

  if (!result) {
    throw new Error('Product create failed')
  }

  return result
}

// get products service
export const getProductsService = async (
  filters: IProductFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Product[]> | null> => {
  const { limit, page, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: productSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          // mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  const whereConditions: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.product.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            name: 'desc',
          },
    include: productPopulate,
  })

  if (!result) {
    throw new Error('Product retrived failed')
  }

  const total = await prisma.product.count({
    where: whereConditions,
  })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

// get product service
export const getProductService = async (
  id: string,
): Promise<Product | null> => {
  const result = await prisma.product.findUnique({
    where: {
      id,
    },
    // include: {
    //   driver: true,
    //   supervisor: true,
    // },
  })

  if (!result) {
    throw new Error('Product retrived failed')
  }

  return result
}

// update product service
export const updateProductService = async (
  id: string,
  payload: Partial<Product>,
): Promise<Product | null> => {
  const isExist = await prisma.product.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found')
  }

  const result = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
    // include: {
    //   driver: true,
    //   supervisor: true,
    // },
  })

  if (!result) {
    throw new Error('Product update failed')
  }

  return result
}

// delete product service
export const deleteProductService = async (
  id: string,
): Promise<Product | null> => {
  const isExist = await prisma.product.findUnique({
    where: {
      id,
    },
    // include: {
    //   // @ts-ignore
    //   tasks: {
    //     orderBy: {
    //       position: 'asc',
    //     },
    //   },
    // },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found')
  }

  const result = await prisma.product.delete({
    where: {
      id,
    },
  })

  // await prisma.$transaction(async transactionClient => {
  //   await asyncForEach(isExist?.sections, async (section: Product) => {
  //     await transactionClient.task.deleteMany({
  //       where: {
  //         sectionId: section?.id,
  //       },
  //     })
  //   })

  //   await transactionClient.section.deleteMany({
  //     where: {
  //       productId: id,
  //     },
  //   })

  //   await transactionClient.product.delete({
  //     where: {
  //       id,
  //     },
  //   })
  // })

  return result
}
