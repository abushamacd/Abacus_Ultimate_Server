export type IUploadFile = {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

export type ICloudinaryResponse = {
  public_id: string
  secure_url: string
}
