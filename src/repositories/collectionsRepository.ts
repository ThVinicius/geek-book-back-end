import prisma from "../database/db"
import { ICollection } from "../types/collectionTypes"

function upsert(data: ICollection) {
  const { name, categoryId } = data

  return prisma.collection.upsert({
    create: data,
    update: {},
    where: { name_categoryId: { name, categoryId } }
  })
}

function getByCategory(categoryId: number) {
  return prisma.collection.findMany({ where: { categoryId } })
}

export default { upsert, getByCategory }
