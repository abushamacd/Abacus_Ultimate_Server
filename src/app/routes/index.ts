import express from 'express'
const router = express.Router()
import authRoute from '../modules/auth/auth.routes'

const appRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
]

appRoutes.forEach(route => router.use(route.path, route.route))

export default router
