import { User } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import bcrypt from 'bcrypt'
import config from '../../../config'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'
import { createToken, verifyToken } from '../../../helpers/jwtHelpers'
import { Secret } from 'jsonwebtoken'
import {
  IAuthSignin,
  IAuthSigninResponse,
  IChangePassword,
  IRefreshTokenResponse,
} from './auth.interfaces'
import { isExist, isPasswordMatched } from './auth.utils'
import sendEmail from '../../../utilities/emailSender'

// sign up
export const signUpService = async (data: User): Promise<User | null> => {
  const { email, phone } = data
  // existency check
  const [userEmail, userPhone] = await Promise.all([
    email && isExist(email),
    isExist(phone),
  ])

  if (userEmail || userPhone) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `${userEmail ? 'Email' : ''}${userEmail && userPhone ? ' & ' : ''}${
        userPhone ? 'Phone number' : ''
      } already ${userEmail || userPhone ? 'exists' : ''}`,
    )
  }

  // save new user
  data.role = 'Consumer'
  data.password = '123456'
  if (email) data.hasAccess = false

  const { password } = data
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_solt_round),
  )
  data.password = hashedPassword

  if (email)
    data.activationToken = createToken(
      { email, phone },
      config.jwt.activation_secret as Secret,
      config.jwt.activation_secret_expires_in as string,
    )

  const result = await prisma.user.create({
    data,
  })

  if (!result) {
    throw new Error(`User create failed`)
  }

  // send activation link
  if (email) {
    const emailData = {
      to: email,
      receiver: data.name,
      subject: `Account Activation`,
      link: `${config.client_url}/${config.db_path}/account-active/${data.activationToken}`,
      button_text: `Activation`,
      expTime: `1 hours`,
    }
    sendEmail(emailData)
  }

  return result
}

// account activation
export const accountActivationService = async (token: string) => {
  const varifiedUser = verifyToken(
    token,
    config.jwt.activation_secret as Secret,
  )

  const expire = (varifiedUser?.exp as number) > Date.now()

  if (expire) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token expire')
  }

  const user = await prisma.user.findFirst({
    where: {
      phone: varifiedUser?.phone,
    },
  })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  user.hasAccess = true
  user.activationToken = null
  const result = await prisma.user.update({
    where: {
      phone: user.phone,
    },
    data: user,
  })

  return result
}

// sign in
export const signInService = async (
  data: IAuthSignin,
): Promise<IAuthSigninResponse | null> => {
  // existency check
  const user = await isExist(data.phone)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Phone is incorrect')
  }

  // Password check
  const passwordMatch = await bcrypt.compare(data.password, user.password)
  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // Create Access Token
  const { id, role, phone, name } = user
  const accessToken = createToken(
    { id, role, phone, name },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  // Create Refresh Token
  const refreshToken = createToken(
    { id, role, phone, name },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}
// refresh token
export const refreshTokenService = async (
  token: string,
): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = verifyToken(token, config.jwt.refresh_secret as Secret)
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token')
  }

  const { phone } = verifiedToken
  // Existency Check
  const user = await isExist(phone)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  //Generate New Access Token
  const newAccessToken = createToken(
    {
      id: user.id,
      role: user.role,
      phone: user.phone,
      name: user.name,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  return {
    accessToken: newAccessToken,
  }
}

// change password
export const changePasswordService = async (
  payload: IChangePassword,
  user: Partial<User>,
) => {
  const { oldPassword, newPassword } = payload
  const { phone } = user
  const isUserExist = await isExist(phone as string)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  if (
    isUserExist.password &&
    !(await isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect')
  }

  // hass
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_solt_round),
  )

  const updatedData = {
    password: newHashedPassword,
  }

  await prisma.user.update({
    where: { phone },
    data: updatedData,
  })
}

// forget password
export const forgetPasswordService = async (email: string) => {
  const isUserExist = await isExist(email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  isUserExist.passwordResetToken = createToken(
    { email },
    config.jwt.reset_password_secret as Secret,
    config.jwt.reset_password_secret_expires_in as string,
  )

  await prisma.user.update({
    where: { email },
    data: isUserExist,
  })

  const emailData = {
    to: email,
    receiver: isUserExist?.name,
    subject: `Reset Password`,
    link: `${config.client_url}/${config.db_path}/reset-password/${isUserExist.passwordResetToken}`,
    button_text: `Reset Password`,
    expTime: `1 hours`,
  }
  sendEmail(emailData)
}

// reset password
export const resetPasswordService = async (token: string, password: string) => {
  const varifiedUser = verifyToken(
    token,
    config.jwt.reset_password_secret as Secret,
  )

  const expire = (varifiedUser?.exp as number) > Date.now()

  if (expire) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token expire')
  }

  const user = await prisma.user.findFirst({
    where: {
      email: varifiedUser?.email,
    },
  })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  user.password = await bcrypt.hash(password, Number(config.bcrypt_solt_round))
  user.passwordResetToken = null
  const savedUser = await prisma.user.update({
    where: {
      phone: user.phone,
    },
    data: user,
  })

  return savedUser
}
