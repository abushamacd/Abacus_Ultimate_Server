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
exports.updateUser = exports.deleteUser = exports.getUsers = exports.uploadPhoto = exports.getUser = exports.updateUserRole = exports.updateUserProfile = exports.getUserProfile = void 0;
const tryCatch_1 = require("../../../utilities/tryCatch");
const sendRes_1 = require("../../../utilities/sendRes");
const http_status_1 = __importDefault(require("http-status"));
const user_services_1 = require("./user.services");
const pick_1 = require("../../../utilities/pick");
const user_constants_1 = require("./user.constants");
const pagination_1 = require("../../../constants/pagination");
// get user profile controller
exports.getUserProfile = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield (0, user_services_1.getUserProfileService)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User get successfully',
        data: result,
    });
}));
// update user profile controller
exports.updateUserProfile = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield (0, user_services_1.updateUserProfileService)((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User update successfully',
        data: result,
    });
}));
// update user role controller
exports.updateUserRole = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_services_1.updateUserRoleService)(req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User role update successfully',
        data: result,
    });
}));
// get user
exports.getUser = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield (0, user_services_1.getUserService)((_a = req.params) === null || _a === void 0 ? void 0 : _a.phone);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User get successfully',
        data: result,
    });
}));
// upload photo
exports.uploadPhoto = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_services_1.uploadPhotoService)(req);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blog image upload successfully',
        data: result,
    });
}));
// get Users
exports.getUsers = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, user_constants_1.userFilterableFields);
    const options = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const result = yield (0, user_services_1.getUsersService)(filters, options);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users retrived successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// delete user
exports.deleteUser = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield (0, user_services_1.deleteUserService)(id);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User deleted successfully',
        data: result,
    });
}));
// update user controller
exports.updateUser = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, user_services_1.updateUserService)(req.params.id, req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User update successfully',
        data: result,
    });
}));
