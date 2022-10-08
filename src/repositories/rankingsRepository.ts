import prisma from "../database/db"
import { IRanking } from "../types/rankingsTypes"

function create(data: IRanking) {
  return prisma.ranking.create({ data })
}

export default { create }
