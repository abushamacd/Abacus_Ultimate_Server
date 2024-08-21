import express from 'express'
const router = express.Router()
import authRoute from '../modules/auth/auth.routes'
import userRoute from '../modules/user/user.routes'
import vehicleRoute from '../modules/vehicle/vehicle.routes'
import vehicleStatementRoute from '../modules/vehicleStatement/vehicleStatement.routes'

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
  {
    path: '/vehicleStatement',
    route: vehicleStatementRoute,
  },
]

appRoutes.forEach(route => router.use(route.path, route.route))

export default router
