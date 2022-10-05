import { Router } from "express"
import statusController from "../controllers/statusController"

const route = Router()

route.get("/status", statusController.getAll)

export default route
