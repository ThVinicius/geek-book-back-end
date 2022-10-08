import { Request, Response } from "express"
import rankingsService from "../services/rankingsService"

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

export default { create }
