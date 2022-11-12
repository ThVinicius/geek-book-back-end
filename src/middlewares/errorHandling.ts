import { ErrorRequestHandler } from 'express'
import usersService from '../services/usersService'

export const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
  if (error.name !== undefined && error.name.length >= 16) {
    switch (error.name) {
      case 'JsonWebTokenError':
        return res.status(401).send('token inválido')

      case 'TokenExpiredError':
        return res.status(498).send('token expirado')

      case 'Upgrade Required':
        return res.status(426).send(error.message)

      default:
        console.log(error)
        return res.status(500).send(error)
    }
  }

  switch (error.code) {
    case 'Bad request':
      return res.status(400).send(error.message)

    case 'Unauthorized':
      return res.status(401).send(error.message)

    case 'Not Found':
      return res.status(404).send(error.message)

    case 'Not Acceptable':
      return res.status(406).send(error.message)

    case 'Conflit':
      return res.status(409).send(error.message)

    case 'ConflitOauth':
      const { data, message } = error

      const token = usersService.createOauthToken(data)

      return res.status(409).send({ message, token })

    default:
      console.log(error)
      return res.status(500).send(error)
  }
}
