import { Router } from "express"
import schemaValidator from "../middlewares/schemaValidator"
import tokenValidate from "../middlewares/tokenValidate"
import userCollectionSchemas from "../schemas/userCollectionSchemas"
import userCollectionsController from "../controllers/userCollectionsController"

const route = Router()

route.use(tokenValidate)

route.post(
  "/user-collections",
  schemaValidator(userCollectionSchemas.create),
  userCollectionsController.create
)

route.get("/user-collections", userCollectionsController.getByUserId)

route.patch(
  "/user-collections",
  schemaValidator(userCollectionSchemas.update),
  userCollectionsController.updateLastSeen
)

const isParams = true

route.delete(
  "/user-collections/:id",
  schemaValidator(userCollectionSchemas.remove, isParams),
  userCollectionsController.remove
)

export default route
