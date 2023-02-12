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
        if (response) {
            return true
        } else {
            return false
        }
    } catch (error: unknown) {
        console.log(error)
        throw new Error()
    }
}

export const saveFile = async (
    owner: string,
    file: imageObject
): Promise<boolean> => {
    try {
        console.log(file)
        const response = await fs.promises
            .writeFile(
                `${OWNER_PATH}/${owner}/${file.originalname}`,
                file.buffer as Buffer
            )
            .then(() => {
                const result = fs.readFileSync(
                    `${OWNER_PATH}/${owner}/${file.originalname}`
                )
                if (result) {
                    return true
                } else {
                    return false
                }
            })

        return response
    } catch (error: unknown) {
        console.log(error)
        throw new Error()
    }
}
