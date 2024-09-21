
import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { Supplier } from '@prisma/client'
import {createSupplierService,  deleteSupplierService, getSupplierService, getSuppliersService,   updateSupplierService } from './supplier.services'
import { supplierFilterableFields } from './supplier.constants'
import { paginationFields } from '../../../constants/pagination'
import { pick } from '../../../utilities/pick'

// create supplier controller
export const createSupplier = tryCatch(async (req: Request, res: Response) => {
  const result = await createSupplierService(req.body)
  sendRes<Supplier>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create supplier successfully',
    data: result,
  })
})



// get suppliers controller
export const getSuppliers = tryCatch(async (req: Request, res: Response) => {
  const filters = pick(req.query, supplierFilterableFields)
  const options = pick(req.query, paginationFields)
  const result = await getSuppliersService(filters, options)
  sendRes<Supplier[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Suppliers retrived successfully',
    meta: result?.meta,
    data: result?.data,
  })
})

// get supplier controller
export const getSupplier = tryCatch(async (req: Request, res: Response) => {
  const result = await getSupplierService(req?.params?.id)
  sendRes<Supplier>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier retrived successfully',
    data: result,
  })
})

// update supplier controller
export const updateSupplier = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await updateSupplierService(id, req?.body)
  sendRes<Supplier>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier updated successfully',
    data: result,
  })
})

// delete supplier
export const deleteSupplier = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await deleteSupplierService(id)
  sendRes<Supplier | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Supplier deleted successfully',
    data: result,
  })
})

