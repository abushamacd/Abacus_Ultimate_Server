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
import { create${capitalizeLetter(name)}, get${capitalizeLetter(name)}, get${capitalizeLetter(name)}s } from './${name}.controllers'

const router = express.Router()

// example ${name} route
router
  .route('/')
  .post(
    auth(ENUM_USER_ROLE.OWNER,),
    reqValidate(create${capitalizeLetter(name)}Zod),
    create${capitalizeLetter(name)}
  )
  .get(auth(ENUM_USER_ROLE.OWNER), get${capitalizeLetter(name)}s)

router
  .route('/:id')
  .get(auth(ENUM_USER_ROLE.OWNER, ENUM_USER_ROLE.MANAGER), get${capitalizeLetter(name)})

export default router
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.routes.ts`),
  routesTemplate,
)

const validationTemplate = `
import { z } from 'zod'

// Create ${name} zod validation schema
export const create${capitalizeLetter(name)}Zod = z.object({
  body: z.object({
    key: z.string({
      required_error: 'Key name is required',
    }),
  }),
})
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.validations.ts`),
  validationTemplate,
)

const controllerTemplate = `
import { Request, Response } from 'express'
import { tryCatch } from '../../../utilities/tryCatch'
import { sendRes } from '../../../utilities/sendRes'
import httpStatus from 'http-status'
import { ${capitalizeLetter(name)} } from '@prisma/client'
import {create${capitalizeLetter(name)}Service, get${capitalizeLetter(name)}, get${capitalizeLetter(name)}sService} from './${name}.services'
import { ${name}FilterableFields } from './${name}.constants'
import { paginationFields } from '../../../constants/pagination'
import { pick } from '../../../utilities/pick'

// create ${name} controller
export const create${capitalizeLetter(
  name,
)} = tryCatch(async (req: Request, res: Response) => {
  const result = await create${capitalizeLetter(name)}Service(req.body)
  sendRes<${capitalizeLetter(name)}>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create ${name} successfully',
    data: result,
  })
})



// get ${name}s controller
export const get${capitalizeLetter(name)}s = tryCatch(async (req, res) => {
  const filters = pick(req.query, ${name}FilterableFields)
  const options = pick(req.query, paginationFields)
  const result = await get${capitalizeLetter(name)}sService(filters, options)
  sendRes<${capitalizeLetter(name)}[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '${capitalizeLetter(name)}s retrived successfully',
    meta: result.meta,
    data: result.data,
  })
})

// get ${name}s controller
export const get${capitalizeLetter(name)} = tryCatch(async (req, res) => {
  const result = await get${capitalizeLetter(name)}Service(req?.params?.id)
  sendRes<${capitalizeLetter(name)}>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '${capitalizeLetter(name)} retrived successfully',
    data: result,
  })
})

`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.controllers.ts`),
  controllerTemplate,
)

const serviceTemplate = `
import { Prisma, ${capitalizeLetter(name)} } from '@prisma/client'
import prisma from '../../../utilities/prisma'
import httpStatus from 'http-status'
import { ApiError } from './../../../errorFormating/apiError'
import { I${capitalizeLetter(name)}FilterRequest } from './${name}.interfaces'
import { IPaginationOptions } from '../../../interface/pagination'
import { IGenericResponse } from '../../../interface/common'
import { calculatePagination } from '../../../helpers/paginationHelper'
import { ${name}SearchableFields } from './${name}.constants'

// create ${name} service
export const create${capitalizeLetter(name)}Service = async (
  data: ${capitalizeLetter(name)},
): Promise<${capitalizeLetter(name)} | null> => {
  const ${name} = await prisma.${name}.findFirst({
    where: {
      filed_name: data?.filed_name,
    },
  })

  if (${name}) {
    throw new ApiError(httpStatus.NOT_FOUND, "${capitalizeLetter(name)} is already exist")
  }

  const result = await prisma.${name}.create({
    data,
  })

  if (!result) {
    throw new Error("${capitalizeLetter(name)} create failed")
  }

  return result
}

// get ${name}s service
export const get${capitalizeLetter(name)}sService = async (
  filters: I${capitalizeLetter(name)}FilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<${capitalizeLetter(name)}[]>> => {
  const { limit, page, skip } = calculatePagination(options)
  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      OR: ${name}SearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          // mode: 'insensitive',
        },
      })),
    })
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    })
  }

  const whereConditions: Prisma.${capitalizeLetter(name)}WhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {}

  const result = await prisma.${name}.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'asc',
          },
    include: {
      driver: true,
      supervisor: true,
    },
  })

  if (!result) {
    throw new Error('${capitalizeLetter(name)} retrived failed')
  }

  const total = await prisma.${name}.count({
    where: whereConditions,
  })

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  }
}


// get ${name} service
export const get${capitalizeLetter(name)}Service = async (id: string) => {
  const result = await prisma.${name}.findUnique({
    where: {
      id,
    },
    include: {
      driver: true,
      supervisor: true,
    },
  })

  if (!result) {
    throw new Error('${capitalizeLetter(name)} retrived failed')
  }

  return result
}

  
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.services.ts`),
  serviceTemplate,
)

const interfacesTemplate = `
// ${name} interfaces
export type I${capitalizeLetter(name)} = {
  field_name: string
}

export type I${capitalizeLetter(name)}FilterRequest = {
  searchTerm?: string | undefined
}
`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.interfaces.ts`),
  interfacesTemplate,
)

const constantsTemplate = `
export const ${name}FilterableFields: string[] = ['searchTerm', 'role']
export const ${name}SearchableFields: string[] = ['name', 'phone']

`
fs.writeFileSync(
  path.join(targetDirectory, `${name}.constants.ts`),
  constantsTemplate,
)

console.log(
  `Folder '${name}' and files created successfully in 'src/app/modules'.`,
)
