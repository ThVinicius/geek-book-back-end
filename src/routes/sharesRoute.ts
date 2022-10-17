import { Router } from "express"
import sharesController from "../controllers/sharesController"
import schemaValidator from "../middlewares/schemaValidator"
import tokenValidate from "../middlewares/tokenValidate"
import sharesShcemas from "../schemas/sharesShcemas"

const route = Router()

route.post("/share", tokenValidate, sharesController.createLink)

const isParams = true

route.get(
  "/share/:shortUrl",
  schemaValidator(sharesShcemas.get, isParams),
  sharesController.getCollection
)

export default route
