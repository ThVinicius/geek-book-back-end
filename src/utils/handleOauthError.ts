import { Prisma } from '@prisma/client'
import { conflitOauth } from './throwError'
import { IUser } from '../types/userTypes'

export default function handleOauthError(
  error: Prisma.PrismaClientKnownRequestError,
  messageError: string,
  data: IUser
) {
  switch (error.code) {
    case 'P2002':
      conflitOauth(messageError, data)
      break

    default:
      break
  }
}
