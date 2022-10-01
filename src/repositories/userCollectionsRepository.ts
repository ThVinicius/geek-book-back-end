import prisma from '../database/db'
import { IUserCollection } from '../types/userCollectionsTypes'

function create(data: IUserCollection) {
  return prisma.userCollection.create({ data })
}

function getByUserId(userId: number) {
  return prisma.userCollection.findMany({
    where: { userId },
    select: { id: true, lastSeen: true, collection: true }
  })
}

export default { create, getByUserId }
