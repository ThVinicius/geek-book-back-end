import collectionsRepository from '../repositories/collectionsRepository'
import { ICollection } from '../types/collectionTypes'

function upsert(data: ICollection) {
  return collectionsRepository.upsert(data)
}

export default { upsert }
