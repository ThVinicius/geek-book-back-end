import userCollectionsRepository from '../repositories/userCollectionsRepository'
import categoriesService from './categoriesService'
import { IUserCollection } from '../types/userCollectionsTypes'
import { notFound } from '../utils/throwError'

async function create(data: IUserCollection, categoryId: number) {
  const { name: category } = await validateCategory(categoryId)

  const userCollection = await userCollectionsRepository.create(data)

  return { id: userCollection!.id, category, status: userCollection!.status }
}

async function validateCategory(categoryId: number) {
  const category = await categoriesService.getById(categoryId)

  if (category === null) notFound('Essa categoria não existe')

  return category!
}

function getByUserId(where: { userId: number; statusId?: number }) {
  return userCollectionsRepository.getByUserId(where)
}

async function updateLastSeen(
  collectionId: number,
  userId: number,
  data: { lastSeen: number } | { lastSeen: { increment: -1 | 1 } }
) {
  return await userCollectionsRepository.updateLastSeen(
    collectionId,
    userId,
    data
  )
}

async function updateStatus(id: number, statusId: number) {
  return await userCollectionsRepository.updateStatus(id, statusId)
}

function updatePublic(id: number, publicValue: boolean) {
  return userCollectionsRepository.updatePublic(id, publicValue)
}

async function remove(id: number) {
  await userCollectionsRepository.remove(id)
}

export default {
  create,
  getByUserId,
  updateLastSeen,
  updateStatus,
  updatePublic,
  remove
}
