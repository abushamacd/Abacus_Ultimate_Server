"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordZod = exports.forgetPasswordZod = exports.changePasswordZod = exports.refreshTokenZod = exports.signInZod = exports.signUpZod = void 0;
const zod_1 = require("zod");
exports.signUpZod = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        phone: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
    }),
});
exports.signInZod = zod_1.z.object({
    body: zod_1.z.object({
        phone: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
exports.refreshTokenZod = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.changePasswordZod = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({
            required_error: 'Old password is required',
        }),
        newPassword: zod_1.z.string({
            required_error: 'New password is required',
        }),
    }),
});
exports.forgetPasswordZod = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
    }),
});
exports.resetPasswordZod = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
