import { makeAutoObservable } from 'mobx'

import ADJACENT_CELLS from '../consts/AdjacentCells'
import Minesweeper from '../models/Minesweeper'

export enum CELL_KIND {
    EMPTY = 'empty',
    MINE = 'mine',
    HINT = 'hint',
}

class MinesweeperCell {
    kind: CELL_KIND = CELL_KIND.EMPTY
    hint: number = 0

    isRevealed = false
    isFlagged = false

    private readonly game: Minesweeper
    private readonly row: number
    private readonly col: number

    constructor(row, col, game) {
        makeAutoObservable(this)

        this.row = row
        this.col = col
        this.game = game
    }

    increaseHintValue() {
        if (this.kind !== CELL_KIND.HINT) {
            this.kind = CELL_KIND.HINT
        }

        this.hint++
    }

    reveal(withAdjacentCells = true) {
        if (this.isFlagged) {
            return
        }

        this.isRevealed = true

        if (withAdjacentCells) {
            this.uncoverEmptyAdjacentCells()
        }
    }

    flag() {
        if (this.isRevealed) {
            return
        }

        this.isFlagged = !this.isFlagged
    }

    private uncoverEmptyAdjacentCells() {
        if (this.kind !== CELL_KIND.EMPTY) {
            return
        }

        ADJACENT_CELLS.forEach(([adjacentCellCol, adjacentCellRow]) => {
            const [boardCol, boardRow] = [
                this.col + adjacentCellCol,
                this.row + adjacentCellRow,
            ]

            if (
                boardCol < 0 ||
                boardCol >= this.game.boardCols ||
                boardRow < 0 ||
                boardRow >= this.game.boardRows ||
                this.game.board[boardRow][boardCol].isRevealed ||
                this.game.board[boardRow][boardCol].isFlagged
            ) {
                return
            }

            this.game.board[boardRow][boardCol].reveal(
                this.game.board[boardRow][boardCol].kind === CELL_KIND.EMPTY
            )
        })
    }
}

export default MinesweeperCell
