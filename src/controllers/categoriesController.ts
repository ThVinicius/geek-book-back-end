import { Request, Response } from 'express'
import categoriesService from '../services/categoriesService'

async function getAll(_: Request, res: Response) {
  const categories = await categoriesService.getAll()

  return res.status(200).send(categories)
}

export default { getAll }
