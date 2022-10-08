import { Ranking } from "@prisma/client"

export type IRanking = Omit<Ranking, "id">
