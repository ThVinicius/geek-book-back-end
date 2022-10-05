import { Router } from "express"
import categoriesController from "../controllers/categoriesController"

const route = Router()

route.get("/categories", categoriesController.getAll)

export default route
