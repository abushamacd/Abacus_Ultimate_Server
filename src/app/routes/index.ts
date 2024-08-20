import express from 'express'
const router = express.Router()
import authRoute from '../modules/auth/auth.routes'
import userRoute from '../modules/user/user.routes'
import vehicleRoute from '../modules/vehicle/vehicle.routes'

const appRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/vehicle',
    route: vehicleRoute,
  },
]

appRoutes.forEach(route => router.use(route.path, route.route))

export default router
