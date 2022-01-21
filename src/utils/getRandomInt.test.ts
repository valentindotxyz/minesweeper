import getRandomInt from './getRandomInt'

describe('getRandomInt', () => {
    it('get random int between two values', () => {
        const random = getRandomInt(0, 100)
        expect(random).toBeGreaterThanOrEqual(0)
        expect(random).toBeLessThanOrEqual(100)
    })

    it('get random int between two same values', () => {
        const random = getRandomInt(42, 42)
        expect(random).toBe(42)
    })
})
