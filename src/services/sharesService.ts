import { nanoid } from "nanoid"
import sharesRepository from "../repositories/sharesRepository"
import userCollectionsService from "./userCollectionsService"
import { notAcceptable, notFound } from "../utils/throwError"
import { Share } from "@prisma/client"
import { IUserCollectionReturn } from "../types/userCollectionsTypes"
import rankingsService from "./rankingsService"

async function createLink(userId: number) {
  await validateUserCollection(userId)

  const shortUrl = nanoid(9)

  const link = await sharesRepository.createLink(userId, shortUrl)

  return link
}

async function validateUserCollection(userId: number) {
  const where = { userId }

  const userCollection = await userCollectionsService.getByUserId(where)

  const errorMessage = "Coleção vazia não pode ser compartilhada"

  if (userCollection.length === 0) notAcceptable(errorMessage)

  return userCollection
}

async function getRanking(userId: number) {
  return await rankingsService.makeRanking(userId)
}

async function getCollection(shortUrl: string) {
  const share = await sharesRepository.get(shortUrl)

  validateShare(share)

  const where = { userId: share!.userId }

  const userCollections = await userCollectionsService.getByUserId(where)

  await userCollectionValidate(userCollections, shortUrl)

  const ranking = await getRanking(where.userId)

  return {
    userCollections,
    ranking,
    nickname: share?.user.nickname,
    avatar: share?.user.avatar
  }
}

async function userCollectionValidate(
  userCollection: IUserCollectionReturn,
  shortUrl: string
) {
  if (userCollection.length === 0) {
    await remove(shortUrl)

    const errorMessage = "Link não encontrado"

    notFound(errorMessage)
  }
}

function validateShare(share: Share | null) {
  if (share === null) notFound("Link não encontrado")
}

async function remove(shortUrl: string) {
  await sharesRepository.remove(shortUrl)
}

export default { createLink, getCollection }
