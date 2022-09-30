import categoriesRepository from '../repositories/categoriesRepository'

function getAll() {
  return categoriesRepository.getAll()
}

function getById(categoryId: number) {
  return categoriesRepository.getById(categoryId)
}

export default { getAll, getById }
