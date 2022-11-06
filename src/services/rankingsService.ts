import rankingsRepository from '../repositories/rankingsRepository'
import { IRanking } from '../types/rankingsTypes'

async function create(data: IRanking) {
  return await rankingsRepository.create(data)
}

async function remove(id: number) {
  rankingsRepository.remove(id)
}

async function update(id: number, userCollectionId: number) {
  return await rankingsRepository.update(id, userCollectionId)
}

async function getAllByUserId(userId: number, getAll = true) {
  return await rankingsRepository.getAllByUserId(userId, getAll)
}

async function makeRanking(userId: number, getAll = true) {
  const rankingDb = await getAllByUserId(userId, getAll)

  const ranking = []

  let indice = 0

  for (let i = 1; i <= 10; i++) {
    if (rankingDb.length > indice && rankingDb[indice].position === i) {
      ranking.push(rankingDb[indice])

      indice++
    } else {
      ranking.push(buildObject(i))
    }
  }

  return ranking
}

function buildObject(position: number) {
  return {
    rankingId: null,
    position,
    userCollectionId: null,
    name: null,
    poster: null,
    synopsis: null,
    category: null,
    status: null,
    lastSeen: null
  }
}

function getMissingUserCollection(userId: number) {
  return rankingsRepository.getMissingUserCollection(userId)
}

export default {
  create,
  remove,
  update,
  makeRanking,
  getMissingUserCollection
}
