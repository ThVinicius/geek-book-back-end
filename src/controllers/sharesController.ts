import { Request, Response } from "express"
import sharesService from "../services/sharesService"

async function createLink(_: Request, res: Response) {
  const userId: number = res.locals.session

  const link = await sharesService.createLink(userId)

  return res.status(201).send(link)
}

async function getCollection(req: Request, res: Response) {
  const { shortUrl } = req.params

  const collections = await sharesService.getCollection(shortUrl)

  return res.status(200).send(collections)
}

export default { createLink, getCollection }
