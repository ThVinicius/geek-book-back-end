import { Router } from "express"
import schemaValidator from "../middlewares/schemaValidator"
import tokenValidate from "../middlewares/tokenValidate"
import userCollectionSchemas from "../schemas/userCollectionSchemas"
import userCollectionsController from "../controllers/userCollectionsController"

const route = Router()

route.post(
  "/user-collections",
  schemaValidator(userCollectionSchemas.create),
  tokenValidate,
  userCollectionsController.create
)

route.get(
  "/user-collections",
  tokenValidate,
  userCollectionsController.getByUserId
)

route.patch(
  "/user-collections/last-seen",
  schemaValidator(userCollectionSchemas.updateLastSeen),
  tokenValidate,
  userCollectionsController.updateLastSeen
)

route.patch(
  "/user-collections/status",
  schemaValidator(userCollectionSchemas.updateStatus),
  tokenValidate,
  userCollectionsController.updateStatus
)

const isParams = true

route.delete(
  "/user-collections/:id",
  schemaValidator(userCollectionSchemas.remove, isParams),
  tokenValidate,
  userCollectionsController.remove
)

export default route
