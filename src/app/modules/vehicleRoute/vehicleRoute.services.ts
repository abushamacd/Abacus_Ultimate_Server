/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, VehicleRoute } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'
import { IVehicleRouteFilterRequest } from './vehicleRoute.interfaces'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { vehicleRouteSearchableFields } from './vehicleRoute.constants'
// import { asyncForEach } from '../../../utilities/asyncForEach'

// create vehicle route service
export const createVehicleRouteService = async (
  data: VehicleRoute,
): Promise<VehicleRoute | null> => {
  const vehicleRoute = await prisma.vehicleRoute.findFirst({
    where: {
      name: data?.name,
    },
  })

  if (vehicleRoute) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle route is already exist')
  }

  const result = await prisma.vehicleRoute.create({
    data,
  })

  if (!result) {
    throw new Error('Vehicle route create failed')
  }

  return result
}

// get vehicle routes service
export const getVehicleRoutesService = async (
  filters: IVehicleRouteFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<VehicleRoute[]> | null> => {
  const { limit, page, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: vehicleRouteSearchableFields.map(field => ({
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

  const whereConditions: Prisma.VehicleRouteWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.vehicleRoute.findMany({
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
    throw new Error('Vehicle route retrived failed')
  }

  const total = await prisma.vehicleRoute.count({
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

// get vehicle route service
export const getVehicleRouteService = async (
  id: string,
): Promise<VehicleRoute | null> => {
  const result = await prisma.vehicleRoute.findUnique({
    where: {
      id,
    },
  })

  if (!result) {
    throw new Error('VehicleRoute retrived failed')
  }

  return result
}

// update vehicle route service
export const updateVehicleRouteService = async (
  id: string,
  payload: Partial<VehicleRoute>,
): Promise<VehicleRoute | null> => {
  const isExist = await prisma.vehicleRoute.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'VehicleRoute not found')
  }

  const result = await prisma.vehicleRoute.update({
    where: {
      id,
    },
    data: payload,
  })

  if (!result) {
    throw new Error('VehicleRoute update failed')
  }

  return result
}

// delete vehicle route service
export const deleteVehicleRouteService = async (
  id: string,
): Promise<VehicleRoute | null> => {
  const isExist = await prisma.vehicleRoute.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'VehicleRoute not found')
  }

  const result = await prisma.vehicleRoute.delete({
    where: {
      id,
    },
  })

  return result
}
