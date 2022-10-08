import { Ranking } from "@prisma/client"

export type IRanking = Omit<Ranking, "id">

export type IUpdateRanking = Omit<IRanking, "userId">

export type IBodyRanking = Omit<Ranking, "userId">
