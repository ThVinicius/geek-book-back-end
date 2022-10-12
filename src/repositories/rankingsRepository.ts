import { Prisma } from "@prisma/client"
import prisma from "../database/db"
import {
  IRanking,
  IUpdateRanking,
  IGetRanking,
  IGetUserCollection
} from "../types/rankingsTypes"
import handlePrismaError from "../utils/handlePrismaError"

async function create(data: IRanking) {
  try {
    return await prisma.ranking.create({ data })
  } catch (error) {
    const e = error as Prisma.PrismaClientKnownRequestError

    switch (e.code) {
      case "P2002":
        const messageError = "Essa obra já está ranqueada!"

        handlePrismaError(e, messageError)
        break

      case "P2003":
        const message = "Esse userCollectionId não existe!"

        handlePrismaError(e, message)
        break

      default:
        break
    }
  }
}

async function remove(id: number) {
  await prisma.ranking.delete({ where: { id } })
}

function updateUserCollection(id: number, data: IUpdateRanking) {
  return prisma.ranking.update({ where: { id }, data })
}

async function getAllByUserId(userId: number) {
  return await prisma.$queryRaw<IGetRanking>`
    SELECT r.id AS "rankingId", position, uc.id AS "userCollectionId", 
      c.name, poster, synopsis, ca.name AS category, s.name AS status, 
      "lastSeen"
    FROM rankings r
    JOIN "userCollections" uc ON uc.id = r."userCollectionId"
    JOIN collections c ON c.id = uc."collectionId"
    JOIN status s ON s.id = uc."statusId"
    JOIN categories ca ON  ca.id = c."categoryId"
    WHERE uc."userId" = ${userId}
    ORDER BY r.position ASC
    LIMIT 10;`
}

function getMissingUserCollection(userId: number) {
  return prisma.$queryRaw<IGetUserCollection>`
    SELECT uc.id AS "userCollectionId", c.name, poster, synopsis, 
      ca.name AS category, s.name AS status, "lastSeen" 
    FROM rankings r
    RIGHT JOIN "userCollections" uc ON uc."userId" = r."userId" 
      AND uc.id = r."userCollectionId"
    JOIN collections c ON c.id = uc."collectionId"
    JOIN categories ca ON ca.id = c."categoryId"
    JOIN status s ON s.id = uc."statusId"
    WHERE r.id IS NULL AND uc."userId" = ${userId}`
}

export default {
  create,
  remove,
  updateUserCollection,
  getAllByUserId,
  getMissingUserCollection
}
