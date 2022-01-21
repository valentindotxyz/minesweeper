import { makeAutoObservable } from 'mobx'

import getRandomInt from '../utils/getRandomInt'
import ADJACENT_CELLS from '../consts/AdjacentCells'
import MinesweeperCell, { CELL_KIND } from './MinesweeperCell'

export enum GAME_STATUS {
    PLAYING = 'playing',
    WON = 'won',
    LOST = 'lost',
}

class Minesweeper {
    public board: MinesweeperCell[][]

    public readonly boardRows: number
    public readonly boardCols: number

    public readonly mines: number
    private readonly minesPositions: Array<[number, number]>

    constructor(boardRows, boardCols, mines) {
        makeAutoObservable(this)

        this.board = []

        this.boardRows = boardRows
        this.boardCols = boardCols

        this.mines = mines
        this.minesPositions = []

        this.initGame()
    }

    get usedFlags() {
        return this.board.flat().filter((cell) => cell.isFlagged).length
    }

    get remainingFlags() {
        return this.mines - this.usedFlags
    }

    get status(): GAME_STATUS {
        const flattenBoard = this.board.flat()

        return flattenBoard.some(
            (cell) => cell.isRevealed && cell.kind === CELL_KIND.MINE
        )
            ? GAME_STATUS.LOST
            : flattenBoard
                  .filter((cell) => cell.kind === CELL_KIND.MINE)
                  .every((cell) => cell.isFlagged)
            ? GAME_STATUS.WON
            : GAME_STATUS.PLAYING
    }

    initGame() {
        // First, we create an empty board, based on the size specified originally…
        this.createBoard()

        // Then we place mines…
        this.placeMines()

        // Finally, we place hints around mines.
        this.placeHints()
    }

    createBoard() {
        for (let row = 0; row < this.boardRows; row++) {
            this.board.push([])

            for (let col = 0; col < this.boardCols; col++) {
                this.board[row][col] = new MinesweeperCell(row, col, this)
            }
        }
    }

    placeMines() {
        // Generate unique random mine positions until we have enough mines.
        while (this.minesPositions.length < this.mines) {
            const mineCell = [
                getRandomInt(0, this.boardCols),
                getRandomInt(0, this.boardRows),
            ] as [number, number]

            if (!this.minesPositions.join().includes(mineCell.toString())) {
                this.minesPositions.push(mineCell)
            }
        }

        // Place mines on the board.
        this.minesPositions.forEach(
            ([col, row]) => (this.board[row][col].kind = CELL_KIND.MINE)
        )
    }

    placeHints() {
        // Iterate through all mines and compute hints based for adjacent cells.

        // Result position is adding the mine one with the current adjacent cell.
        this.minesPositions.forEach(([mineCol, mineRow]) => {
            ADJACENT_CELLS.forEach(([adjacentCellCol, adjacentCellRow]) => {
                const [boardCol, boardRow] = [
                    mineCol + adjacentCellCol,
                    mineRow + adjacentCellRow,
                ]

                // If the result position ends up beyond the board OR the result position in another mine, skip it.
                if (
                    boardCol < 0 ||
                    boardCol >= this.boardCols ||
                    boardRow < 0 ||
                    boardRow >= this.boardRows ||
                    this.board[boardRow][boardCol].kind === CELL_KIND.MINE
                ) {
                    return
                }

                this.board[boardRow][boardCol].increaseHintValue()
            })
        })
    }

    revealAll() {
        this.board.flat().forEach((cell) => cell.reveal())
    }

    debug() {
        console.table(
            this.board.map((_, row) =>
                this.board[row].map((_, col) => {
                    const cell = this.board[row][col]

                    if (cell.kind === CELL_KIND.MINE) {
                        return '💣'
                    }

                    return cell.hint !== 0 ? cell.hint : ''
                })
            )
        )
    }
}

export default Minesweeper
