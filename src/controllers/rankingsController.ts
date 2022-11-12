import { Request, Response } from 'express'
import rankingsService from '../services/rankingsService'

async function create(req: Request, res: Response) {
  const { userCollectionId, position } = req.body as {
    userCollectionId: number
    position: number
  }

  const userId: number = res.locals.session.id

  const data = { userId, userCollectionId, position }

  const ranking = await rankingsService.create(data)

  return res.status(201).send(ranking)
}

async function remove(req: Request, res: Response) {
  const id = Number(req.params.id)

  await rankingsService.remove(id)

  return res.sendStatus(200)
}

async function updateUserCollection(req: Request, res: Response) {
  const { id, userCollectionId } = req.body as {
    id: number
    userCollectionId: number
  }

  const ranking = await rankingsService.update(id, userCollectionId)

  return res.status(200).send(ranking)
}

async function get(_: Request, res: Response) {
  const userId: number = res.locals.session.id

  const ranking = await rankingsService.makeRanking(userId)

  return res.status(200).send(ranking)
}

async function getMissingUserCollection(_: Request, res: Response) {
  const userId: number = res.locals.session.id

  const userCollections = await rankingsService.getMissingUserCollection(userId)

  return res.status(200).send(userCollections)
}

export default {
  create,
  remove,
  updateUserCollection,
  get,
  getMissingUserCollection
}
