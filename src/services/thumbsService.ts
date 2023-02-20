import sharp from 'sharp'
import { load } from 'ts-dotenv'

const { OWNER_PATH } = load({
    OWNER_PATH: String,
})

export const generateThumbs = async (
    owner: string,
    imageFolder: string,
    imageName: string,
    extension: string
): Promise<boolean> => {
    try {
        console.log(extension)
        return sharp(
            `${OWNER_PATH}/${owner}/${imageFolder}/original${extension}`
        )
            .resize(200, 200)
            .toFile(`${OWNER_PATH}/${owner}/${imageFolder}/thumb${extension}`)
            .then((result) => {
                console.log(result)
                return true
            })
            .catch((error) => {
                console.log(error)
                return false
            })
    } catch (error: unknown) {
        throw new Error(
            error instanceof Error
                ? `${(error as Error).message}`
                : `An unknown error occurred`
        )
    }
}
