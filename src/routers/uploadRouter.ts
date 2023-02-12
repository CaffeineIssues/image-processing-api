import express from 'express'
import { Request, Response } from 'express'
import { FileImage, imageObject } from '../types/imageInterfaces'
import { checkOwner, saveFile } from '../services/filesService'
const router = express.Router()

router.post('/image', async (req: Request, res: Response) => {
    try {
        if ((req.files && req.files.length === 0) || !req.files) {
            return res.status(500).json({
                message: 'No file uploaded',
            })
        }
        const { owner }: FileImage = req.body
        const image: imageObject[] = req.files as imageObject[]
        const ownerExists = await checkOwner(owner).then(
            async (exists: boolean) => {
                if (!exists) {
                    const saved = await saveFile(owner, image[0])

                    if (!saved) {
                        return res.status(210).json({
                            message: {
                                folder: 'Owner already existed no need to create it',
                                file: 'file already existed no need to resave it',
                            },
                        })
                    }
                    return res.status(200).json({
                        message: {
                            folder: 'Owner already existed no need to create it',
                            file: 'File saved',
                        },
                    })
                }
                const saved = await saveFile(owner, image[0])
                if (!saved) {
                    return res.status(210).json({
                        message: {
                            folder: `a folder was created for owner ${owner}`,
                            file: 'file already existed no need to save',
                        },
                    })
                }
                return res.status(200).json({
                    message: {
                        folder: `a folder was created for owner ${owner}`,
                        file: 'File saved',
                    },
                })
            }
        )
    } catch (error: unknown) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal Server Error',
        })
    }
})

export default router
