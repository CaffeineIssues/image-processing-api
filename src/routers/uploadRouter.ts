import express from 'express'
import { Request, Response } from 'express'
import { FileImage, imageObject } from '../types/imageInterfaces'
import { checkOwner, saveFile } from '../services/filesService'
const router = express.Router()

router.post('/image', async (req: Request, res: Response) => {
    try {
        if (req.files) {
            const { owner }: FileImage = req.body
            const image: imageObject[] = req.files as imageObject[]
            const ownerExists = await checkOwner(owner).then(
                (exists: boolean) => {
                    if (!exists) {
                        return saveFile(owner, image[0]).then(
                            (saved: boolean) => {
                                if (!saved) {
                                    return res.status(200).json({
                                        message: {
                                            folder: 'Folder already existed for this owner no need to create it',
                                            file: 'File saved',
                                        },
                                    })
                                } else {
                                    return res.status(500).json({
                                        message: {
                                            folder: 'Folder already existed for this owner no need to create it',
                                            file: 'file already existed no need to resave it',
                                        },
                                    })
                                }
                            }
                        )
                    }
                    return saveFile(owner, image[0]).then((saved: boolean) => {
                        if (!saved) {
                            return res.status(500).json({
                                message: {
                                    folder: 'Folder created',
                                    file: 'file already existed no need to resave it',
                                },
                            })
                        }
                        return res.status(200).json({
                            message: {
                                folder: 'Folder created',
                                file: 'File saved',
                            },
                        })
                    })
                }
            )
        } else {
            return res.status(500).json({
                message: 'No file uploaded',
            })
        }
    } catch (error: unknown) {
        console.log(error)
    }
})

export default router
