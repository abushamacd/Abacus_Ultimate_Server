import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { User } from '@prisma/client'
import {
  deleteUserService,
  getUserProfileService,
  getUserService,
  getUsersService,
  updateUserAccessService,
  updateUserProfileService,
  updateUserRoleService,
  updateUserService,
  uploadPhotoService,
} from './user.services'
import { pick } from '../../../utilities/pick'
import { userFilterableFields } from './user.constants'
import { paginationFields } from '../../../constants/pagination'

// get user profile controller
export const getUserProfile = tryCatch(async (req, res) => {
  const result = await getUserProfileService(req.user?.id)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User get successfully',
    data: result,
  })
})

// update user profile controller
export const updateUserProfile = tryCatch(async (req, res) => {
  const result = await updateUserProfileService(req.user?.id, req.body)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User update successfully',
    data: result,
  })
})

// update user role controller
export const updateUserRole = tryCatch(async (req, res) => {
  const result = await updateUserRoleService(req.body)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User role update successfully',
    data: result,
  })
})

// update user access controller
export const updateUserAccess = tryCatch(async (req, res) => {
  const result = await updateUserAccessService(req.params.id, req.body)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User access update successfully',
    data: result,
  })
})

// get user
export const getUser = tryCatch(async (req, res) => {
  const result = await getUserService(req.params?.id)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User get successfully',
    data: result,
  })
})

// upload photo
export const uploadPhoto = tryCatch(async (req, res) => {
  const result = await uploadPhotoService(req)
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Photo upload successfully',
    data: result,
  })
})

// get Users
export const getUsers = tryCatch(async (req, res) => {
  const filters = pick(req.query, userFilterableFields)
  const options = pick(req.query, paginationFields)
  const result = await getUsersService(filters, options)
  sendRes<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrived successfully',
    meta: result.meta,
    data: result.data,
  })
})

// delete user
export const deleteUser = tryCatch(async (req, res) => {
  const { id } = req.params
  const result = await deleteUserService(id)
  sendRes<User | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  })
})

// update user controller
export const updateUser = tryCatch(async (req, res) => {
  const result = await updateUserService(req.params.id, req.body)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User update successfully',
    data: result,
  })
})
