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
exports.resetPassword = exports.forgetPassword = exports.changePassword = exports.refreshToken = exports.signIn = exports.accountActivation = exports.signUp = void 0;
const tryCatch_1 = require("../../../utilities/tryCatch");
const sendRes_1 = require("../../../utilities/sendRes");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const auth_services_1 = require("./auth.services");
// sign up
exports.signUp = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_services_1.signUpService)(req.body);
    (0, sendRes_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: req.body.email
            ? `Check email: ${req.body.email} to active your account`
            : `Sign up successfully`,
        data: result,
    });
}));
// account activation
exports.accountActivation = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const result = yield (0, auth_services_1.accountActivationService)(token);
    (0, sendRes_1.sendRes)(res, {
        statusCode: 200,
        success: true,
        message: 'Account active successfully',
        data: result,
    });
}));
// sign in
exports.signIn = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, auth_services_1.signInService)(req.body);
    if (result !== null) {
        const { refreshToken } = result, others = __rest(result
        // Set Refresh Token in Cookies
        , ["refreshToken"]);
        // Set Refresh Token in Cookies
        const cookieOptions = {
            secure: config_1.default.env === 'production',
            httpOnly: true,
            sameSite: true,
            maxAge: 365 * 24 * 60 * 60 * 1000,
        };
        res.cookie('refreshToken', refreshToken, cookieOptions);
        (0, sendRes_1.sendRes)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Sign in successfully',
            data: others,
        });
    }
    else {
        (0, sendRes_1.sendRes)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: true,
            message: 'Sign in failed',
            data: result,
        });
    }
}));
// refresh token
exports.refreshToken = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield (0, auth_services_1.refreshTokenService)(refreshToken);
    // Set Refresh Token in Cookies
    // const cookieOptions = {
    //   secure: config.env === 'production',
    //   httpOnly: true,
    // }
    // res.cookie('refreshToken', refreshToken, cookieOptions)
    (0, sendRes_1.sendRes)(res, {
        statusCode: 200,
        success: true,
        message: 'New access token successfully',
        data: result,
    });
}));
// /change password
exports.changePassword = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_services_1.changePasswordService)(req.body, req.user);
    (0, sendRes_1.sendRes)(res, {
        statusCode: 200,
        success: true,
        message: 'Password changed successfully !',
    });
}));
// forget password
exports.forgetPassword = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    yield (0, auth_services_1.forgetPasswordService)(email);
    (0, sendRes_1.sendRes)(res, {
        statusCode: 200,
        success: true,
        message: 'Send reset token in you email successfully !',
    });
}));
// reset password
exports.resetPassword = (0, tryCatch_1.tryCatch)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const { token } = req.params;
    const result = yield (0, auth_services_1.resetPasswordService)(token, password);
    (0, sendRes_1.sendRes)(res, {
        statusCode: 200,
        success: true,
        message: 'Password reset successfully',
        data: result,
    });
}));
