import express from 'express'
import { Request, Response } from 'express'
import { load } from 'ts-dotenv'
import { generateThumbs } from '../services/thumbsService'
import fs from 'fs'
import path from 'path'
const { OWNER_PATH } = load({
    OWNER_PATH: String,
})
const router = express.Router()

router.get(
    '/:owner/:imageFolder/:imageName',
    async (req: Request, res: Response) => {
        try {
            const { owner, imageFolder, imageName } = req.params
            const extension = path.extname(
                `${OWNER_PATH}/${owner}/${imageFolder}/${imageName}`
            )
            const fileExists = fs.existsSync(
                `${OWNER_PATH}/${owner}/${imageFolder}/${imageName}`
            )
            if (!fileExists) {
                await generateThumbs(
                    owner,
                    imageFolder,
                    imageName,
                    extension
                ).then((result: boolean) => {
                    if (
                        result === false ||
                        result === undefined ||
                        result === null
                    ) {
                        return res.status(500).json({
                            message: {
                                message: 'failed to generate Thumb',
                            },
                        })
                    }
                    return res.status(200).json({
                        message: {
                            file: 'thumb generated',
                            url: `http://localhost:3000/owners/${owner}/${imageFolder}/thumb${extension}`,
                        },
                    })
                })
            }
            return res.status(200).json({
                message: {
                    file: 'thumb already existed for this image',
                    url: `http://localhost:3000/owners/${owner}/${imageFolder}/thumb${extension}`,
                },
            })
        } catch (error: unknown) {
            throw new Error(
                error instanceof Error
                    ? `${(error as Error).message}`
                    : `An unknown error occurred`
            )
        }
    }
)

export default router
