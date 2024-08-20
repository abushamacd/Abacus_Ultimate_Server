/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Vehicle } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'
import { IVehicleFilterRequest } from './vehicle.interfaces'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { vehicleSearchableFields } from './vehicle.constants'

// create vehicle service
export const createVehicleService = async (
  data: Vehicle,
): Promise<Vehicle | null> => {
  const vehicle = await prisma.vehicle.findFirst({
    where: {
      vNumber: data?.vNumber,
    },
  })

  if (vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'vehicle is already exist')
  }

  const result = await prisma.vehicle.create({
    data,
  })

  if (!result) {
    throw new Error('User create failed')
  }

  return result
}

// get vehicles service
export const getVehiclesService = async (
  filters: IVehicleFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Vehicle[]>> => {
  const { limit, page, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: vehicleSearchableFields.map(field => ({
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

  const whereConditions: Prisma.VehicleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.vehicle.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'asc',
          },
    include: {
      driver: true,
      supervisor: true,
    },
  })

  const total = await prisma.vehicle.count({
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
