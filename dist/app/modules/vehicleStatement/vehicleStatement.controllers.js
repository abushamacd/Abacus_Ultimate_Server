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
exports.deleteVehicleStatement = exports.updateVehicleStatement = exports.getVehicleStatement = exports.getVehicleStatements = exports.createVehicleStatement = void 0;
const tryCatch_1 = require("../../../utilities/tryCatch");
const sendRes_1 = require("../../../utilities/sendRes");
const http_status_1 = __importDefault(require("http-status"));
const vehicleStatement_services_1 = require("./vehicleStatement.services");
const vehicleStatement_constants_1 = require("./vehicleStatement.constants");
const pagination_1 = require("../../../constants/pagination");
const pick_1 = require("../../../utilities/pick");
// create vehicleStatement controller
exports.createVehicleStatement = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, vehicleStatement_services_1.createVehicleStatementService)(req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Create vehicle statement successfully',
        data: result,
    });
}));
// get vehicle statements controller
exports.getVehicleStatements = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, vehicleStatement_constants_1.vehicleStatementFilterableFields);
    const options = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const result = yield (0, vehicleStatement_services_1.getVehicleStatementsService)(filters, options);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Vehicle statements retrived successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
// get vehicle statement controller
exports.getVehicleStatement = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield (0, vehicleStatement_services_1.getVehicleStatementService)((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Vehicle statement retrived successfully',
        data: result,
    });
}));
// update vehicle statement controller
exports.updateVehicleStatement = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, vehicleStatement_services_1.updateVehicleStatementService)(id, req === null || req === void 0 ? void 0 : req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Vehicle statement updated successfully',
        data: result,
    });
}));
// delete vehicle statement
exports.deleteVehicleStatement = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, vehicleStatement_services_1.deleteVehicleStatementService)(id);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Vehicle statement deleted successfully',
        data: result,
    });
}));
