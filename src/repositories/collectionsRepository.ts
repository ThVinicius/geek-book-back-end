import prisma from '../database/db'
import { ICollection } from '../types/collectionTypes'

function upsert(data: ICollection) {
  return prisma.collection.upsert({
    create: data,
    update: {},
    where: { name: data.name }
  })
}

export default { upsert }
