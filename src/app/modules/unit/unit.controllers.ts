
import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { Unit } from '@prisma/client'
import {createUnitService,  deleteUnitService, getUnitService, getUnitsService,   updateUnitService } from './unit.services'
import { unitFilterableFields } from './unit.constants'
import { paginationFields } from '../../../constants/pagination'
import { pick } from '../../../utilities/pick'

// create unit controller
export const createUnit = tryCatch(async (req: Request, res: Response) => {
  const result = await createUnitService(req.body)
  sendRes<Unit>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create unit successfully',
    data: result,
  })
})



// get units controller
export const getUnits = tryCatch(async (req: Request, res: Response) => {
  const filters = pick(req.query, unitFilterableFields)
  const options = pick(req.query, paginationFields)
  const result = await getUnitsService(filters, options)
  sendRes<Unit[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Units retrived successfully',
    meta: result?.meta,
    data: result?.data,
  })
})

// get unit controller
export const getUnit = tryCatch(async (req: Request, res: Response) => {
  const result = await getUnitService(req?.params?.id)
  sendRes<Unit>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unit retrived successfully',
    data: result,
  })
})

// update unit controller
export const updateUnit = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await updateUnitService(id, req?.body)
  sendRes<Unit>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unit updated successfully',
    data: result,
  })
})

// delete unit
export const deleteUnit = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await deleteUnitService(id)
  sendRes<Unit | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Unit deleted successfully',
    data: result,
  })
})

