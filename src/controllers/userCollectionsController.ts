import { Request, Response } from 'express'
import userCollectionsRepository from '../services/userCollectionsService'
import collectionsService from '../services/collectionsService'
import { ICollection } from '../types/collectionTypes'

async function create(req: Request, res: Response) {
  const { category, name, synopsis, poster } = req.body as ICollection

  const { lastSeen } = req.body as { lastSeen: number }

  const userId: number = res.locals.session

  const data = { category, name, synopsis, poster }

  const collection = await collectionsService.upsert(data)

  const collectionId = collection.id

  const userCollection = await userCollectionsRepository.create({
    userId,
    collectionId,
    lastSeen
  })

  return res.status(201).send(userCollection)
}

export default { create }
