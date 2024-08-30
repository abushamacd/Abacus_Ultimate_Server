/* eslint-disable no-console */
import config from '../config'
import app from '../app'
import { errorLogger, logger } from './logger'
import { Server } from 'http'
import prisma from './prisma'
let server: Server

export async function bootStrap() {
  try {
    await prisma.$connect()
    logger.info(`==== ✌️  DB Connection is succesfully ====`)
    server = app.listen(config.port, () => {
      logger.info(
        config.env === 'development'
          ? `==== ✌️  Your server is running on http://localhost:${config.port} ====`
          : `Test on deployed live server`,
      )
    })
  } catch (error) {
    errorLogger.error(`==== 🤞  Database Connection Error ====`, error)
    process.exit(1)
  }

  process.on('unhandledRejection', error => {
    console.log(error)
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
