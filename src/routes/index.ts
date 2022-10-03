import { Router } from 'express'
import usersRoute from './usersRoute'
import userCollectionsRoute from './userCollectionsRoute'
import categoriesRoute from './categoriesRoute'
import collectionsRoute from './collectionsRoute'

const route = Router()

route.use(categoriesRoute)
route.use(collectionsRoute)
route.use(usersRoute)
route.use(userCollectionsRoute)

export default route
