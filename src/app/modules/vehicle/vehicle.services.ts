/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Vehicle, VehicleStatement } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'
import { IVehicleFilterRequest } from './vehicle.interfaces'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { vehiclePopulate, vehicleSearchableFields } from './vehicle.constants'
import { asyncForEach } from '../../../utilities/asyncForEach'

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
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle is already exist')
  }

  const result = await prisma.vehicle.create({
    data,
  })

  if (!result) {
    throw new Error('Vehicle create failed')
  }

  return result
}

// get vehicles service
export const getVehiclesService = async (
  filters: IVehicleFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Vehicle[]> | null> => {
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
            createdAt: 'desc',
          },
    // include: vehiclePopulate,
  })

  if (!result) {
    throw new Error('Vehicle retrived failed')
  }

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

// get vehicle service
export const getVehicleService = async (
  id: string,
): Promise<Vehicle | null> => {
  const result = await prisma.vehicle.findUnique({
    where: {
      id,
    },
    include: vehiclePopulate,
  })

  if (!result) {
    throw new Error('Vehicle retrived failed')
  }

  return result
}

// update vehicle service
export const updateVehicleService = async (
  id: string,
  payload: Partial<Vehicle>,
): Promise<Vehicle | null> => {
  if (payload.comment && payload.comment?.length > 500) {
    throw new Error('Details is too long!')
  }
  const isExist = await prisma.vehicle.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Vehicle not found')
  }

  const result = await prisma.vehicle.update({
    where: {
      id,
    },
    data: payload,
    include: {
      driver: true,
      supervisor: true,
    },
  })

  if (!result) {
    throw new Error('Vehicle update failed')
  }

  return result
}

// delete vehicle service
export const deleteVehicleService = async (
  id: string,
): Promise<Vehicle | null> => {
  const isExist = await prisma.vehicle.findUnique({
    where: {
      id,
    },
    include: {
      vehicleStatements: true,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Vehicle not found')
  }

  const result = await prisma.$transaction(async transactionClient => {
    await asyncForEach(
      isExist?.vehicleStatements,
      async (vehicleStatement: VehicleStatement) => {
        await transactionClient.vehicleStatement.deleteMany({
          where: {
            vehicleId: vehicleStatement?.vehicleId,
          },
        })
      },
    )

    const deletedVehicle = await transactionClient.vehicle.delete({
      where: {
        id,
      },
    })

    return deletedVehicle
  })

  return result
}
