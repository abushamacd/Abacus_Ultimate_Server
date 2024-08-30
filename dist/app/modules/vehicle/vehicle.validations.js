"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVehicleZod = void 0;
const zod_1 = require("zod");
// Create vehicle zod validation schema
exports.createVehicleZod = zod_1.z.object({
    body: zod_1.z.object({
        vNumber: zod_1.z.string({
            required_error: 'Vehicle number is required',
        }),
        route: zod_1.z.string({
            required_error: 'Vehicle route is required',
        }),
        driverId: zod_1.z.string({
            required_error: 'Driver ID is required',
        }),
        supervisorId: zod_1.z.string({
            required_error: 'Supervisor ID is required',
        }),
    }),
});
