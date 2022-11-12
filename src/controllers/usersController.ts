import { Request, Response } from 'express'
import usersService from '../services/usersService'
import { IUser } from '../types/userTypes'
import sessionsService from '../services/sessionsService'
import { OAuthType } from '@prisma/client'

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

async function signUpOauth(req: Request, res: Response) {
  const { nickname } = req.body as { nickname: string }

  const data = res.locals.oAuth as {
    nickname: string
    email: string
    password: null
    avatar: string
    authorizeType: OAuthType
  }

  data.nickname = nickname

  const user = await usersService.createUser(data)

  const session = sessionsService.createSession(user!)

  await sessionsService.upsert(session)

  return res.status(200).send({
    token: session.token,
    nickname: user!.nickname,
    avatar: user!.avatar
  })
}

export default { signUp, signIn, githubOauth, signUpOauth }
