import { Router } from "express"
import sharesController from "../controllers/sharesController"
import tokenValidate from "../middlewares/tokenValidate"

const route = Router()

route.post("/share", tokenValidate, sharesController.createLink)

route.get("/share/:shortUrl", sharesController.getCollection)

export default route
