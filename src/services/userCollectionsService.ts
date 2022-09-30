import userCollectionsRepository from '../repositories/userCollectionsRepository'
import categoriesService from './categoriesService'
import { IUserCollection } from '../types/userCollectionsTypes'
import { notFound } from '../utils/throwError'

async function create(data: IUserCollection, categoryId: number) {
  const { name: category } = await validateCategory(categoryId)

  const { id } = await userCollectionsRepository.create(data)

  return { id, category }
}

async function validateCategory(categoryId: number) {
  const category = await categoriesService.getById(categoryId)

  if (category === null) notFound('Essa categoria não existe')

  return category!
}

export default { create }
