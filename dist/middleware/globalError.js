"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalError = void 0;
const config_1 = __importDefault(require("../config"));
const handleValidationError_1 = require("../errorFormating/handleValidationError");
const apiError_1 = require("../errorFormating/apiError");
const logger_1 = require("../utilities/logger");
const zod_1 = require("zod");
const handleZodError_1 = require("../errorFormating/handleZodError");
const handleCastError_1 = require("../errorFormating/handleCastError");
const client_1 = require("@prisma/client");
const globalError = (error, req, res, next) => {
    let statusCode = 403;
    let message = 'JWT Expired';
    let errorMessage = [];
    // Dependency
    config_1.default.env === 'development'
        ? console.log(`Global Error Handler ==`, error)
        : logger_1.errorLogger.error(`Global Error Handler ==`, error);
    // Check
    if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.handleZodError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        const simplifiedError = (0, handleCastError_1.handleCastError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof apiError_1.ApiError) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    // Return Response
    res.status(statusCode).send({
        success: false,
        message,
        errorMessage,
        stack: config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.globalError = globalError;
