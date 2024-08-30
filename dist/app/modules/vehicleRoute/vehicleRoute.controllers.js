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
exports.deleteVehicleRoute = exports.updateVehicleRoute = exports.getVehicleRoute = exports.getVehicleRoutes = exports.createVehicleRoute = void 0;
const tryCatch_1 = require("../../../utilities/tryCatch");
const sendRes_1 = require("../../../utilities/sendRes");
const http_status_1 = __importDefault(require("http-status"));
const vehicleRoute_services_1 = require("./vehicleRoute.services");
const vehicleRoute_constants_1 = require("./vehicleRoute.constants");
const pagination_1 = require("../../../constants/pagination");
const pick_1 = require("../../../utilities/pick");
// create vehicle route controller
exports.createVehicleRoute = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, vehicleRoute_services_1.createVehicleRouteService)(req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Create vehicle route successfully',
        data: result,
    });
}));
// get vehicle routes controller
exports.getVehicleRoutes = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, vehicleRoute_constants_1.vehicleRouteFilterableFields);
    const options = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const result = yield (0, vehicleRoute_services_1.getVehicleRoutesService)(filters, options);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Vehicle routes retrived successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
// get vehicle route controller
exports.getVehicleRoute = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield (0, vehicleRoute_services_1.getVehicleRouteService)((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Vehicle route retrived successfully',
        data: result,
    });
}));
// update vehicle route controller
exports.updateVehicleRoute = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, vehicleRoute_services_1.updateVehicleRouteService)(id, req === null || req === void 0 ? void 0 : req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Vehicle route updated successfully',
        data: result,
    });
}));
// delete vehicle route
exports.deleteVehicleRoute = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, vehicleRoute_services_1.deleteVehicleRouteService)(id);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Vehicle route deleted successfully',
        data: result,
    });
}));
