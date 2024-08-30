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
exports.updateUserService = exports.deleteUserService = exports.getUsersService = exports.uploadPhotoService = exports.getUserService = exports.updateUserRoleService = exports.updateUserProfileService = exports.getUserProfileService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const prisma_1 = __importDefault(require("../../../utilities/prisma"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const FileUploadHelper_1 = require("../../../helpers/FileUploadHelper");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_constants_1 = require("./user.constants");
const apiError_1 = require("../../../errorFormating/apiError");
const http_status_1 = __importDefault(require("http-status"));
// get user profile service
const getUserProfileService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
    return result;
});
exports.getUserProfileService = getUserProfileService;
// update user profile service
const updateUserProfileService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, password } = payload, userData = __rest(payload, ["role", "password"]);
    const isExist = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    // phone and email  existency check in another user
    const phoneExist = yield prisma_1.default.user.findUnique({
        where: {
            phone: userData.phone,
        },
    });
    if (isExist.phone !== (phoneExist === null || phoneExist === void 0 ? void 0 : phoneExist.phone) && phoneExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Phone number is used in another user');
    }
    if (userData.email) {
        const emailExist = yield prisma_1.default.user.findUnique({
            where: {
                email: userData.email,
            },
        });
        if (isExist.email !== (emailExist === null || emailExist === void 0 ? void 0 : emailExist.email) && emailExist) {
            throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Email is used in another user');
        }
    }
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: userData,
    });
    return result;
});
exports.updateUserProfileService = updateUserProfileService;
// update user role service
const updateUserRoleService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = payload;
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: id,
        },
    });
    const result = yield prisma_1.default.user.update({
        where: {
            id: payload === null || payload === void 0 ? void 0 : payload.id,
        },
        data: { role: role },
    });
    return result;
});
exports.updateUserRoleService = updateUserRoleService;
// get user profile service
const getUserService = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            phone,
        },
    });
    return result;
});
exports.getUserService = getUserService;
// user photo upload
const uploadPhotoService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id,
        },
    });
    if (user === null || user === void 0 ? void 0 : user.public_id) {
        const { public_id } = user;
        yield cloudinary_1.default.v2.uploader.destroy(public_id);
        const file = req.file;
        const photo = yield FileUploadHelper_1.FileUploadHelper.uploadPhoto(file);
        const data = {
            public_id: photo === null || photo === void 0 ? void 0 : photo.public_id,
            url: photo === null || photo === void 0 ? void 0 : photo.secure_url,
        };
        const result = yield prisma_1.default.user.update({
            where: {
                id: user === null || user === void 0 ? void 0 : user.id,
            },
            data,
        });
        if (!result) {
            throw new Error(`Photo upload failed`);
        }
    }
    else {
        const file = req.file;
        const photo = yield FileUploadHelper_1.FileUploadHelper.uploadPhoto(file);
        const data = {
            public_id: photo === null || photo === void 0 ? void 0 : photo.public_id,
            url: photo === null || photo === void 0 ? void 0 : photo.secure_url,
        };
        const result = yield prisma_1.default.user.update({
            where: {
                id: user === null || user === void 0 ? void 0 : user.id,
            },
            data,
        });
        if (!result) {
            throw new Error(`Photo upload failed`);
        }
    }
    return user;
});
exports.uploadPhotoService = uploadPhotoService;
// get Users service
const getUsersService = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = (0, paginationHelper_1.calculatePagination)(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: user_constants_1.userSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                createdAt: 'asc',
            },
    });
    const total = yield prisma_1.default.user.count({
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
exports.getUsersService = getUsersService;
// delete user service
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
        // include: {
        //   tasks: true,
        // },
    });
    if (!isExist) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'User not found');
    }
    // if (isExist?.tasks.length > 0) {
    //   throw new Error(
    //     `User is assign to task ${isExist?.tasks[0]?.title}. First remove the user from task ${isExist?.tasks[0]?.title}`,
    //   )
    // }
    const result = yield prisma_1.default.user.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.deleteUserService = deleteUserService;
// update user service
const updateUserService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, password } = payload, userData = __rest(payload, ["role", "password"]);
    const result = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: userData,
    });
    return result;
});
exports.updateUserService = updateUserService;
