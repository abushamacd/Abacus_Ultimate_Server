
import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { createVehicleRouteZod } from './vehicleRoute.validations'
import { createVehicleRoute, deleteVehicleRoute, getVehicleRoute, getVehicleRoutes, updateVehicleRoute } from './vehicleRoute.controllers'

const router = express.Router()

// example vehicleRoute route
router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.OWNER,),
    reqValidate(createVehicleRouteZod),
    createVehicleRoute
  )
  .get(auth(ENUM_USER_ROLE.OWNER), getVehicleRoutes)

router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), getVehicleRoute)
  .patch(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), updateVehicleRoute)
    .delete(auth(ENUM_USER_ROLE.OWNER), deleteVehicleRoute)

export default router
