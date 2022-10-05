import userCollectionsRepository from "../repositories/userCollectionsRepository"
import categoriesService from "./categoriesService"
import { IUserCollection } from "../types/userCollectionsTypes"
import { notFound } from "../utils/throwError"

async function create(data: IUserCollection, categoryId: number) {
  const { name: category } = await validateCategory(categoryId)

  const { id, status } = await userCollectionsRepository.create(data)

  return { id, category, status }
}

async function validateCategory(categoryId: number) {
  const category = await categoriesService.getById(categoryId)

  if (category === null) notFound("Essa categoria não existe")

  return category!
}

function getByUserId(userId: number) {
  return userCollectionsRepository.getByUserId(userId)
}

function updateLastSeen(
  collectionId: number,
  userId: number,
  lastSeen: number
) {
  return userCollectionsRepository.updateLastSeen(
    collectionId,
    userId,
    lastSeen
  )
}

function updateStatus(id: number, statusId: number) {
  return userCollectionsRepository.updateStatus(id, statusId)
}

async function remove(id: number) {
  await userCollectionsRepository.remove(id)
}

export default { create, getByUserId, updateLastSeen, updateStatus, remove }
