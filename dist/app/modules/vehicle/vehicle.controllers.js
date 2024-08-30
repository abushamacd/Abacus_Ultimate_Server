"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.updateVehicle = exports.getVehicle = exports.getVehicles = exports.createVehicle = void 0;
const tryCatch_1 = require("../../../utilities/tryCatch");
const sendRes_1 = require("../../../utilities/sendRes");
const http_status_1 = __importDefault(require("http-status"));
const vehicle_services_1 = require("./vehicle.services");
const vehicle_constants_1 = require("./vehicle.constants");
const pagination_1 = require("../../../constants/pagination");
const pick_1 = require("../../../utilities/pick");
// create vehicle controller
exports.createVehicle = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, vehicle_services_1.createVehicleService)(req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Create vehicle successfully',
        data: result,
    });
}));
// get vehicles controller
exports.getVehicles = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, vehicle_constants_1.vehicleFilterableFields);
    const options = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const result = yield (0, vehicle_services_1.getVehiclesService)(filters, options);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Vehicles retrived successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
// get vehicle controller
exports.getVehicle = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield (0, vehicle_services_1.getVehicleService)((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Vehicle retrived successfully',
        data: result,
    });
}));
// update vehicle controller
exports.updateVehicle = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, vehicle_services_1.updateVehicleService)(id, req === null || req === void 0 ? void 0 : req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Vehicle updated successfully',
        data: result,
    });
}));
// delete vehicle
exports.deleteVehicle = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, vehicle_services_1.deleteVehicleService)(id);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Vehicle deleted successfully',
        data: result,
    });
}));
