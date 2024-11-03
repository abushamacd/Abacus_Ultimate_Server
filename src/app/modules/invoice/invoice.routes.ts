import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { createInvoiceZod } from './invoice.validations'
import {
  createInvoice,
  deleteInvoice,
  deleteInvoices,
  getInvoice,
  getInvoices,
  updateInvoice,
} from './invoice.controllers'

const router = express.Router()

// example invoice route
router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER),
    reqValidate(createInvoiceZod),
    createInvoice,
  )
  .get(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), getInvoices)
  .delete(auth(ENUM_USER_ROLE.OWNER), deleteInvoices)

router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), getInvoice)
  .patch(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), updateInvoice)
  .delete(auth(ENUM_USER_ROLE.OWNER), deleteInvoice)

export default router
