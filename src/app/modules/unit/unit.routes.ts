import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { createUnitZod } from './unit.validations'
import {
  createUnit,
  deleteUnit,
  getUnit,
  getUnits,
  updateUnit,
} from './unit.controllers'

const router = express.Router()

// example unit route
router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER),
    reqValidate(createUnitZod),
    createUnit,
  )
  .get(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), getUnits)

router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), getUnit)
  .patch(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), updateUnit)
  .delete(auth(ENUM_USER_ROLE.OWNER), deleteUnit)

export default router
