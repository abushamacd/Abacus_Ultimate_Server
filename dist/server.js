"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const logger_1 = require("./utilities/logger");
const bootStrap_1 = require("./utilities/bootStrap");
let server;
process.on('uncaughtException', error => {
    logger_1.errorLogger.error(error);
    process.exit(1);
});
(0, bootStrap_1.bootStrap)();
// process.on('SIGTERM', () => {
//   logger.info(`Sigterm is received`)
//   if (server) {
//     server.close()
//   }
// })
