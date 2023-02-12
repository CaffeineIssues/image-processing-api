import fs from 'fs'
import { load } from 'ts-dotenv'
import { FileImage, imageObject } from '../types/imageInterfaces'

const { OWNER_PATH } = load({
    OWNER_PATH: String,
})

export const checkOwner = async (owner: string): Promise<boolean> => {
    try {
        const response = await fs.promises.mkdir(`${OWNER_PATH}/${owner}`, {
            recursive: true,
        })
        if (!response) {
            return false
        }
        return true
    } catch (error: unknown) {
        console.log(error)
        throw new Error()
    }
}

export const saveFile = async (
    owner: string,
    file: imageObject
): Promise<boolean> => {
    const { fieldname, originalname, encoding, mimetype, buffer, size } = file

    try {
        const extension = mimetype.split('/')[1]
        const imageFolder = originalname.split(`.${extension}`)[0]
        const response = await fs.promises
            .mkdir(`${OWNER_PATH}/${owner}/${imageFolder}`, {
                recursive: true,
            })
            .then(async (result) => {
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
        console.log(error)
        throw new Error()
    }
}
