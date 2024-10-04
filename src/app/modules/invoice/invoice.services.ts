/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Invoice } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'
import { IInvoiceFilterRequest } from './invoice.interfaces'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { invoiceSearchableFields } from './invoice.constants'
import { asyncForEach } from '../../../utilities/asyncForEach'

// create invoice service
export const createInvoiceService = async (
  user: any,
  data: any,
): Promise<Invoice | null> => {
  data.updateBy = user?.name

  const lastInvoice = await prisma.invoice.findFirst({
    orderBy: {
      invoiceNumber: 'desc',
    },
  })

  if (lastInvoice) data.invoiceNumber = lastInvoice.invoiceNumber + 1

  const result = await prisma.$transaction(async transactionClient => {
    await asyncForEach(data?.products, async (product: any) => {
      const findProduct = await transactionClient.product.findUnique({
        where: {
          name: product.product,
        },
      })

      if (findProduct)
        await transactionClient.product.update({
          where: {
            name: product.product,
          },
          data: { quantity: +findProduct.quantity - product.quantity },
        })
    })

    data.products = JSON.stringify(data.products)

    const result = await prisma.invoice.create({
      data,
    })

    return result
  })

  if (!result) {
    throw new Error('Invoice create failed')
  }

  return result
}

// get invoices service
export const getInvoicesService = async (
  filters: IInvoiceFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Invoice[]> | null> => {
  const { limit, page, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: invoiceSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          // mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  const whereConditions: Prisma.InvoiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.invoice.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            invoiceNumber: 'desc',
          },
  })

  if (!result) {
    throw new Error('Invoice retrived failed')
  }

  const total = await prisma.invoice.count({
    where: whereConditions,
  })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}

// get invoice service
export const getInvoiceService = async (
  id: string,
): Promise<Invoice | null> => {
  const result = await prisma.invoice.findUnique({
    where: {
      id,
    },
  })

  if (!result) {
    throw new Error('Invoice retrived failed')
  }

  return result
}

// update invoice service
export const updateInvoiceService = async (
  id: string,
  payload: any,
): Promise<Invoice | null> => {
  const isExist = await prisma.invoice.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invoice not found')
  }

  const result = await prisma.invoice.update({
    where: {
      id,
    },
    data: payload,
  })

  if (!result) {
    throw new Error('Invoice update failed')
  }

  return result
}

// delete invoice service
export const deleteInvoiceService = async (
  id: string,
): Promise<Invoice | null> => {
  const isExist = await prisma.invoice.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invoice not found')
  }

  const products: any = isExist.products
  const data = JSON.parse(products)

  const result = await prisma.$transaction(async transactionClient => {
    await asyncForEach(data, async (product: any) => {
      const findProduct = await transactionClient.product.findUnique({
        where: {
          name: product.product,
        },
      })

      if (findProduct)
        await transactionClient.product.update({
          where: {
            name: product.product,
          },
          data: { quantity: +findProduct.quantity + product.quantity },
        })
    })

    const result = await prisma.invoice.delete({
      where: {
        id,
      },
    })

    return result
  })

  if (!result) {
    throw new Error('Invoice delete failed')
  }

  return result
}
