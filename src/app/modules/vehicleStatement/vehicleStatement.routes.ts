import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { createVehicleStatementZod } from './vehicleStatement.validations'
import {
  createVehicleStatement,
  deleteVehicleStatement,
  getVehicleStatement,
  getVehicleStatements,
  updateVehicleStatement,
} from './vehicleStatement.controllers'

const router = express.Router()

// example vehicleStatement route
router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.OWNER),
    reqValidate(createVehicleStatementZod),
    createVehicleStatement,
  )
  .get(auth(ENUM_USER_ROLE.OWNER), getVehicleStatements)

router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.OWNER), getVehicleStatement)
  .patch(
    auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER),
    updateVehicleStatement,
  )
  .delete(auth(ENUM_USER_ROLE.OWNER), deleteVehicleStatement)

export default router
