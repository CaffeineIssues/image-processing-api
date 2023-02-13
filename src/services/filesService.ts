import fs from 'fs'
import { load } from 'ts-dotenv'
import { imageObject } from '../types/imageInterfaces'

const { OWNER_PATH } = load({
    OWNER_PATH: String,
})

export const checkOwner = async (owner: string): Promise<boolean> => {
    try {
        if (owner === '') {
            throw new Error('Owner is empty')
        }
        const response = await fs.promises.mkdir(`${OWNER_PATH}/${owner}`, {
            recursive: true,
        })
        if (!response) {
            return false
        }
        return true
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? `${(error as Error).message}`
                : `An unknown error occurred`
        )
    }
}

export const saveFile = async (
    owner: string,
    file: imageObject,
    extension: string,
    imageFolder: string
): Promise<boolean> => {
    try {
        const response = await fs.promises
            .mkdir(`${OWNER_PATH}/${owner}/${imageFolder}`, {
                recursive: true,
            })
            .then(async () => {
                const fileExists = fs.existsSync(
                    `${OWNER_PATH}/${owner}/${imageFolder}/${file.originalname}`
                )
                if (!fileExists) {
                    fs.writeFileSync(
                        `${OWNER_PATH}/${owner}/${imageFolder}/original.${extension}`,
                        file.buffer as Buffer
                    )
                    return true
                }
                return false
            })
        return response
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? `${(error as Error).message}`
                : `An unknown error occurred`
        )
    }
}
