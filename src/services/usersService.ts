import bcrypt from 'bcrypt'
import usersRepository from '../repositories/usersRepository'
import { unauthorized } from '../utils/throwError'
import { IUser } from '../types/userTypes'

async function create(data: IUser) {
  const password = bcryptPassword(data.password)

  data.password = password

  delete data.confirmPassword

  await usersRepository.insert(data)
}

function bcryptPassword(password: string) {
  const saltRounds: number = 10

  return bcrypt.hashSync(password, saltRounds)
}

async function hanleSignIn(user: IUser) {
  const dbUser = await usersRepository.getByEmail(user.email)

  if (dbUser === null) unauthorized('Email ou senha incorreta')

  validateBcrypt(user.password, dbUser!.password)

  return dbUser!
}

function validateBcrypt(decrypted: string, encrypted: string) {
  const compare = bcrypt.compareSync(decrypted, encrypted)

  if (!compare) return unauthorized('Email ou senha incorreta')
}

export default { create, hanleSignIn }
