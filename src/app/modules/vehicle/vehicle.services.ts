import { Vehicle } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'

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
