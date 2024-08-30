"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const vehicle_routes_1 = __importDefault(require("../modules/vehicle/vehicle.routes"));
const vehicleStatement_routes_1 = __importDefault(require("../modules/vehicleStatement/vehicleStatement.routes"));
const vehicleRoute_routes_1 = __importDefault(require("../modules/vehicleRoute/vehicleRoute.routes"));
const appRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.default,
    },
    {
        path: '/user',
        route: user_routes_1.default,
    },
    {
        path: '/vehicle',
        route: vehicle_routes_1.default,
    },
    {
        path: '/vehicleStatement',
        route: vehicleStatement_routes_1.default,
    },
    {
        path: '/vehicleRoute',
        route: vehicleRoute_routes_1.default,
    },
];
appRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
