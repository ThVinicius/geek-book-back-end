import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import tokenSchema from '../schemas/sessionSchema'
import { Request, Response, NextFunction } from 'express'

dotenv.config()

function oAuthtokenValidate(req: Request, res: Response, next: NextFunction) {
  const { error } = tokenSchema.validate(req.headers)

  if (error)
    return res.status(400).send(error.details.map(detail => detail.message))

  const { authorization } = req.headers

  const token = authorization!.replace('Bearer ', '')

  const secretKey: string = process.env.JWT_SECRET_OAUTH!

  const data = <jwt.UserDataJwtPayload>jwt.verify(token, secretKey)

  const { email, nickname, avatar, password, authorizeType } = data

  res.locals.oAuth = { email, nickname, avatar, password, authorizeType }

  next()
}

export default oAuthtokenValidate
