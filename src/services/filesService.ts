import fs from 'fs'
import { load } from 'ts-dotenv'
const { OWNER_PATH } = load({
    OWNER_PATH: String,
})

export const checkOwner = async (owner: string): Promise<boolean> => {
    try {
        const response = await fs.promises.mkdir(`${OWNER_PATH}/${owner}`, {
            recursive: true,
        })
        if (response) {
            return false
        } else {
            return true
        }
    } catch (error: unknown) {
        console.log(error)
        throw new Error()
    }
}
