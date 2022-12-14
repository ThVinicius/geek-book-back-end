import { Router } from 'express'
import schemaValidator from '../middlewares/schemaValidator'
import userSchemas from '../schemas/userSchemas'
import usersController from '../controllers/usersController'
import oAuthtokenValidate from '../middlewares/oAuthTokenValidate'

const route = Router()

route.post(
  '/signup',
  schemaValidator(userSchemas.signUp),
  usersController.signUp
)

route.post(
  '/signin',
  schemaValidator(userSchemas.signIn),
  usersController.signIn
)

route.post(
  '/signin/github',
  schemaValidator(userSchemas.githubOauth),
  usersController.githubOauth
)

route.post(
  '/signup/oauth',
  schemaValidator(userSchemas.signUpOauth),
  oAuthtokenValidate,
  usersController.signUpOauth
)

export default route
