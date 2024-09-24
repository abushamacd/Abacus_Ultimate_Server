import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { createProductZod } from './product.validations'
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from './product.controllers'

const router = express.Router()

// example product route
router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.OWNER),
    reqValidate(createProductZod),
    createProduct,
  )
  .get(auth(ENUM_USER_ROLE.OWNER), getProducts)

router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), getProduct)
  .patch(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), updateProduct)
  .delete(auth(ENUM_USER_ROLE.OWNER), deleteProduct)

export default router
