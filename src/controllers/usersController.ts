import { Request, Response } from 'express'
import usersService from '../services/usersService'
import { IUser } from '../types/userTypes'
import sessionsService from '../services/sessionsService'

async function signUp(req: Request, res: Response) {
  const data = req.body as IUser

  data.authorizeType = 'EMAIL'

  await usersService.create(data)

  return res.sendStatus(201)
}

async function signIn(req: Request, res: Response) {
  const user = await usersService.hanleSignIn(req.body)

  const session = sessionsService.createSession(user)

  await sessionsService.upsert(session)

  return res.status(200).send({
    token: session.token,
    nickname: user.nickname,
    avatar: user.avatar
  })
}

async function githubOauth(req: Request, res: Response) {
  const { code } = req.body as { code: string }

  const userData = await usersService.getDataGithub(code)

  const signUp = await usersService.signUpOath(userData!)

  const session = sessionsService.createSession(signUp!)

  await sessionsService.upsert(session)

  return res.status(200).send({
    token: session.token,
    nickname: signUp!.nickname,
    avatar: signUp!.avatar
  })
}

export default { signUp, signIn, githubOauth }
