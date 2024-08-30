"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    db_uri: process.env.DATABASE_URL,
    bcrypt_solt_round: process.env.BCRYPT_SOLT_ROUND,
    client_url: process.env.CLIENT_URL,
    mail_id: process.env.MAIL_ID,
    mail_pass: process.env.MAIL_PASS,
    cloudinary: {
        could_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
        activation_secret: process.env.JWT_ACTIVITION_SECRET,
        activation_secret_expires_in: process.env.JWT_ACTIVITION_SECRET_EXPIRES_IN,
        reset_password_secret: process.env.JWT_RESET_PASSWORD_SECRET,
        reset_password_secret_expires_in: process.env.JWT_RESET_PASSWORD_SECRET_EXPIRES_IN,
    },
};
