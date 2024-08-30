"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (error) => {
    const errors = [
        {
            path: '',
            message: error.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessage: errors,
    };
};
exports.handleValidationError = handleValidationError;
