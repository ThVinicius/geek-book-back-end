import { Router } from 'express'
import usersRoute from './usersRoute'
import userCollectionsRoute from './userCollectionsRoute'
import categoriesRoute from './categoriesRoute'

const route = Router()

route.use(usersRoute)
route.use(userCollectionsRoute)
route.use(categoriesRoute)

export default route
