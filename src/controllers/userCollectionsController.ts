import { Request, Response } from 'express'
import userCollectionsService from '../services/userCollectionsService'
import collectionsService from '../services/collectionsService'
import { ICollection } from '../types/collectionTypes'

async function create(req: Request, res: Response) {
  const { categoryId, name, synopsis, poster } = req.body as ICollection

  const { lastSeen, statusId, publicValue } = req.body as {
    lastSeen: number
    statusId: number
    publicValue: boolean
  }

  const userId: number = res.locals.session

  const data = { categoryId, name, synopsis, poster }

  const { id: collectionId } = await collectionsService.upsert(data)

  const { id, category, status } = await userCollectionsService.create(
    {
      userId,
      collectionId,
      lastSeen,
      statusId,
      public: publicValue
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
    public: publicValue,
    status
  }

  return res.status(201).send(userCollection)
}

async function getByUserId(req: Request, res: Response) {
  const userId: number = res.locals.session

  const { statusId } = req.query

  let where

  if (statusId === undefined) {
    where = { userId }
  } else {
    const aux = Number(statusId)

    if (isNaN(aux) || aux < 0) {
      return res.status(400).send('statusId deve ser um número maior que 0')
    }

    where = { userId, statusId: aux }
  }

  const collections = await userCollectionsService.getByUserId(where)

  return res.status(200).send(collections)
}

async function updateLastSeen(req: Request, res: Response) {
  const userId: number = res.locals.session

  const { collectionId, lastSeen, increment } = req.body as {
    collectionId: number
    lastSeen: number
    increment: -1 | 1 | undefined
  }

  let data

  if (increment !== undefined) {
    data = { lastSeen: { increment } }
  } else {
    data = { lastSeen }
  }

  const collection = await userCollectionsService.updateLastSeen(
    collectionId,
    userId,
    data
  )

  return res.status(200).send(collection)
}

async function updateStatus(req: Request, res: Response) {
  const { id, statusId } = req.body as { id: number; statusId: number }

  await userCollectionsService.updateStatus(id, statusId)

  return res.sendStatus(200)
}

async function updatePublic(req: Request, res: Response) {
  const { id, publicValue } = req.body as { id: number; publicValue: boolean }

  await userCollectionsService.updatePublic(id, publicValue)

  return res.sendStatus(200)
}

async function remove(req: Request, res: Response) {
  const id = Number(req.params.id)

  await userCollectionsService.remove(id)

  return res.sendStatus(200)
}

export default {
  create,
  getByUserId,
  updateLastSeen,
  updateStatus,
  updatePublic,
  remove
}
