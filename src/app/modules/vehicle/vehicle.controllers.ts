import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { Vehicle } from '@prisma/client'
import {
  createVehicleService,
  getVehicleService,
  getVehiclesService,
  updateVehicleService,
} from './vehicle.services'
import { vehicleFilterableFields } from './vehicle.constants'
import { paginationFields } from '../../../constants/pagination'
import { pick } from '../../../utilities/pick'

// create vehicle controller
export const createVehicle = tryCatch(async (req: Request, res: Response) => {
  const result = await createVehicleService(req.body)
  sendRes<Vehicle>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create vehicle successfully',
    data: result,
  })
})

// get vehicles controller
export const getVehicles = tryCatch(async (req, res) => {
  const filters = pick(req.query, vehicleFilterableFields)
  const options = pick(req.query, paginationFields)
  const result = await getVehiclesService(filters, options)
  sendRes<Vehicle[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vehicles retrived successfully',
    meta: result?.meta,
    data: result?.data,
  })
})

// get vehicle controller
export const getVehicle = tryCatch(async (req, res) => {
  const result = await getVehicleService(req?.params?.id)
  sendRes<Vehicle>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vehicle retrived successfully',
    data: result,
  })
})

// update vehicle controller
export const updateVehicle = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await updateVehicleService(id, req?.body)
  sendRes<Vehicle>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vehicle updated successfully',
    data: result,
  })
})
