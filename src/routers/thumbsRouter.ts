import express from 'express'
import { Request, Response } from 'express'
import { FileImage } from '../utils/imageInterfaces'
const router = express.Router()

router.post('/generate-thumb', async (req: Request, res: Response) => {
    try {
        const { owner, image, width, height }: FileImage = req.body
    } catch (error: unknown) {
        console.log(error)
    }
})

export default router
