import { Router } from "express"
import rankingsController from "../controllers/rankingsController"
import schemaValidator from "../middlewares/schemaValidator"
import tokenValidate from "../middlewares/tokenValidate"
import rankingsSchema from "../schemas/rankingsSchema"

const route = Router()

route.post(
  "/rankings",
  schemaValidator(rankingsSchema.create),
  tokenValidate,
  rankingsController.create
)

const isParams = true

route.delete(
  "/rankings/:id",
  schemaValidator(rankingsSchema.remove, isParams),
  tokenValidate,
  rankingsController.remove
)

route.patch(
  "/rankings",
  schemaValidator(rankingsSchema.update),
  tokenValidate,
  rankingsController.updateUserCollection
)

route.get("/rankings", tokenValidate, rankingsController.get)

route.get(
  "/rankings/user-collections",
  tokenValidate,
  rankingsController.getMissingUserCollection
)

export default route
