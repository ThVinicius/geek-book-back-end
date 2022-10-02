import { Request, Response } from 'express'
import userCollectionsRepository from '../services/userCollectionsService'
import collectionsService from '../services/collectionsService'
import { ICollection } from '../types/collectionTypes'

async function create(req: Request, res: Response) {
  const { categoryId, name, synopsis, poster } = req.body as ICollection

  const { lastSeen } = req.body as { lastSeen: number }

  const userId: number = res.locals.session

  const data = { categoryId, name, synopsis, poster }

  const { id: collectionId } = await collectionsService.upsert(data)

  const { id, category } = await userCollectionsRepository.create(
    {
      userId,
      collectionId,
      lastSeen
    },
    categoryId
  )

  const userCollection = { id, category, name, poster, synopsis, lastSeen }

  return res.status(201).send(userCollection)
}

async function getByUserId(_: Request, res: Response) {
  const userId: number = res.locals.session

  const collections = await userCollectionsRepository.getByUserId(userId)

  return res.status(200).send(collections)
}

async function updateLastSeen(req: Request, res: Response) {
  const userId: number = res.locals.session

  const { collectionId, lastSeen } = req.body as {
    collectionId: number
    lastSeen: number
  }

  const collection = await userCollectionsRepository.updateLastSeen(
    collectionId,
    userId,
    lastSeen
  )

  return res.status(200).send(collection)
}

export default { create, getByUserId, updateLastSeen }
