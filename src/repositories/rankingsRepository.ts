import prisma from "../database/db"
import { IRanking, IUpdateRanking, IGetRanking } from "../types/rankingsTypes"

function create(data: IRanking) {
  return prisma.ranking.create({ data })
}

async function remove(id: number) {
  await prisma.ranking.delete({ where: { id } })
}

function updateUserCollection(id: number, data: IUpdateRanking) {
  return prisma.ranking.update({ where: { id }, data })
}

async function getAllByUserId(userId: number) {
  return await prisma.$queryRaw<IGetRanking>`
    SELECT r.id AS "rankingId", r.position, uc.id AS "userCollectionId", c.name, 
      poster, synopsis, ca.name AS category, s.name AS status, uc."lastSeen"
    FROM rankings r
    JOIN "userCollections" uc ON uc.id = r."userCollectionId"
    JOIN collections c ON c.id = uc."collectionId"
    JOIN status s ON s.id = uc."statusId"
    JOIN categories ca ON  ca.id = c."categoryId"
    WHERE uc."userId" = ${userId}
    ORDER BY r.position ASC
    LIMIT 10;`
}

export default { create, remove, updateUserCollection, getAllByUserId }
