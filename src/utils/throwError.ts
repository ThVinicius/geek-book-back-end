import { IUser } from '../types/userTypes'

export function badRequest(message: string) {
  throw { code: 'Bad request', message }
}

export function unauthorized(message: string) {
  throw { code: 'Unauthorized', message }
}

export function notFound(message: string) {
  throw { code: 'Not Found', message }
}

export function conflit(message: string) {
  throw { code: 'Conflit', message }
}

export function conflitOauth(message: string, data: IUser) {
  throw { code: 'ConflitOauth', message, data }
}

export function upgradeRequired(message: string) {
  throw { name: 'Upgrade Required', message }
}

export function notAcceptable(message: string) {
  throw { code: 'Not Acceptable', message }
}
