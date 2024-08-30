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
exports.resetPasswordService = exports.forgetPasswordService = exports.changePasswordService = exports.refreshTokenService = exports.signInService = exports.accountActivationService = exports.signUpService = void 0;
const prisma_1 = __importDefault(require("../../../utilities/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = require("./../../../errorFormating/apiError");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const auth_utils_1 = require("./auth.utils");
const emailSender_1 = __importDefault(require("../../../utilities/emailSender"));
// sign up
const signUpService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone } = data;
    // existency check
    const [userEmail, userPhone] = yield Promise.all([
        email && (0, auth_utils_1.isExist)(email),
        (0, auth_utils_1.isExist)(phone),
    ]);
    if (userEmail || userPhone) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, `${userEmail ? 'Email' : ''}${userEmail && userPhone ? ' & ' : ''}${userPhone ? 'Phone number' : ''} already ${userEmail || userPhone ? 'exists' : ''}`);
    }
    // save new user
    data.role = 'Consumer';
    data.password = '123456';
    if (email)
        data.isActive = false;
    const { password } = data;
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_solt_round));
    data.password = hashedPassword;
    if (email)
        data.activationToken = (0, jwtHelpers_1.createToken)({ email, phone }, config_1.default.jwt.activation_secret, config_1.default.jwt.activation_secret_expires_in);
    const result = yield prisma_1.default.user.create({
        data,
    });
    if (!result) {
        throw new Error(`User create failed`);
    }
    // send activation link
    if (email) {
        const emailData = {
            to: email,
            receiver: data.name,
            subject: `Account Activation`,
            link: `${config_1.default.client_url}/${data.activationToken}`,
            button_text: `Activation`,
            expTime: `1 hours`,
        };
        (0, emailSender_1.default)(emailData);
    }
    return result;
});
exports.signUpService = signUpService;
// account activation
const accountActivationService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const varifiedUser = (0, jwtHelpers_1.verifyToken)(token, config_1.default.jwt.activation_secret);
    const expire = (varifiedUser === null || varifiedUser === void 0 ? void 0 : varifiedUser.exp) > Date.now();
    if (expire) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Token expire');
    }
    const user = yield prisma_1.default.user.findFirst({
        where: {
            phone: varifiedUser === null || varifiedUser === void 0 ? void 0 : varifiedUser.phone,
        },
    });
    if (!user) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    user.isActive = true;
    user.activationToken = null;
    const result = yield prisma_1.default.user.update({
        where: {
            phone: user.phone,
        },
        data: user,
    });
    return result;
});
exports.accountActivationService = accountActivationService;
// sign in
const signInService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // existency check
    const user = yield (0, auth_utils_1.isExist)(data.phone);
    if (!user) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'Phone is incorrect');
    }
    // Password check
    const passwordMatch = yield bcrypt_1.default.compare(data.password, user.password);
    if (!passwordMatch) {
        throw new apiError_1.ApiError(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    // Create Access Token
    const { id, role, phone, name } = user;
    const accessToken = (0, jwtHelpers_1.createToken)({ id, role, phone, name }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    // Create Refresh Token
    const refreshToken = (0, jwtHelpers_1.createToken)({ id, role, phone, name }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.signInService = signInService;
// refresh token
const refreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = (0, jwtHelpers_1.verifyToken)(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new apiError_1.ApiError(http_status_1.default.FORBIDDEN, 'Invalid refresh token');
    }
    const { phone } = verifiedToken;
    // Existency Check
    const user = yield (0, auth_utils_1.isExist)(phone);
    if (!user) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //Generate New Access Token
    const newAccessToken = (0, jwtHelpers_1.createToken)({
        id: user.id,
        role: user.role,
        phone: user.phone,
        name: user.name,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.refreshTokenService = refreshTokenService;
// change password
const changePasswordService = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const { phone } = user;
    const isUserExist = yield (0, auth_utils_1.isExist)(phone);
    if (!isUserExist) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (isUserExist.password &&
        !(yield (0, auth_utils_1.isPasswordMatched)(oldPassword, isUserExist.password))) {
        throw new apiError_1.ApiError(http_status_1.default.UNAUTHORIZED, 'Old password is incorrect');
    }
    // hass
    const newHashedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_solt_round));
    const updatedData = {
        password: newHashedPassword,
    };
    yield prisma_1.default.user.update({
        where: { phone },
        data: updatedData,
    });
});
exports.changePasswordService = changePasswordService;
// forget password
const forgetPasswordService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield (0, auth_utils_1.isExist)(email);
    if (!isUserExist) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    isUserExist.passwordResetToken = (0, jwtHelpers_1.createToken)({ email }, config_1.default.jwt.reset_password_secret, config_1.default.jwt.reset_password_secret_expires_in);
    yield prisma_1.default.user.update({
        where: { email },
        data: isUserExist,
    });
    const emailData = {
        to: email,
        receiver: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.name,
        subject: `Reset Password`,
        link: `${config_1.default.client_url}/${isUserExist.passwordResetToken}`,
        button_text: `Reset Password`,
        expTime: `1 hours`,
    };
    (0, emailSender_1.default)(emailData);
});
exports.forgetPasswordService = forgetPasswordService;
// reset password
const resetPasswordService = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    const varifiedUser = (0, jwtHelpers_1.verifyToken)(token, config_1.default.jwt.reset_password_secret);
    const expire = (varifiedUser === null || varifiedUser === void 0 ? void 0 : varifiedUser.exp) > Date.now();
    if (expire) {
        throw new apiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'Token expire');
    }
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email: varifiedUser === null || varifiedUser === void 0 ? void 0 : varifiedUser.email,
        },
    });
    if (!user) {
        throw new apiError_1.ApiError(http_status_1.default.NOT_FOUND, 'User not found');
    }
    user.password = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_solt_round));
    user.passwordResetToken = null;
    const savedUser = yield prisma_1.default.user.update({
        where: {
            phone: user.phone,
        },
        data: user,
    });
    return savedUser;
});
exports.resetPasswordService = resetPasswordService;
