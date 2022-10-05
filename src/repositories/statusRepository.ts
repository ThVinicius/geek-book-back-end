import prisma from "../database/db"

function getAll() {
  return prisma.status.findMany({ select: { id: true, name: true } })
}

export default { getAll }
