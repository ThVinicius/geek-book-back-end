import prisma from '../database/db'

function getById(id: number) {
  return prisma.category.findUnique({ where: { id } })
}

function getAll() {
  return prisma.category.findMany({
    select: { id: true, name: true }
  })
}

export default { getById, getAll }
