import { Request, Response } from 'express'
import usersService from '../services/usersService'
import { IUser } from '../types/userTypes'
import sessionsService from '../services/sessionsService'

async function signUp(req: Request, res: Response) {
  const data = req.body as IUser

  await usersService.create(data)

  return res.sendStatus(201)
}

async function signIn(req: Request, res: Response) {
  const user = await usersService.hanleSignIn(req.body)

  const session = sessionsService.createSession(user)

  await sessionsService.upsert(session)

  return res
    .status(200)
    .send({
      token: session.token,
      nickname: user.nickname,
      avatar: user.avatar
    })
}

export default { signUp, signIn }
