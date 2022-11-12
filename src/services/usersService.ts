import jwt from 'jsonwebtoken'
import { OAuthType } from '@prisma/client'
import bcrypt from 'bcrypt'
import axios from 'axios'
import qs from 'query-string'
import usersRepository from '../repositories/usersRepository'
import { unauthorized } from '../utils/throwError'
import { IUser, IOauthData } from '../types/userTypes'

async function create(data: IUser) {
  const password = bcryptPassword(data.password!)

  data.password = password

  delete data.confirmPassword

  await usersRepository.insert(data)
}

function bcryptPassword(password: string) {
  const saltRounds: number = 10

  return bcrypt.hashSync(password, saltRounds)
}

async function hanleSignIn(user: IUser) {
  const authorizeType = 'EMAIL'

  const dbUser = await getByEmail(user.email, authorizeType)

  if (dbUser === null) unauthorized('Email ou senha incorreta')

  validateBcrypt(user.password!, dbUser!.password!)

  return dbUser!
}

function validateBcrypt(decrypted: string, encrypted: string) {
  const compare = bcrypt.compareSync(decrypted, encrypted)

  if (!compare) return unauthorized('Email ou senha incorreta')
}

async function getDataGithub(code: string) {
  try {
    const GITHUB_ACCESS_TOKEN_URL =
      'https://github.com/login/oauth/access_token'

    const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env

    const params = {
      code,
      redirect_uri: REDIRECT_URL,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    }

    const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params)

    const { access_token: token } = qs.parse(data)

    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const {
      email,
      login: nickname,
      avatar_url: avatar
    } = response.data as {
      email: string
      login: string
      avatar_url: string
    }

    const authorizeType: OAuthType = 'GITHUB'

    return { email, nickname, avatar, password: null, authorizeType }
  } catch (error) {
    const msgError = 'code inválido'

    unauthorized(msgError)
  }
}

async function signUpOath(data: IOauthData) {
  const dbUser = await getByEmail(data.email, data.authorizeType)

  if (dbUser === null) return await usersRepository.insert(data)

  return dbUser
}

function getByEmail(email: string, authorizeType: OAuthType) {
  return usersRepository.getByEmail(email, authorizeType)
}

function createOauthToken(data: {}) {
  const secretKey: string = process.env.JWT_SECRET_OAUTH!

  const config = { expiresIn: 60 * 60 * 24 * 30 }

  const token = jwt.sign(data, secretKey, config)

  return token
}

export default {
  create,
  hanleSignIn,
  getDataGithub,
  signUpOath,
  createOauthToken
}
