import express from 'express'
import { Request, Response } from 'express'
import { FileImage } from '../types/imageInterfaces'
import { checkOwner } from '../services/filesService'
const router = express.Router()

router.post('/image', async (req: Request, res: Response) => {
    try {
        const { owner }: FileImage = req.body
        const ownerExists = await checkOwner(owner).then((exists: boolean) => {
            if (exists) {
                res.status(200).json({ message: 'Owner already exists no folder created' })
            }else{
                res.status(200).json({ message: 'Owner didnt exist, folder created' })
            }
        })
    } catch (error: unknown) {
        console.log(error)
    }
})

export default router
