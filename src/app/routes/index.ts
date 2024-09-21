import express from 'express'
const router = express.Router()
import authRoute from '../modules/auth/auth.routes'
import userRoute from '../modules/user/user.routes'
import vehicleRoute from '../modules/vehicle/vehicle.routes'
import vehicleStatementRoute from '../modules/vehicleStatement/vehicleStatement.routes'
import vehicleRouteRoute from '../modules/vehicleRoute/vehicleRoute.routes'
import supplierRoute from '../modules/supplier/supplier.routes'
import unitRoute from '../modules/unit/unit.routes'

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
  {
    path: '/vehicleRoute',
    route: vehicleRouteRoute,
  },
  {
    path: '/supplier',
    route: supplierRoute,
  },
  {
    path: '/unit',
    route: unitRoute,
  },
]

appRoutes.forEach(route => router.use(route.path, route.route))

export default router
