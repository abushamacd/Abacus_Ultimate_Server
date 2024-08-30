"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reqValidate_1 = __importDefault(require("../../../middleware/reqValidate"));
const auth_1 = require("../../../middleware/auth");
const user_1 = require("../../../enums/user");
const vehicle_validations_1 = require("./vehicle.validations");
const vehicle_controllers_1 = require("./vehicle.controllers");
const router = express_1.default.Router();
// example vehicle route
router
    .route('/')
    .post((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), (0, reqValidate_1.default)(vehicle_validations_1.createVehicleZod), vehicle_controllers_1.createVehicle)
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), vehicle_controllers_1.getVehicles);
router
    .route('/:id')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), vehicle_controllers_1.getVehicle)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER, user_1.ENUM_USER_ROLE.MANAGER), vehicle_controllers_1.updateVehicle)
    .delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), vehicle_controllers_1.deleteVehicle);
exports.default = router;
