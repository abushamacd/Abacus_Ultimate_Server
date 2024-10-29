import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { Invoice } from '@prisma/client'
import {
  createInvoiceService,
  deleteInvoiceService,
  getInvoiceService,
  getInvoicesService,
  updateInvoiceService,
} from './invoice.services'
import { invoiceFilterableFields } from './invoice.constants'
import { paginationFields } from '../../../constants/pagination'
import { pick } from '../../../utilities/pick'

// create invoice controller
export const createInvoice = tryCatch(async (req: Request, res: Response) => {
  const result = await createInvoiceService(req.user, req.body)
  sendRes<Invoice>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create invoice successfully',
    data: result,
  })
})

// get invoices controller
export const getInvoices = tryCatch(async (req: Request, res: Response) => {
  const filters = pick(req.query, invoiceFilterableFields)
  const options = pick(req.query, paginationFields)
  const result = await getInvoicesService(filters, options)
  sendRes<Invoice[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invoices retrived successfully',
    meta: result?.meta,
    data: result?.data,
  })
})

// get invoice controller
export const getInvoice = tryCatch(async (req: Request, res: Response) => {
  const result = await getInvoiceService(req?.params?.id)
  sendRes<Invoice>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invoice retrived successfully',
    data: result,
  })
})

// update invoice controller
export const updateInvoice = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await updateInvoiceService(id, req.user, req?.body)
  sendRes<Invoice>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invoice updated successfully',
    data: result,
  })
})

// delete invoice
export const deleteInvoice = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await deleteInvoiceService(id)
  sendRes<Invoice | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Invoice deleted successfully',
    data: result,
  })
})
