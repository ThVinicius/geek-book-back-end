import statusRepository from "../repositories/statusRepository"

function getAll() {
  return statusRepository.getAll()
}

export default { getAll }
