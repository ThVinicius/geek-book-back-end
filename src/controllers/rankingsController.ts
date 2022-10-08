import { Request, Response } from "express"
import rankingsService from "../services/rankingsService"
import { IBodyRanking } from "../types/rankingsTypes"

async function create(req: Request, res: Response) {
  const { userCollectionId, position } = req.body as {
    userCollectionId: number
    position: number
  }

  const userId: number = res.locals.session

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
  const { id, ...data }: IBodyRanking = req.body

  const ranking = await rankingsService.updateUserCollection(id, data)

  return res.status(200).send(ranking)
}

export default { create, remove, updateUserCollection }
