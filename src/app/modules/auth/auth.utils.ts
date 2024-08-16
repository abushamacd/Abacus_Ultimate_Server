import prisma from '../../../utilities/prisma'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'

export const isExist = async (payload: string): Promise<User | null> => {
  const result = await prisma.user.findFirst({
    where: {
      OR: [{ email: payload }, { phone: payload }],
    },
  })

  return result as User
}

export const isPasswordMatched = async (
  givenPassword: string,
  savedPassword: string
) => {
  return await bcrypt.compare(givenPassword, savedPassword)
}
