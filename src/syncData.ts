/* eslint-disable no-console */
// syncData.ts

import { PrismaClient } from '@prisma/client'
import config from './config'

export const localPrisma = new PrismaClient({
  datasources: {
    db: { url: config.db_url },
  },
})

export const remotePrisma = new PrismaClient({
  datasources: {
    db: { url: config.remote_db_url }, // Your remote MySQL URL
  },
})

// Connect to the local database and log a message on successful connection
export async function connectDatabases() {
  await localPrisma.$connect()
  await remotePrisma.$connect()
}

// Call the function to establish the connection
export async function syncInvoices() {
  try {
    await connectDatabases()
    console.log('✅ All databases connected successfully')
  } catch (err) {
    console.error('❌ Error during database connection:', err)
  }
}
