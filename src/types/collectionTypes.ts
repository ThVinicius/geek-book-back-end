import { Collection } from '@prisma/client'

export type ICollection = Omit<Collection, 'id' | 'createdAt'>
