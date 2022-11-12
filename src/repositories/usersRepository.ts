import prisma from '../database/db'
import { Prisma, OAuthType } from '@prisma/client'
import { IUser } from '../types/userTypes'
import handlePrismaError from '../utils/handlePrismaError'
import handleOauthError from '../utils/handleOauthError'

async function insert(data: IUser) {
  try {
    return await prisma.user.create({ data })
  } catch (error) {
    const e = error as Prisma.PrismaClientKnownRequestError

    const [uniqueField] = e.meta!.target as string[]

    const messageError = `O ${uniqueField} já está em uso!\nTente outro valor`

    if (data.authorizeType === 'EMAIL') handlePrismaError(e, messageError)
    else handleOauthError(e, messageError, data)
  }
}

async function getByEmail(email: string, authorizeType: OAuthType) {
  return await prisma.user.findUnique({
    where: { email_authorizeType: { email, authorizeType } }
  })
}

export default { insert, getByEmail }
