import prisma from "../database/db"
import { IUserCollection } from "../types/userCollectionsTypes"
import {} from "@prisma/client"

function create(data: IUserCollection) {
  return prisma.userCollection.create({ data })
}

function getByUserId(userId: number) {
  return prisma.userCollection.findMany({
    where: { userId },
    select: {
      id: true,
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

async function remove(id: number) {
  await prisma.userCollection.delete({ where: { id } })
}

export default { create, getByUserId, updateLastSeen, remove }
