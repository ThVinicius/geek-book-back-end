import rankingsService from "../../src/services/rankingsService"
import rankingsRepository from "../../src/repositories/rankingsRepository"
import { rankingEmpty, rankingFull } from "../factory/rankingFactory"

describe("testando a função makeRanking", () => {
  it("verifica com ranking vazio", async () => {
    const userId = 1
    const empty = rankingEmpty()

    jest.spyOn(rankingsRepository, "getAllByUserId").mockResolvedValueOnce([])

    const ranking = await rankingsService.makeRanking(userId)

    expect(ranking).toEqual(empty)
  })

  it("verifica com o ranking cheio", async () => {
    const userId = 1
    const full = rankingFull()

    jest.spyOn(rankingsRepository, "getAllByUserId").mockResolvedValueOnce(full)

    const ranking = await rankingsService.makeRanking(userId)

    expect(ranking).toEqual(full)
  })
})
