import { Session, OAuthType } from '@prisma/client'

export type ISession = Omit<Session, 'id' | 'createdAt'>

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends JwtPayload {
    id: number
  }

  export interface UserDataJwtPayload extends JwtPayload {
    email: string
    avatar: string
    nickname: string
    password: null
    authorizeType: OAuthType
  }
}
