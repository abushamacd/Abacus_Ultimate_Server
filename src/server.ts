/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { errorLogger, logger } from './utilities/logger'
import { bootStrap } from './utilities/bootStrap'
import { Server } from 'http'
import { syncInvoices } from './syncData'
let server: Server

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

bootStrap()

setInterval(syncInvoices, 1000 * 5)

// process.on('SIGTERM', () => {
//   logger.info(`Sigterm is received`)
//   if (server) {
//     server.close()
//   }
// })
