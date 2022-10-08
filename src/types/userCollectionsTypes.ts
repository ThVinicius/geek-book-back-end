import { UserCollection, Category } from "@prisma/client"

export type IUserCollection = Omit<UserCollection, "id" | "createdAt">

export type IUserCollectionReturn = {
  id: number
  lastSeen: number
  status: {
    id: number
    name: string
  }
  collection: {
    id: number
    name: string
    poster: string | null
    synopsis: string | null
    category: Category
  }
}[]
