import prisma from '../database/db'
import { Prisma } from '@prisma/client'
import { IUserCollection } from '../types/userCollectionsTypes'
import handlePrismaError from '../utils/handlePrismaError'

async function create(data: IUserCollection) {
  try {
    return await prisma.userCollection.create({
      data,
      include: { status: { select: { id: true, name: true } } }
    })
  } catch (error) {
    const e = error as Prisma.PrismaClientKnownRequestError

    switch (e.code) {
      case 'P2002':
        const messageError = 'Não é possivel cadastrar a mesma obra duas vezes'

        handlePrismaError(e, messageError)

        break

      case 'P2003':
        const message = 'Esse statusId não existe'

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
      public: true,
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

async function updateLastSeen(
  collectionId: number,
  userId: number,
  lastSeen: { lastSeen: number } | { lastSeen: { increment: -1 | 1 } }
) {
  try {
    return await prisma.userCollection.update({
      where: { userId_collectionId: { userId, collectionId } },
      data: lastSeen
    })
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

async function updateStatus(id: number, statusId: number) {
  try {
    return await prisma.userCollection.update({
      where: { id },
      data: { statusId }
    })
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

function updatePublic(id: number, publicValue: boolean) {
  return prisma.userCollection.update({
    where: { id },
    data: { public: publicValue }
  })
}

async function remove(id: number) {
  try {
    await prisma.userCollection.delete({ where: { id } })
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

export default {
  create,
  getByUserId,
  updateLastSeen,
  updateStatus,
  updatePublic,
  remove
}
