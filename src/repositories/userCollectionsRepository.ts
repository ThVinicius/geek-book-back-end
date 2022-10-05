import prisma from "../database/db"
import { IUserCollection } from "../types/userCollectionsTypes"

function create(data: IUserCollection) {
  return prisma.userCollection.create({
    data,
    include: { status: { select: { id: true, name: true } } }
  })
}

function getByUserId(userId: number) {
  return prisma.userCollection.findMany({
    where: { userId },
    select: {
      id: true,
      lastSeen: true,
      status: { select: { id: true, name: true } },
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

function updateStatus(id: number, statusId: number) {
  return prisma.userCollection.update({ where: { id }, data: { statusId } })
}

async function remove(id: number) {
  await prisma.userCollection.delete({ where: { id } })
}

export default { create, getByUserId, updateLastSeen, updateStatus, remove }
