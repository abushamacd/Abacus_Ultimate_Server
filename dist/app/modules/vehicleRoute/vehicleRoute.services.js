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
exports.deleteVehicleRouteService = exports.updateVehicleRouteService = exports.getVehicleRouteService = exports.getVehicleRoutesService = exports.createVehicleRouteService = void 0;
const prisma_1 = __importDefault(require("../../../utilities/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = require("./../../../errorFormating/apiError");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const vehicleRoute_constants_1 = require("./vehicleRoute.constants");
// import { asyncForEach } from '../../../utilities/asyncForEach'
// create vehicle route service
const createVehicleRouteService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicleRoute = yield prisma_1.default.vehicleRoute.findFirst({
        where: {
            name: data === null || data === void 0 ? void 0 : data.name,
        },
    });
    if (vehicleRoute) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Vehicle route is already exist');
    }
    const result = yield prisma_1.default.vehicleRoute.create({
        data,
    });
    if (!result) {
        throw new Error('Vehicle route create failed');
    }
    return result;
});
exports.createVehicleRouteService = createVehicleRouteService;
// get vehicle routes service
const getVehicleRoutesService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: vehicleRoute_constants_1.vehicleRouteSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.vehicleRoute.findMany({
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
        throw new Error('Vehicle route retrived failed');
    }
    const total = yield prisma_1.default.vehicleRoute.count({
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
exports.getVehicleRoutesService = getVehicleRoutesService;
// get vehicle route service
const getVehicleRouteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.vehicleRoute.findUnique({
        where: {
            id,
        },
    });
    if (!result) {
        throw new Error('VehicleRoute retrived failed');
    }
    return result;
});
exports.getVehicleRouteService = getVehicleRouteService;
// update vehicle route service
const updateVehicleRouteService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.vehicleRoute.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'VehicleRoute not found');
    }
    const result = yield prisma_1.default.vehicleRoute.update({
        where: {
            id,
        },
        data: payload,
    });
    if (!result) {
        throw new Error('VehicleRoute update failed');
    }
    return result;
});
exports.updateVehicleRouteService = updateVehicleRouteService;
// delete vehicle route service
const deleteVehicleRouteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.vehicleRoute.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'VehicleRoute not found');
    }
    const result = yield prisma_1.default.vehicleRoute.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.deleteVehicleRouteService = deleteVehicleRouteService;
