import rankingsRepository from "../repositories/rankingsRepository"
import { IRanking } from "../types/rankingsTypes"

function create(data: IRanking) {
  return rankingsRepository.create(data)
}

async function remove(id: number) {
  rankingsRepository.remove(id)
}

export default { create, remove }
