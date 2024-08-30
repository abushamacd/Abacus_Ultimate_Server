"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reqValidate_1 = __importDefault(require("../../../middleware/reqValidate"));
const auth_1 = require("../../../middleware/auth");
const user_1 = require("../../../enums/user");
const vehicleStatement_validations_1 = require("./vehicleStatement.validations");
const vehicleStatement_controllers_1 = require("./vehicleStatement.controllers");
const router = express_1.default.Router();
// example vehicleStatement route
router
    .route('/')
    .post((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), (0, reqValidate_1.default)(vehicleStatement_validations_1.createVehicleStatementZod), vehicleStatement_controllers_1.createVehicleStatement)
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), vehicleStatement_controllers_1.getVehicleStatements);
router
    .route('/:id')
    .get((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), vehicleStatement_controllers_1.getVehicleStatement)
    .patch((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), vehicleStatement_controllers_1.updateVehicleStatement)
    .delete((0, auth_1.auth)(user_1.ENUM_USER_ROLE.OWNER), vehicleStatement_controllers_1.deleteVehicleStatement);
exports.default = router;
