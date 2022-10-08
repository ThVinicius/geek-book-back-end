import rankingsRepository from "../repositories/rankingsRepository"
import { IRanking, IUpdateRanking } from "../types/rankingsTypes"

function create(data: IRanking) {
  return rankingsRepository.create(data)
}

async function remove(id: number) {
  rankingsRepository.remove(id)
}

function updateUserCollection(id: number, data: IUpdateRanking) {
  return rankingsRepository.updateUserCollection(id, data)
}

async function getAllByUserId(userId: number) {
  return await rankingsRepository.getAllByUserId(userId)
}

async function makeRanking(userId: number) {
  const rankingDb = await getAllByUserId(userId)

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

export default { create, remove, updateUserCollection, makeRanking }
