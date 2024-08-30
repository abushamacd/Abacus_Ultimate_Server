"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserZod = void 0;
const zod_1 = require("zod");
// Create user zod validation schema
exports.createUserZod = zod_1.z.object({
    body: zod_1.z.object({
        key: zod_1.z.string({
            required_error: 'Z: Key name is required',
        }),
    }),
});
