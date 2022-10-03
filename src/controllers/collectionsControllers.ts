import { Request, Response } from 'express'
import collectionsService from '../services/collectionsService'

async function getByCategory(req: Request, res: Response) {
  const categoryId = Number(req.params.categoryId)

  const collections = await collectionsService.getByCategory(categoryId)

  return res.status(200).send(collections)
}

export default { getByCategory }
