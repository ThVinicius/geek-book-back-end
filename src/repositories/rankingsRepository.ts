import { Prisma } from '@prisma/client'
import prisma from '../database/db'
import {
  IRanking,
  IGetRanking,
  IGetUserCollection
} from '../types/rankingsTypes'
import handlePrismaError from '../utils/handlePrismaError'

async function create(data: IRanking) {
  try {
    return await prisma.ranking.create({ data })
  } catch (error) {
    const e = error as Prisma.PrismaClientKnownRequestError

    switch (e.code) {
      case 'P2002':
        const messageError = 'Essa obra já está ranqueada!'

        handlePrismaError(e, messageError)
        break

      case 'P2003':
        const message = 'Esse userCollectionId não existe!'

        handlePrismaError(e, message)
        break

      default:
        break
    }
  }
}

async function remove(id: number) {
  try {
    await prisma.ranking.delete({ where: { id } })
  } catch (error) {
    const e = error as Prisma.PrismaClientKnownRequestError

    switch (e.code) {
      case 'P2025':
        const messageError = 'Registro não encontrado!'

        handlePrismaError(e, messageError)

        break

      default:
        break
    }
  }
}

async function update(id: number, userCollectionId: number) {
  try {
    return await prisma.ranking.update({
      where: { id },
      data: { userCollectionId }
    })
  } catch (error) {
    const e = error as Prisma.PrismaClientKnownRequestError

    switch (e.code) {
      case 'P2002':
        const msg = 'Não é possivel ranquear a obra mais de uma vez!'

        handlePrismaError(e, msg)
        break

      case 'P2003':
        const message = 'Esse userCollectionId não existe!'

        handlePrismaError(e, message)
        break

      case 'P2025':
        const messageError = 'Registro não encontrado!'

        handlePrismaError(e, messageError)

        break

      default:
        console.log(error)

        break
    }
  }
}

async function getAllByUserId(userId: number, getAll: boolean) {
  const where = getAll
    ? Prisma.sql`WHERE uc."userId" = ${userId}`
    : Prisma.sql`WHERE uc."userId" = ${userId} AND uc.public = 'true'`

  return await prisma.$queryRaw<IGetRanking>`
    SELECT r.id AS "rankingId", position, uc.id AS "userCollectionId", 
      c.name, poster, synopsis, ca.name AS category, s.name AS status, 
      "lastSeen", uc.public
    FROM rankings r
    JOIN "userCollections" uc ON uc.id = r."userCollectionId"
    JOIN collections c ON c.id = uc."collectionId"
    JOIN status s ON s.id = uc."statusId"
    JOIN categories ca ON  ca.id = c."categoryId"
    ${where}
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
  update,
  getAllByUserId,
  getMissingUserCollection
}
