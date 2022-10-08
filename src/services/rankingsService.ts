import rankingsRepository from "../repositories/rankingsRepository"
import { IRanking } from "../types/rankingsTypes"

function create(data: IRanking) {
  return rankingsRepository.create(data)
}

export default { create }
