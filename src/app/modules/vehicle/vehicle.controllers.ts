
import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { Vehicle } from '@prisma/client'
import {createVehicleService} from './vehicle.services'

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

