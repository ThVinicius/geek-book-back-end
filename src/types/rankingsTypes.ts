import { Ranking } from "@prisma/client"

export type IRanking = Omit<Ranking, "id">

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

export type IGetUserCollection = {
  userCollectionId: number
  name: string
  poster: string | null
  synopsis: string | null
  category: string
  status: string
  lastSeen: number
}[]
