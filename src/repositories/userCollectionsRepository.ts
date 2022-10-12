import prisma from "../database/db"
import { Prisma } from "@prisma/client"
import { IUserCollection } from "../types/userCollectionsTypes"
import handlePrismaError from "../utils/handlePrismaError"

async function create(data: IUserCollection) {
  try {
    return await prisma.userCollection.create({
      data,
      include: { status: { select: { id: true, name: true } } }
    })
  } catch (error) {
    const e = error as Prisma.PrismaClientKnownRequestError

    switch (e.code) {
      case "P2002":
        const messageError = "Não é possivel cadastrar a mesma obra duas vezes"

        handlePrismaError(e, messageError)

        break

      case "P2003":
        const message = "Esse statusId não existe"

        handlePrismaError(e, message)

        break

      default:
        break
    }
  }
}

function getByUserId(where: { userId: number; statusId?: number }) {
  return prisma.userCollection.findMany({
    where,
    select: {
      id: true,
      lastSeen: true,
      status: { select: { id: true, name: true } },
      collection: {
        select: {
          id: true,
          name: true,
          poster: true,
          synopsis: true,
          category: true
        }
      }
    }
  })
}

function updateLastSeen(
  collectionId: number,
  userId: number,
  lastSeen: number
) {
  return prisma.userCollection.update({
    where: { userId_collectionId: { userId, collectionId } },
    data: { lastSeen }
  })
}

function updateStatus(id: number, statusId: number) {
  return prisma.userCollection.update({ where: { id }, data: { statusId } })
}

async function remove(id: number) {
  await prisma.userCollection.delete({ where: { id } })
}

export default { create, getByUserId, updateLastSeen, updateStatus, remove }
