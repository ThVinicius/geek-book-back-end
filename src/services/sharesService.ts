import { nanoid } from "nanoid"
import sharesRepository from "../repositories/sharesRepository"
import userCollectionsService from "./userCollectionsService"
import { notAcceptable, notFound } from "../utils/throwError"
import { Share } from "@prisma/client"

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

async function getCollection(shortUrl: string) {
  const share = await sharesRepository.get(shortUrl)

  validateShare(share)

  const where = { userId: share!.userId }

  const collections = await userCollectionsService.getByUserId(where)

  return collections
}

function validateShare(share: Share | null) {
  if (share === null) notFound("Link não encontrado")
}

export default { createLink, getCollection }
