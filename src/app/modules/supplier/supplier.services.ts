/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Supplier } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'
import { ISupplierFilterRequest } from './supplier.interfaces'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { supplierSearchableFields } from './supplier.constants'
// import { asyncForEach } from '../../../utilities/asyncForEach'

// create supplier service
export const createSupplierService = async (
  data: Supplier,
): Promise<Supplier | null> => {
  const supplier = await prisma.supplier.findFirst({
    where: {
      name: data?.name,
    },
  })

  if (supplier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Supplier is already exist')
  }

  const result = await prisma.supplier.create({
    data,
  })

  if (!result) {
    throw new Error('Supplier create failed')
  }

  return result
}

// get suppliers service
export const getSuppliersService = async (
  filters: ISupplierFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Supplier[]> | null> => {
  const { limit, page, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: supplierSearchableFields.map(field => ({
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

  const whereConditions: Prisma.SupplierWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.supplier.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            name: 'asc',
          },
    // include: {
    //   driver: true,
    //   supervisor: true,
    // },
  })

  if (!result) {
    throw new Error('Supplier retrived failed')
  }

  const total = await prisma.supplier.count({
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

// get supplier service
export const getSupplierService = async (
  id: string,
): Promise<Supplier | null> => {
  const result = await prisma.supplier.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        orderBy: {
          name: 'asc',
        },
        include: {
          unit: true,
        },
      },
    },
  })

  if (!result) {
    throw new Error('Supplier retrived failed')
  }

  return result
}

// update supplier service
export const updateSupplierService = async (
  id: string,
  payload: Partial<Supplier>,
): Promise<Supplier | null> => {
  const isExist = await prisma.supplier.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Supplier not found')
  }

  const result = await prisma.supplier.update({
    where: {
      id,
    },
    data: payload,
  })

  if (!result) {
    throw new Error('Supplier update failed')
  }

  return result
}

// delete supplier service
export const deleteSupplierService = async (
  id: string,
): Promise<Supplier | null> => {
  const isExist = await prisma.supplier.findUnique({
    where: {
      id,
    },
    include: {
      products: true,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Supplier not found')
  }

  if (isExist?.products?.length > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Supplier has link with products',
    )
  }

  const result = await prisma.supplier.delete({
    where: {
      id,
    },
  })

  return result
}
