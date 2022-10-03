import { Router } from 'express'
import schemaValidator from '../middlewares/schemaValidator'
import collectionsSchema from '../schemas/collectionsSchema'
import collectionsControllers from '../controllers/collectionsControllers'

const route = Router()

const isParams = true

route.get(
  '/collections/:categoryId',
  schemaValidator(collectionsSchema.get, isParams),
  collectionsControllers.getByCategory
)

export default route
