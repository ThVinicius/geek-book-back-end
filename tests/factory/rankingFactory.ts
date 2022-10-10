import { faker } from "@faker-js/faker"

export function rankingEmpty() {
  const ranking = []

  for (let i = 1; i <= 10; i++) {
    ranking.push(buildObject(i))
  }

  return ranking
}

export function rankingFull() {
  const ranking = []

  for (let i = 1; i <= 10; i++) {
    ranking.push(buildRanking(i))
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

function buildRanking(position: number) {
  return {
    rankingId: position,
    position,
    userCollectionId: position,
    name: faker.name.fullName(),
    poster: faker.internet.avatar(),
    synopsis: faker.lorem.paragraph(),
    category: "Novel",
    status: "Ativo",
    lastSeen: faker.datatype.number()
  }
}
