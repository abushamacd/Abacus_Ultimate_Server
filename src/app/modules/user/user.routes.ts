import express from 'express'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import {
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  updateUser,
  updateUserProfile,
  updateUserRole,
  uploadPhoto,
} from './user.controllers'
import { FileUploadHelper } from '../../../helpers/FileUploadHelper'

const router = express.Router()

// get all user
router
  .route('/')
  .get(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), getUsers)

// get & update my profile
router
  .route('/profile')
  .get(
    auth(
      ENUM_USER_ROLE.OWNER,
      ENUM_USER_ROLE.MANAGER,
      ENUM_USER_ROLE.STAFF,
      ENUM_USER_ROLE.RETAILER,
      ENUM_USER_ROLE.CONSUMER,
    ),
    getUserProfile,
  )
  .patch(auth(ENUM_USER_ROLE.OWNER), updateUserProfile)

router.route('/changeRole').patch(auth(ENUM_USER_ROLE.OWNER), updateUserRole)

router
  .route('/photo')
  .post(
    auth(
      ENUM_USER_ROLE.OWNER,
      ENUM_USER_ROLE.MANAGER,
      ENUM_USER_ROLE.STAFF,
      ENUM_USER_ROLE.RETAILER,
      ENUM_USER_ROLE.CONSUMER,
    ),
    FileUploadHelper.upload.single('images'),
    uploadPhoto,
  )

router.route('/:id').get(getUser).patch(auth(ENUM_USER_ROLE.OWNER), updateUser)

router.route('/:id').delete(auth(ENUM_USER_ROLE.OWNER), deleteUser)

export default router
