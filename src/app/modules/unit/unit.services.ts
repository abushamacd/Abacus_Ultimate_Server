/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Unit } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'
import { IUnitFilterRequest } from './unit.interfaces'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { unitSearchableFields } from './unit.constants'
// import { asyncForEach } from '../../../utilities/asyncForEach'

// create unit service
export const createUnitService = async (data: Unit): Promise<Unit | null> => {
  const unit = await prisma.unit.findFirst({
    where: {
      name: data?.name,
    },
  })

  if (unit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Unit is already exist')
  }

  const result = await prisma.unit.create({
    data,
  })

  if (!result) {
    throw new Error('Unit create failed')
  }

  return result
}

// get units service
export const getUnitsService = async (
  filters: IUnitFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Unit[]> | null> => {
  const { limit, page, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: unitSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
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

  const whereConditions: Prisma.UnitWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.unit.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  })

  if (!result) {
    throw new Error('Unit retrived failed')
  }

  const total = await prisma.unit.count({
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

// get unit service
export const getUnitService = async (id: string): Promise<Unit | null> => {
  const result = await prisma.unit.findUnique({
    where: {
      id,
    },
  })

  if (!result) {
    throw new Error('Unit retrived failed')
  }

  return result
}

// update unit service
export const updateUnitService = async (
  id: string,
  payload: Partial<Unit>,
): Promise<Unit | null> => {
  const isExist = await prisma.unit.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unit not found')
  }

  const result = await prisma.unit.update({
    where: {
      id,
    },
    data: payload,
  })

  if (!result) {
    throw new Error('Unit update failed')
  }

  return result
}

// delete unit service
export const deleteUnitService = async (id: string): Promise<Unit | null> => {
  const isExist = await prisma.unit.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unit not found')
  }

  const result = await prisma.unit.delete({
    where: {
      id,
    },
  })

  return result
}
