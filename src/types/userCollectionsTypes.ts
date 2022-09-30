import { UserCollection } from '@prisma/client'

export type IUserCollection = Omit<UserCollection, 'id' | 'createdAt'>
