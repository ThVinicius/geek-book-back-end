import prisma from '../database/db'
import { IUserCollection } from '../types/userCollectionsTypes'

function create(data: IUserCollection) {
  return prisma.userCollection.create({ data })
}

export default { create }
