import express from 'express'
import { Request, Response } from 'express'

const router = express.Router()

router.get(
    '/:owner/:imageFolder/:imageName',
    async (req: Request, res: Response) => {
        return true
    }
)

export default router
