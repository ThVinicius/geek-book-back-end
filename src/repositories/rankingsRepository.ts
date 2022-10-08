import prisma from "../database/db"
import { IRanking } from "../types/rankingsTypes"

function create(data: IRanking) {
  return prisma.ranking.create({ data })
}

async function remove(id: number) {
  await prisma.ranking.delete({ where: { id } })
}

export default { create, remove }
