import { Ranking } from "@prisma/client"

export type IRanking = Omit<Ranking, "id">

export type IUpdateRanking = Omit<IRanking, "userId">

export type IBodyRanking = Omit<Ranking, "userId">

export type IGetRanking = {
  rankingId: number
  position: number
  userCollectionId: number
  name: string
  poster: string | null
  synopsis: string | null
  category: string
  status: string
  lastSeen: number
}[]
