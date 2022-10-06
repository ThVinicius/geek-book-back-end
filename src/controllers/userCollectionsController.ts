import { Request, Response } from "express"
import userCollectionsService from "../services/userCollectionsService"
import collectionsService from "../services/collectionsService"
import { ICollection } from "../types/collectionTypes"

async function create(req: Request, res: Response) {
  const { categoryId, name, synopsis, poster } = req.body as ICollection

  const { statusId } = req.body as { statusId: number }

  const { lastSeen } = req.body as { lastSeen: number }

  const userId: number = res.locals.session

  const data = { categoryId, name, synopsis, poster }

  const { id: collectionId } = await collectionsService.upsert(data)

  const { id, category, status } = await userCollectionsService.create(
    {
      userId,
      collectionId,
      lastSeen,
      statusId
    },
    categoryId
  )

  const userCollection = {
    id,
    category,
    name,
    poster,
    synopsis,
    lastSeen,
    status
  }

  return res.status(201).send(userCollection)
}

async function getByUserId(req: Request, res: Response) {
  const userId: number = res.locals.session

  const statusId = Number(req.params.statusId)

  const collections = await userCollectionsService.getByUserId(userId, statusId)

  return res.status(200).send(collections)
}

async function updateLastSeen(req: Request, res: Response) {
  const userId: number = res.locals.session

  const { collectionId, lastSeen } = req.body as {
    collectionId: number
    lastSeen: number
  }

  const collection = await userCollectionsService.updateLastSeen(
    collectionId,
    userId,
    lastSeen
  )

  return res.status(200).send(collection)
}

async function updateStatus(req: Request, res: Response) {
  const { id, statusId } = req.body as { id: number; statusId: number }

  await userCollectionsService.updateStatus(id, statusId)

  return res.sendStatus(200)
}

async function remove(req: Request, res: Response) {
  const id = Number(req.params.id)

  await userCollectionsService.remove(id)

  return res.sendStatus(200)
}

export default { create, getByUserId, updateLastSeen, updateStatus, remove }
