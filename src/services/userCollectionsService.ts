import userCollectionsRepository from '../repositories/userCollectionsRepository'
import { IUserCollection } from '../types/userCollectionsTypes'

function create(data: IUserCollection) {
  return userCollectionsRepository.create(data)
}

export default { create }
