import express from 'express'
import { Request, Response } from 'express'

import { generateThumbs } from '../services/thumbsService'

const router = express.Router()

router.get(
    '/:owner/:imageFolder/:imageName',
    async (req: Request, res: Response) => {
        try {
            const { owner, imageFolder, imageName } = req.params
            await generateThumbs(owner, imageFolder, imageName).then(
                (result) => {
                    if (
                        result === false ||
                        result === undefined ||
                        result === null
                    ) {
                        return res.status(500).json({
                            message: 'failed to generate thumbs',
                        })
                    }
                    return res.status(200).json({
                        message: 'thumbs generated',
                    })
                }
            )
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
