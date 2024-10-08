export type IAuthSignin = {
  phone: string
  password: string
}

export type IAuthSigninResponse = {
  accessToken: string
  refreshToken?: string
}

export type IRefreshTokenResponse = {
  accessToken: string
}

export type IChangePassword = {
  oldPassword: string
  newPassword: string
}
