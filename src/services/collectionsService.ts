import collectionsRepository from '../repositories/collectionsRepository'
import { ICollection } from '../types/collectionTypes'

function upsert(data: ICollection) {
  return collectionsRepository.upsert(data)
}

function getByCategory(categoryId: number) {
  return collectionsRepository.getByCategory(categoryId)
}

export default { upsert, getByCategory }
