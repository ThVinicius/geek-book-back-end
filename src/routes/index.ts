import { Router } from "express"
import usersRoute from "./usersRoute"
import userCollectionsRoute from "./userCollectionsRoute"
import categoriesRoute from "./categoriesRoute"
import collectionsRoute from "./collectionsRoute"
import statusRoute from "./statusRoute"
import sharesRoute from "./sharesRoute"

const route = Router()

route.use(statusRoute)
route.use(categoriesRoute)
route.use(collectionsRoute)
route.use(usersRoute)
route.use(userCollectionsRoute)
route.use(sharesRoute)

export default route
