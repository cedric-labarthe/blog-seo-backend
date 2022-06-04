import express, { Request, Response } from 'express'
import multer, { FileFilterCallback } from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
  destination(_, __, callback) {
    callback(null, '/uploads/images') // TODO add error handler
  },
  filename(_, file, callback) {
    callback(null, file.originalname) // TODO add error handler AND see for unique name/upload
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

  res.send('ok boy')
}

router.post('/upload-image', upload.single, uploadImage)

export default router
