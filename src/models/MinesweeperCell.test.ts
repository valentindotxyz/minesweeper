import Minesweeper from './Minesweeper'
import MinesweeperCell, { CELL_KIND } from './MinesweeperCell'

const setupModel = () => {
    const game = new Minesweeper(10, 10, 0)
    const cell = new MinesweeperCell(1, 1, game)

    return { game, cell }
}

describe('MinesweeperCell', () => {
    it('inits a cell', () => {
        const { cell } = setupModel()

        expect(cell.kind).toBe(CELL_KIND.EMPTY)
        expect(cell.hint).toBe(0)
        expect(cell.isRevealed).toBeFalsy()
        expect(cell.isFlagged).toBeFalsy()
    })

    it('reveals a cell', () => {
        const { cell } = setupModel()

        cell.reveal()

        expect(cell.isRevealed).toBeTruthy()
    })

    it('reveals empty adjacent cells', () => {
        const { cell, game } = setupModel()

        cell.reveal()

        expect(game.board.flat().every((cell) => cell.isRevealed)).toBeTruthy()
    })

    it('flags an unrevealed cell', () => {
        const { cell } = setupModel()

        cell.flag()
        expect(cell.isFlagged).toBeTruthy()

        cell.flag()
        expect(cell.isFlagged).toBeFalsy()
    })

    it('does not flag an revealed cell', () => {
        const { cell } = setupModel()

        cell.reveal()
        cell.flag()

        expect(cell.isFlagged).toBeFalsy()
    })

    it('sets hint to a cell', () => {
        const { cell } = setupModel()

        expect(cell.kind).toBe(CELL_KIND.EMPTY)

        cell.increaseHintValue()

        expect(cell.kind).toBe(CELL_KIND.HINT)
        expect(cell.hint).toBe(1)
    })
})
