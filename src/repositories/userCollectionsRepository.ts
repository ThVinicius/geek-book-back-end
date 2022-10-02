import prisma from '../database/db'
import { IUserCollection } from '../types/userCollectionsTypes'
import {} from '@prisma/client'

function create(data: IUserCollection) {
  return prisma.userCollection.create({ data })
}

function getByUserId(userId: number) {
  return prisma.userCollection.findMany({
    where: { userId },
    select: {
      lastSeen: true,
      collection: {
        select: {
          id: true,
          name: true,
          poster: true,
          synopsis: true,
          category: true
        }
      }
    }
  })
}

function updateLastSeen(
  collectionId: number,
  userId: number,
  lastSeen: number
) {
  return prisma.userCollection.update({
    where: { userId_collectionId: { userId, collectionId } },
    data: { lastSeen }
  })
}

export default { create, getByUserId, updateLastSeen }
