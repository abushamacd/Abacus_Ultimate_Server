/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs')
const path = require('path')

if (process.argv.length < 2) {
  console.error('Command will be: node modulesGenerator.js your_folder_name')
  process.exit(1)
}

// Get folder and file names from command-line arguments
const name = process.argv[2]

const capitalizeLetter = name => {
  let string = name
  return string[0].toUpperCase() + string.slice(1)
}

// Define the target directory
const targetDirectory = path.join(__dirname, 'src', 'app', 'modules', name)

// Create the target directory
fs.mkdirSync(targetDirectory, { recursive: true })

// Create and write the files in the target directory
const routesTemplate = `
import express from 'express'
import reqValidate from '../../../middleware/reqValidate'
import { auth } from '../../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { create${capitalizeLetter(name)}Zod } from './${name}.validations'
import { create${capitalizeLetter(name)} } from './${name}.controllers'

const router = express.Router()

// example route
router
  .route('/create')
  .post(
    auth(ENUM_USER_ROLE.USER),
    reqValidate(create${capitalizeLetter(name)}Zod),
    create${capitalizeLetter(name)}
  )

export default router
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.routes.ts`),
  routesTemplate
)

const validationTemplate = `
import { z } from 'zod'

// Create ${name} zod validation schema
export const create${capitalizeLetter(name)}Zod = z.object({
  body: z.object({
    key: z.string({
      required_error: 'Z: Key name is required',
    }),
  }),
})
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.validations.ts`),
  validationTemplate
)

const controllerTemplate = `
import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { User } from '@prisma/client'
import {create${capitalizeLetter(name)}Service} from './${name}.services'

// create ${name} controller
export const create${capitalizeLetter(
  name
)} = tryCatch(async (req: Request, res: Response) => {
  const result = await create${capitalizeLetter(name)}Service(req.body)
  sendRes<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create ${name} successfully',
    data: result,
  })
})

`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.controllers.ts`),
  controllerTemplate
)

const serviceTemplate = `
import { User } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import bcrypt from 'bcrypt'
import config from '../../../config'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'

// create ${name} service
export const create${capitalizeLetter(
  name
)}Service = async (data: User): Promise<User | null> => {
  return result
}
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.services.ts`),
  serviceTemplate
)

const interfacesTemplate = `
// Example interfaces
export type I${capitalizeLetter(name)} = {
  oldPassword: string
  newPassword: string
}
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.interfaces.ts`),
  interfacesTemplate
)

const constantsTemplate = `
export const ${name} = ['']
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.constants.ts`),
  constantsTemplate
)

console.log(
  `Folder '${name}' and files created successfully in 'src/app/modules'.`
)
