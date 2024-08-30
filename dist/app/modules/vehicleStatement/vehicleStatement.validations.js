"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVehicleStatementZod = void 0;
const zod_1 = require("zod");
// Create vehicleStatement zod validation schema
exports.createVehicleStatementZod = zod_1.z.object({
    body: zod_1.z.object({
        date: zod_1.z.string({
            required_error: 'Date is required',
        }),
        route: zod_1.z.string({
            required_error: 'Route is required',
        }),
        oil: zod_1.z.number({
            required_error: 'Oil (Liter) is required',
        }),
        income: zod_1.z.number({
            required_error: 'Income is required',
        }),
        expense: zod_1.z.number({
            required_error: 'Expense is required',
        }),
        vehicleId: zod_1.z.string({
            required_error: 'Vehicle Id is required',
        }),
    }),
});
