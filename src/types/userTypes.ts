import { User, OAuthType } from '@prisma/client'

export type IUser = Omit<User, 'id' | 'createdAt'> & {
  confirmPassword?: string
}

export type IOauthData = {
  email: string
  avatar: string
  authorizeType: OAuthType
  nickname: string
  password: null
}
