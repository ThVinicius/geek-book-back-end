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

export default { create, remove, updateUserCollection }
