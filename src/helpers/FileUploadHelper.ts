/* eslint-disable @typescript-eslint/ban-ts-comment */
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import * as fs from 'fs'
import config from '../config'
import { ICloudinaryResponse, IUploadFile } from '../interface/file'

cloudinary.config({
  cloud_name: config.cloudinary.could_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const suffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + suffix + '.jpeg')
    // cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

const uploadPhoto = async (
  file: IUploadFile,
): Promise<ICloudinaryResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { folder: 'bms/user' },
      // @ts-ignore
      (error: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path)
        if (error) {
          reject(error)
        } else {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          })
        }
      },
    )
  })
}

// const deleteBlogImage = async (
//   id: string,
// ): Promise<ICloudinaryResponse | undefined> => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.destroy(
//       `MyPort/blog/${id}`,
//       (error: Error, result: ICloudinaryResponse) => {
//         if (error) {
//           reject(error)
//         } else {
//           resolve(result)
//         }
//       },
//     )
//   })
// }

export const FileUploadHelper = {
  uploadPhoto,
  // deleteBlogImage,
  upload,
}
