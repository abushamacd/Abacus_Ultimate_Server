"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reqValidate_1 = __importDefault(require("../../../middleware/reqValidate"));
const auth_1 = require("../../../middleware/auth");
const user_1 = require("../../../enums/user");
const vehicleRoute_validations_1 = require("./vehicleRoute.validations");
const vehicleRoute_controllers_1 = require("./vehicleRoute.controllers");
const router = express_1.default.Router();
// example vehicleRoute route
router
    .route('/')
    .post((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), (0, reqValidate_1.default)(vehicleRoute_validations_1.createVehicleRouteZod), vehicleRoute_controllers_1.createVehicleRoute)
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), vehicleRoute_controllers_1.getVehicleRoutes);
router
    .route('/:id')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), vehicleRoute_controllers_1.getVehicleRoute)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), vehicleRoute_controllers_1.updateVehicleRoute)
    .delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), vehicleRoute_controllers_1.deleteVehicleRoute);
exports.default = router;
