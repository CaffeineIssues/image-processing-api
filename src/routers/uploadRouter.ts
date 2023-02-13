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
        const extension = image[0].mimetype.split('/')[1]
        const imageFolder = image[0].originalname.split('.' + extension)[0]
        await checkOwner(owner).then(async (exists: boolean) => {
            if (!exists) {
                const saved = await saveFile(
                    owner,
                    image[0],
                    extension,
                    imageFolder
                )

                if (!saved) {
                    return res.status(210).json({
                        message: {
                            folder: 'Owner already existed no need to create it',
                            file: 'file already existed no need to resave it',
                            url: `http://localhost:3000/owners/${owner}/${imageFolder}/original.${extension}`,
                        },
                    })
                }
                return res.status(200).json({
                    message: {
                        folder: 'Owner already existed no need to create it',
                        file: 'File saved',
                        url: `http://localhost:3000/owners/${owner}/${imageFolder}/original.${extension}`,
                    },
                })
            }
            const saved = await saveFile(
                owner,
                image[0],
                extension,
                imageFolder
            )
            if (!saved) {
                return res.status(210).json({
                    message: {
                        folder: `a folder was created for owner ${owner}`,
                        file: 'file already existed no need to save',
                        url: `http://localhost:3000/owners/${owner}/${imageFolder}/original.${extension}`,
                    },
                })
            }
            return res.status(200).json({
                message: {
                    folder: `a folder was created for owner ${owner}`,
                    file: 'File saved',
                    url: `http://localhost:3000/owners/${owner}/${imageFolder}/original.${extension}`,
                },
            })
        })
    } catch (error: unknown) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal Server Error',
        })
    }
})

export default router
