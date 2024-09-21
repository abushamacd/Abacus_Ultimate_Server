import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { createSupplierZod } from './supplier.validations'
import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
} from './supplier.controllers'

const router = express.Router()

// example supplier route
router
  .route('/')
  .post(
    // auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER),
    reqValidate(createSupplierZod),
    createSupplier,
  )
  .get(
    // auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER),
    getSuppliers,
  )

router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), getSupplier)
  .patch(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), updateSupplier)
  .delete(auth(ENUM_USER_ROLE.OWNER), deleteSupplier)

export default router
