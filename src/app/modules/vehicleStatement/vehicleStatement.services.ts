/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, VehicleStatement } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'
import { IVehicleStatementFilterRequest } from './vehicleStatement.interfaces'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { vehicleStatementSearchableFields } from './vehicleStatement.constants'
// import { asyncForEach } from '../../../utilities/asyncForEach'

// create vehicleStatement service
export const createVehicleStatementService = async (
  data: VehicleStatement,
): Promise<VehicleStatement | null> => {
  const vehicle = await prisma.vehicle.findFirst({
    where: {
      id: data?.vehicleId,
    },
  })

  if (!vehicle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Vehicle not found')
  }

  const result = await prisma.$transaction(async transactionClient => {
    const vStatement = await prisma.vehicleStatement.create({
      data,
    })

    vehicle.oil += vStatement?.oil
    vehicle.income += vStatement?.income
    vehicle.expense += vStatement?.expense
    vehicle.welfare += vStatement?.welfare
    vehicle.servicing += vStatement?.servicing

    await transactionClient.vehicle.update({
      where: {
        id: vStatement?.vehicleId,
      },
      data: vehicle,
    })

    return vStatement
  })

  return result
}

// get vehicle statements service
export const getVehicleStatementsService = async (
  filters: IVehicleStatementFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<VehicleStatement[]> | null> => {
  const { limit, page, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: vehicleStatementSearchableFields.map(field => ({
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

  const whereConditions: Prisma.VehicleStatementWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.vehicleStatement.findMany({
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
    throw new Error('Vehicle statement retrived failed')
  }

  const total = await prisma.vehicleStatement.count({
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

// get vehicleStatement service
export const getVehicleStatementService = async (
  id: string,
): Promise<VehicleStatement | null> => {
  const result = await prisma.vehicleStatement.findUnique({
    where: {
      id,
    },
    include: {
      driver: true,
      supervisor: true,
    },
  })

  if (!result) {
    throw new Error('VehicleStatement retrived failed')
  }

  return result
}

// update vehicleStatement service
export const updateVehicleStatementService = async (
  id: string,
  payload: Partial<VehicleStatement>,
): Promise<VehicleStatement | null> => {
  const isExist = await prisma.vehicleStatement.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'VehicleStatement not found')
  }

  const result = await prisma.vehicleStatement.update({
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
    throw new Error('VehicleStatement update failed')
  }

  return result
}

// delete vehicleStatement service
export const deleteVehicleStatementService = async (
  id: string,
): Promise<VehicleStatement | null> => {
  const isExist = await prisma.vehicleStatement.findUnique({
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
    throw new ApiError(httpStatus.BAD_REQUEST, 'VehicleStatement not found')
  }

  const result = await prisma.vehicleStatement.delete({
    where: {
      id,
    },
  })

  // await prisma.$transaction(async transactionClient => {
  //   await asyncForEach(isExist?.sections, async (section: VehicleStatement) => {
  //     await transactionClient.task.deleteMany({
  //       where: {
  //         sectionId: section?.id,
  //       },
  //     })
  //   })

  //   await transactionClient.section.deleteMany({
  //     where: {
  //       vehicleStatementId: id,
  //     },
  //   })

  //   await transactionClient.vehicleStatement.delete({
  //     where: {
  //       id,
  //     },
  //   })
  // })

  return result
}
