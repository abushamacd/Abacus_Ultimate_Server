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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleStatementService = exports.updateVehicleStatementService = exports.getVehicleStatementService = exports.getVehicleStatementsService = exports.createVehicleStatementService = void 0;
const prisma_1 = __importDefault(require("../../../utilities/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = require("./../../../errorFormating/apiError");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const vehicleStatement_constants_1 = require("./vehicleStatement.constants");
// import { asyncForEach } from '../../../utilities/asyncForEach'
// create vehicleStatement service
const createVehicleStatementService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = yield prisma_1.default.vehicle.findFirst({
        where: {
            id: data === null || data === void 0 ? void 0 : data.vehicleId,
        },
    });
    if (!vehicle) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Vehicle not found');
    }
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const vStatement = yield prisma_1.default.vehicleStatement.create({
            data,
        });
        vehicle.oil += vStatement === null || vStatement === void 0 ? void 0 : vStatement.oil;
        vehicle.income += vStatement === null || vStatement === void 0 ? void 0 : vStatement.income;
        vehicle.expense += vStatement === null || vStatement === void 0 ? void 0 : vStatement.expense;
        vehicle.welfare += vStatement === null || vStatement === void 0 ? void 0 : vStatement.welfare;
        vehicle.servicing += vStatement === null || vStatement === void 0 ? void 0 : vStatement.servicing;
        yield transactionClient.vehicle.update({
            where: {
                id: vStatement === null || vStatement === void 0 ? void 0 : vStatement.vehicleId,
            },
            data: vehicle,
        });
        return vStatement;
    }));
    return result;
});
exports.createVehicleStatementService = createVehicleStatementService;
// get vehicle statements service
const getVehicleStatementsService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: vehicleStatement_constants_1.vehicleStatementSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    // mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.vehicleStatement.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    if (!result) {
        throw new Error('Vehicle statement retrived failed');
    }
    const total = yield prisma_1.default.vehicleStatement.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
exports.getVehicleStatementsService = getVehicleStatementsService;
// get vehicle statement service
const getVehicleStatementService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.vehicleStatement.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new Error('Vehicle statement retrived failed');
    }
    return result;
});
exports.getVehicleStatementService = getVehicleStatementService;
// update vehicle statement service
const updateVehicleStatementService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.vehicleStatement.findUnique({
        where: {
            id,
        },
    });
    const vehicle = yield prisma_1.default.vehicle.findFirst({
        where: {
            id: isExist === null || isExist === void 0 ? void 0 : isExist.vehicleId,
        },
    });
    if (!vehicle || !isExist) {
        throw new apiError_1.ApiError(!vehicle ? http_status_1.default.NOT_FOUND : http_status_1.default.BAD_REQUEST, !vehicle ? 'Vehicle not found' : 'Vehicle statement not found');
    }
    //
    const { vehicleId } = payload, vData = __rest(payload, ["vehicleId"]);
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // minus previous figure
        if (vData === null || vData === void 0 ? void 0 : vData.oil)
            vehicle.oil -= isExist === null || isExist === void 0 ? void 0 : isExist.oil;
        if (vData === null || vData === void 0 ? void 0 : vData.income)
            vehicle.income -= isExist === null || isExist === void 0 ? void 0 : isExist.income;
        if (vData === null || vData === void 0 ? void 0 : vData.expense)
            vehicle.expense -= isExist === null || isExist === void 0 ? void 0 : isExist.expense;
        if (vData === null || vData === void 0 ? void 0 : vData.welfare)
            vehicle.welfare -= isExist === null || isExist === void 0 ? void 0 : isExist.welfare;
        if (vData === null || vData === void 0 ? void 0 : vData.servicing)
            vehicle.servicing -= isExist === null || isExist === void 0 ? void 0 : isExist.servicing;
        // add new figure
        if (vData === null || vData === void 0 ? void 0 : vData.oil)
            vehicle.oil += vData === null || vData === void 0 ? void 0 : vData.oil;
        if (vData === null || vData === void 0 ? void 0 : vData.income)
            vehicle.income += vData === null || vData === void 0 ? void 0 : vData.income;
        if (vData === null || vData === void 0 ? void 0 : vData.expense)
            vehicle.expense += vData === null || vData === void 0 ? void 0 : vData.expense;
        if (vData === null || vData === void 0 ? void 0 : vData.welfare)
            vehicle.welfare += vData === null || vData === void 0 ? void 0 : vData.welfare;
        if (vData === null || vData === void 0 ? void 0 : vData.servicing)
            vehicle.servicing += vData === null || vData === void 0 ? void 0 : vData.servicing;
        yield transactionClient.vehicle.update({
            where: {
                id: isExist === null || isExist === void 0 ? void 0 : isExist.vehicleId,
            },
            data: vehicle,
        });
        const vStatement = yield prisma_1.default.vehicleStatement.update({
            where: {
                id,
            },
            data: vData,
        });
        return vStatement;
    }));
    if (!result) {
        throw new Error('VehicleStatement update failed');
    }
    return result;
});
exports.updateVehicleStatementService = updateVehicleStatementService;
// delete vehicle statement service
const deleteVehicleStatementService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.vehicleStatement.findUnique({
        where: {
            id,
        },
    });
    const vehicle = yield prisma_1.default.vehicle.findFirst({
        where: {
            id: isExist === null || isExist === void 0 ? void 0 : isExist.vehicleId,
        },
    });
    if (!vehicle || !isExist) {
        throw new apiError_1.ApiError(!vehicle ? http_status_1.default.NOT_FOUND : http_status_1.default.BAD_REQUEST, !vehicle ? 'Vehicle not found' : 'Vehicle statement not found');
    }
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // minus previous figure
        vehicle.oil -= isExist === null || isExist === void 0 ? void 0 : isExist.oil;
        vehicle.income -= isExist === null || isExist === void 0 ? void 0 : isExist.income;
        vehicle.expense -= isExist === null || isExist === void 0 ? void 0 : isExist.expense;
        vehicle.welfare -= isExist === null || isExist === void 0 ? void 0 : isExist.welfare;
        vehicle.servicing -= isExist === null || isExist === void 0 ? void 0 : isExist.servicing;
        yield transactionClient.vehicle.update({
            where: {
                id: isExist === null || isExist === void 0 ? void 0 : isExist.vehicleId,
            },
            data: vehicle,
        });
        const vStatement = yield prisma_1.default.vehicleStatement.delete({
            where: {
                id,
            },
        });
        return vStatement;
    }));
    if (!result) {
        throw new Error('VehicleStatement update failed');
    }
    return result;
});
exports.deleteVehicleStatementService = deleteVehicleStatementService;
