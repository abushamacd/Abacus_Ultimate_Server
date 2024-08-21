import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { VehicleRoute } from '@prisma/client'
import {
  createVehicleRouteService,
  deleteVehicleRouteService,
  getVehicleRouteService,
  getVehicleRoutesService,
  updateVehicleRouteService,
} from './vehicleRoute.services'
import { vehicleRouteFilterableFields } from './vehicleRoute.constants'
import { paginationFields } from '../../../constants/pagination'
import { pick } from '../../../utilities/pick'

// create vehicle route controller
export const createVehicleRoute = tryCatch(
  async (req: Request, res: Response) => {
    const result = await createVehicleRouteService(req.body)
    sendRes<VehicleRoute>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create vehicle route successfully',
      data: result,
    })
  },
)

// get vehicle routes controller
export const getVehicleRoutes = tryCatch(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, vehicleRouteFilterableFields)
    const options = pick(req.query, paginationFields)
    const result = await getVehicleRoutesService(filters, options)
    sendRes<VehicleRoute[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Vehicle routes retrived successfully',
      meta: result?.meta,
      data: result?.data,
    })
  },
)

// get vehicle route controller
export const getVehicleRoute = tryCatch(async (req: Request, res: Response) => {
  const result = await getVehicleRouteService(req?.params?.id)
  sendRes<VehicleRoute>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vehicle route retrived successfully',
    data: result,
  })
})

// update vehicle route controller
export const updateVehicleRoute = tryCatch(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await updateVehicleRouteService(id, req?.body)
    sendRes<VehicleRoute>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Vehicle route updated successfully',
      data: result,
    })
  },
)

// delete vehicle route
export const deleteVehicleRoute = tryCatch(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await deleteVehicleRouteService(id)
    sendRes<VehicleRoute | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Vehicle route deleted successfully',
      data: result,
    })
  },
)
