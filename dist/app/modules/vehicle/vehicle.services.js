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
exports.deleteVehicleService = exports.updateVehicleService = exports.getVehicleService = exports.getVehiclesService = exports.createVehicleService = void 0;
const prisma_1 = __importDefault(require("../../../utilities/prisma"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = require("./../../../errorFormating/apiError");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const vehicle_constants_1 = require("./vehicle.constants");
// import { asyncForEach } from '../../../utilities/asyncForEach'
// create vehicle service
const createVehicleService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = yield prisma_1.default.vehicle.findFirst({
        where: {
            vNumber: data === null || data === void 0 ? void 0 : data.vNumber,
        },
    });
    if (vehicle) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Vehicle is already exist');
    }
    const result = yield prisma_1.default.vehicle.create({
        data,
    });
    if (!result) {
        throw new Error('Vehicle create failed');
    }
    return result;
});
exports.createVehicleService = createVehicleService;
// get vehicles service
const getVehiclesService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: vehicle_constants_1.vehicleSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.vehicle.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'asc',
            },
        // include: {
        //   driver: true,
        //   supervisor: true,
        // },
    });
    if (!result) {
        throw new Error('Vehicle retrived failed');
    }
    const total = yield prisma_1.default.vehicle.count({
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
exports.getVehiclesService = getVehiclesService;
// get vehicle service
const getVehicleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.vehicle.findUnique({
        where: {
            id,
        },
        include: {
            driver: true,
            supervisor: true,
        },
    });
    if (!result) {
        throw new Error('Vehicle retrived failed');
    }
    return result;
});
exports.getVehicleService = getVehicleService;
// update vehicle service
const updateVehicleService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.vehicle.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Vehicle not found');
    }
    const result = yield prisma_1.default.vehicle.update({
        where: {
            id,
        },
        data: payload,
        include: {
            driver: true,
            supervisor: true,
        },
    });
    if (!result) {
        throw new Error('Vehicle update failed');
    }
    return result;
});
exports.updateVehicleService = updateVehicleService;
// delete vehicle service
const deleteVehicleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.vehicle.findUnique({
        where: {
            id,
        },
        // include: {
        //   // @ts-ignore
        //   tasks: {
        //     orderBy: {
        //       position: 'asc',
        //     },
        //   },
        // },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Vehicle not found');
    }
    const result = yield prisma_1.default.vehicle.delete({
        where: {
            id,
        },
    });
    // await prisma.$transaction(async transactionClient => {
    //   await asyncForEach(isExist?.sections, async (section: Vehicle) => {
    //     await transactionClient.task.deleteMany({
    //       where: {
    //         sectionId: section?.id,
    //       },
    //     })
    //   })
    //   await transactionClient.section.deleteMany({
    //     where: {
    //       vehicleId: id,
    //     },
    //   })
    //   await transactionClient.vehicle.delete({
    //     where: {
    //       id,
    //     },
    //   })
    // })
    return result;
});
exports.deleteVehicleService = deleteVehicleService;
