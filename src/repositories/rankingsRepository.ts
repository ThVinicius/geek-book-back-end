import prisma from "../database/db"
import { IRanking, IUpdateRanking } from "../types/rankingsTypes"

function create(data: IRanking) {
  return prisma.ranking.create({ data })
}

async function remove(id: number) {
  await prisma.ranking.delete({ where: { id } })
}

function updateUserCollection(id: number, data: IUpdateRanking) {
  return prisma.ranking.update({ where: { id }, data })
}

export default { create, remove, updateUserCollection }
