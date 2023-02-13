import { checkOwner } from '../../services/filesService'

describe('checkOwner', function () {
    it('throws an error if owner is empty', async function () {
        try {
            await checkOwner('')
        } catch (error) {
            expect((error as Error).message.toLowerCase()).toEqual(
                'owner is empty'
            )
        }
    })
    it('this function should return true if a folder was created and false if it already exists', async function () {
        const owner = Math.random().toString(36).substring(7)
        expect(await checkOwner(owner)).toBe(true)
        expect(await checkOwner(owner)).toBe(false)
    })
})
