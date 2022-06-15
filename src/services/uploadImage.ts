import express, { Request, Response } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { Media } from '../entities'

const router = express.Router()

const storage = multer.diskStorage({
  destination(_, __, callback) {
    callback(null, 'public/images') // TODO add error handler
  },
  filename(_, file, callback) {
    const sanitizedFileName = file.originalname.replace(/\s/g, '_') // TODO Add special characters
    callback(null, sanitizedFileName) // TODO add error handler AND see for unique media name/upload
  },
})

const fileFilter = (
  _: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true)
  } else {
    cb(new Error('Image uploaded is not of type jpg/jpeg or png'))
  }
}

const upload = multer({ storage, fileFilter })

const uploadImage = async (req: Request, res: Response) => {
  const image = req.file

  console.info(image)

  //   {
  //   fieldname: 'file',
  //   originalname: 'Image (119).jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: 'public/images',
  //   filename: 'Image (119).jpg',
  //   path: 'public/images/Image (119).jpg',
  //   size: 528164
  // }

  const path = `${process.env.URL || 'http://localhost:8000/images/'}${
    image?.filename
  }`

  console.info(path)

  const newMedia = Media.create({ path, articleId: 1 })
  await newMedia.save()

  // TODO save path in db

  res.send('Success and path')
}

router.post('/upload-image', upload.single('file'), uploadImage)

export default router
