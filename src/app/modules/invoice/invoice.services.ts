/* eslint-disable no-unused-vars */
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

    if (data?.due > 0) {
      await transactionClient.user.update({
        where: { id: data.customerId },
        data: { due: { increment: data.due } },
      })
    }

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
  user: any,
  payload: any,
): Promise<Invoice | null> => {
  payload.updateBy = user?.name
  const isExist = await prisma.invoice.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invoice not found')
  }

  if (isExist?.customerId === payload?.customerId) {
    const result = await prisma.$transaction(async transactionClient => {
      await asyncForEach(payload?.removed, async (product: any) => {
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
            data: { quantity: +(findProduct.quantity + product.quantity) },
          })
      })

      const { removed, ...data } = payload
      await transactionClient.user.update({
        where: { id: data.customerId },
        data: { due: { decrement: +(isExist.due - data.due) } },
      })

      if (data?.products?.length <= 0) {
        const result = await prisma.invoice.delete({
          where: {
            id,
          },
        })
        return result
      } else {
        data.products = JSON.stringify(data.products)

        const result = await transactionClient.invoice.update({
          where: {
            id,
          },
          data: data,
        })

        return result
      }
    })

    if (!result) {
      throw new Error('Invoice update failed')
    }

    return result
  } else {
    const result = await prisma.$transaction(async transactionClient => {
      await transactionClient.user.update({
        where: { id: isExist.customerId },
        data: { due: { decrement: isExist.due } },
      })

      await transactionClient.user.update({
        where: { id: payload.customerId },
        data: { due: { increment: payload.due } },
      })

      await asyncForEach(payload?.removed, async (product: any) => {
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
            data: { quantity: +(findProduct.quantity + product.quantity) },
          })
      })

      const { removed, ...data } = payload
      // await transactionClient.user.update({
      //   where: { id: data.customerId },
      //   data: { due: { decrement: +(isExist.due - data.due) } },
      // })

      if (data?.products?.length <= 0) {
        const result = await prisma.invoice.delete({
          where: {
            id,
          },
        })
        return result
      } else {
        data.products = JSON.stringify(data.products)

        const result = await transactionClient.invoice.update({
          where: {
            id,
          },
          data: data,
        })

        return result
      }
    })

    if (!result) {
      throw new Error('Invoice update failed')
    }

    return result
  }

  // return null
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

  if (isExist?.due > 0) {
    throw new Error('First paid the invoice due')
  }

  const result = await prisma.invoice.delete({
    where: {
      id,
    },
  })

  if (!result) {
    throw new Error('Invoice delete failed')
  }

  return result
}

// delete invoices service
export const deleteInvoicesService = async (
  ids: string[],
): Promise<Invoice | null> => {
  const result = await prisma.$transaction(async transactionClient => {
    await asyncForEach(ids, async (id: any) => {
      const isExist = await transactionClient.invoice.findUnique({
        where: {
          id,
        },
      })

      if (!isExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invoice not found')
      }

      if (isExist?.due <= 0) {
        const result = await transactionClient.invoice.delete({
          where: {
            id,
          },
        })

        return result
      }
    })
  })

  return null
}
