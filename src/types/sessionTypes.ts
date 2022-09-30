import { Session } from '@prisma/client'

export type ISession = Omit<Session, 'id' | 'createdAt'>

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends JwtPayload {
    id: number
  }
}
