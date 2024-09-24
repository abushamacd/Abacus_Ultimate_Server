import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { Product } from '@prisma/client'
import {
  createProductService,
  deleteProductService,
  getProductService,
  getProductsService,
  updateProductService,
} from './product.services'
import { productFilterableFields } from './product.constants'
import { paginationFields } from '../../../constants/pagination'
import { pick } from '../../../utilities/pick'

// create product controller
export const createProduct = tryCatch(async (req: Request, res: Response) => {
  const result = await createProductService(req.user, req.body)
  sendRes<Product>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create product successfully',
    data: result,
  })
})

// get products controller
export const getProducts = tryCatch(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields)
  const options = pick(req.query, paginationFields)
  const result = await getProductsService(filters, options)
  sendRes<Product[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products retrived successfully',
    meta: result?.meta,
    data: result?.data,
  })
})

// get product controller
export const getProduct = tryCatch(async (req: Request, res: Response) => {
  const result = await getProductService(req?.params?.id)
  sendRes<Product>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrived successfully',
    data: result,
  })
})

// update product controller
export const updateProduct = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await updateProductService(id, req?.body)
  sendRes<Product>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  })
})

// delete product
export const deleteProduct = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await deleteProductService(id)
  sendRes<Product | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  })
})
