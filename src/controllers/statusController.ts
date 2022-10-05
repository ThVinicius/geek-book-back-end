import { Request, Response } from "express"
import statusService from "../services/statusService"

async function getAll(_: Request, res: Response) {
  const status = await statusService.getAll()

  return res.status(200).send(status)
}

export default { getAll }
