/* eslint-disable no-unused-vars */
import { errorLogger, logger } from './utilities/logger'
import { bootStrap } from './utilities/bootStrap'
import { Server } from 'http'
let server: Server

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

bootStrap()

process.on('SIGTERM', () => {
  logger.info(`Sigterm is received`)
  if (server) {
    server.close()
  }
})
