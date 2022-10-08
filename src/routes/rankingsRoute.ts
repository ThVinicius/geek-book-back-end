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

export default route
