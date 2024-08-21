import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { VehicleStatement } from '@prisma/client'
import {
  createVehicleStatementService,
  deleteVehicleStatementService,
  getVehicleStatementService,
  getVehicleStatementsService,
  updateVehicleStatementService,
} from './vehicleStatement.services'
import { vehicleStatementFilterableFields } from './vehicleStatement.constants'
import { paginationFields } from '../../../constants/pagination'
import { pick } from '../../../utilities/pick'

// create vehicleStatement controller
export const createVehicleStatement = tryCatch(
  async (req: Request, res: Response) => {
    const result = await createVehicleStatementService(req.body)
    sendRes<VehicleStatement>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Create vehicle statement successfully',
      data: result,
    })
  },
)

// get vehicle statements controller
export const getVehicleStatements = tryCatch(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, vehicleStatementFilterableFields)
    const options = pick(req.query, paginationFields)
    const result = await getVehicleStatementsService(filters, options)
    sendRes<VehicleStatement[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Vehicle statements retrived successfully',
      meta: result?.meta,
      data: result?.data,
    })
  },
)

// get vehicle statement controller
export const getVehicleStatement = tryCatch(
  async (req: Request, res: Response) => {
    const result = await getVehicleStatementService(req?.params?.id)
    sendRes<VehicleStatement>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Vehicle statement retrived successfully',
      data: result,
    })
  },
)

// update vehicle statement controller
export const updateVehicleStatement = tryCatch(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await updateVehicleStatementService(id, req?.body)
    sendRes<VehicleStatement>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Vehicle statement updated successfully',
      data: result,
    })
  },
)

// delete vehicle statement
export const deleteVehicleStatement = tryCatch(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await deleteVehicleStatementService(id)
    sendRes<VehicleStatement | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Vehicle statement deleted successfully',
      data: result,
    })
  },
)
