import express from 'express'

import upload from './uploadImage'

const router = express.Router()

router.use(upload)

export default router
