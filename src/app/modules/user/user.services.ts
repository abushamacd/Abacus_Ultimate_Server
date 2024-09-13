/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../utilities/prisma'
import { Prisma, User } from '@prisma/client'
import cloudinary from 'cloudinary'
import { IUploadFile } from '../../../interface/file'
import { Request } from 'express'
import { FileUploadHelper } from '../../../helpers/FileUploadHelper'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { userSearchableFields } from './user.constants'
import { IUserFilterRequest } from './user.interfaces'
import { ApiError } from '../../../errorFormating/apiError'
import httpStatus from 'http-status'

// get user profile service
export const getUserProfileService = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  return result
}

// update user profile service
export const updateUserProfileService = async (id: string, payload: User) => {
  const { role, password, ...userData } = payload

  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !')
  }

  // phone and email  existency check in another user
  const phoneExist = await prisma.user.findUnique({
    where: {
      phone: userData.phone,
    },
  })

  if (isExist.phone !== phoneExist?.phone && phoneExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Phone number is used in another user',
    )
  }

  if (userData.email) {
    const emailExist = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    })

    if (isExist.email !== emailExist?.email && emailExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Email is used in another user',
      )
    }
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: userData,
  })

  return result
}

// update user role service
export const updateUserRoleService = async (payload: Partial<User>) => {
  const { id, role } = payload
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !')
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: { role: role },
  })

  return result
}

// get user profile service
export const getUserService = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  return result
}

// user photo upload
export const uploadPhotoService = async (req: Request) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req?.user?.id,
    },
  })

  if (user?.public_id) {
    const { public_id } = user
    await cloudinary.v2.uploader.destroy(public_id)
    const file = req.file as IUploadFile
    const photo = await FileUploadHelper.uploadPhoto(file)

    const data: Partial<User> = {
      public_id: photo?.public_id,
      url: photo?.secure_url,
    }

    const result = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data,
    })

    if (!result) {
      throw new Error(`Photo upload failed`)
    }
    return result
  } else {
    const file = req.file as IUploadFile
    const photo = await FileUploadHelper.uploadPhoto(file)

    const data: Partial<User> = {
      public_id: photo?.public_id,
      url: photo?.secure_url,
    }

    const result = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data,
    })

    if (!result) {
      throw new Error(`Photo upload failed`)
    }

    return result
  }
}

// get Users service
export const getUsersService = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<User[]>> => {
  const { limit, page, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map(field => ({
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

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  })
  const total = await prisma.user.count({
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

// delete user service
export const deleteUserService = async (id: string): Promise<User | null> => {
  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
    // include: {
    //   tasks: true,
    // },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
  }

  // if (isExist?.tasks.length > 0) {
  //   throw new Error(
  //     `User is assign to task ${isExist?.tasks[0]?.title}. First remove the user from task ${isExist?.tasks[0]?.title}`,
  //   )
  // }

  const result = await prisma.user.delete({
    where: {
      id,
    },
  })

  return result
}

// update user service
export const updateUserService = async (id: string, payload: User) => {
  const { role, password, ...userData } = payload

  const isExist = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !')
  }

  // phone and email  existency check in another user
  const phoneExist = await prisma.user.findUnique({
    where: {
      phone: userData.phone,
    },
  })

  if (isExist.phone !== phoneExist?.phone && phoneExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Phone number is used in another user',
    )
  }

  if (userData.email) {
    const emailExist = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    })

    if (isExist.email !== emailExist?.email && emailExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Email is used in another user',
      )
    }
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: userData,
  })

  return result
}
