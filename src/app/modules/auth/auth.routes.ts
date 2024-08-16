import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import {
  accountActivation,
  changePassword,
  forgetPassword,
  refreshToken,
  resetPassword,
  signIn,
  signUp,
} from './auth.controllers'
import {
  changePasswordZod,
  forgetPasswordZod,
  refreshTokenZod,
  resetPasswordZod,
  signInZod,
  signUpZod,
} from './auth.validations'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.route('/signup').post(reqValidate(signUpZod), signUp)

router.route('/account-active/:token').patch(accountActivation)

router.route('/signin').post(reqValidate(signInZod), signIn)

router.route('/refresh-token').post(reqValidate(refreshTokenZod), refreshToken)

router
  .route('/change-password')
  .patch(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
    reqValidate(changePasswordZod),
    changePassword
  )

router
  .route('/forget-password')
  .patch(reqValidate(forgetPasswordZod), forgetPassword)

router
  .route('/reset-password/:token')
  .patch(reqValidate(resetPasswordZod), resetPassword)

export default router
