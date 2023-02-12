import { checkOwner } from '../../services/filesService'

describe('checkOwner', function () {
    it('this function should return true if a folder was created and false if it already exists', async function () {
        const owner = Math.random().toString(36).substring(7)
        expect(await checkOwner(owner)).toBe(true)
        expect(await checkOwner(owner)).toBe(false)
    })
})
