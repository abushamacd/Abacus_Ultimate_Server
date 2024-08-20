import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { createVehicleZod } from './vehicle.validations'
import { createVehicle, getVehicle, getVehicles } from './vehicle.controllers'

const router = express.Router()

// example vehicle route
router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.OWNER),
    reqValidate(createVehicleZod),
    createVehicle,
  )
  .get(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), getVehicles)

router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), getVehicle)

export default router
