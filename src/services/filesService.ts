import fs from 'fs'

export const checkOwner = async (owner: string): Promise<boolean> => {
    try {
        await fs.promises.mkdir(owner, { recursive: true })
        return true
    } catch (error: unknown) {
        console.log(error)
        return false
    }
}
