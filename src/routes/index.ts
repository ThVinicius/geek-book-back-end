import { Router } from 'express'
import usersRoute from './usersRoute'
import userCollectionsRoute from './userCollectionsRoute'

const route = Router()

route.use(usersRoute)
route.use(userCollectionsRoute)

export default route
