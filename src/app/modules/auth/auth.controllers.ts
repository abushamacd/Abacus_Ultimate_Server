import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { User } from '@prisma/client'
import config from '../../../config'
import { IAuthSigninResponse, IRefreshTokenResponse } from './auth.interfaces'
import {
  accountActivationService,
  changePasswordService,
  forgetPasswordService,
  refreshTokenService,
  resetPasswordService,
  signInService,
  signUpService,
} from './auth.services'

// sign up
export const signUp = tryCatch(async (req: Request, res: Response) => {
  const result = await signUpService(req.body)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: req.body.email
      ? `Check email: ${req.body.email} to active your account`
      : `Sign up successfully`,
    data: result,
  })
})

// account activation
export const accountActivation = tryCatch(async (req, res) => {
  const { token } = req.params
  const result = await accountActivationService(token)
  sendRes(res, {
    statusCode: 200,
    success: true,
    message: 'Account active successfully',
    data: result,
  })
})

// sign in
export const signIn = tryCatch(async (req: Request, res: Response) => {
  const result = await signInService(req.body)

  if (result !== null) {
    const { refreshToken, ...others } = result
    // Set Refresh Token in Cookies
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
      SameSite: 'None',
      maxAge: 365 * 24 * 60 * 60 * 1000,
    }
    res.cookie('refreshToken', refreshToken, cookieOptions)

    sendRes<IAuthSigninResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Sign in successfully',
      data: others,
    })
  } else {
    sendRes<IAuthSigninResponse>(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: true,
      message: 'Sign in failed',
      data: result,
    })
  }
})

// refresh token
export const refreshToken = tryCatch(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await refreshTokenService(refreshToken)

  // Set Refresh Token in Cookies
  // const cookieOptions = {
  //   secure: config.env === 'production',
  //   httpOnly: true,
  // }
  // res.cookie('refreshToken', refreshToken, cookieOptions)

  sendRes<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'New access token successfully',
    data: result,
  })
})

// /change password
export const changePassword = tryCatch(async (req, res) => {
  await changePasswordService(req.body, req.user as Partial<User>)
  sendRes(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully !',
  })
})

// forget password
export const forgetPassword = tryCatch(async (req, res) => {
  const { email } = req.body
  await forgetPasswordService(email)
  sendRes(res, {
    statusCode: 200,
    success: true,
    message: 'Send reset token in you email successfully !',
  })
})
// reset password
export const resetPassword = tryCatch(async (req, res) => {
  const { password } = req.body
  const { token } = req.params
  const result = await resetPasswordService(token, password)
  sendRes(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset successfully',
    data: result,
  })
})
