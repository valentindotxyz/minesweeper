import React, { FC } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import Minesweeper from '../models/Minesweeper'
import MinesweeperCell, { CELL_KIND } from '../models/MinesweeperCell'

interface SquareProps {
    cell: MinesweeperCell
    game: Minesweeper
}

const StyledSquare = styled.button<SquareProps>`
    margin: 0;
    border: 1px solid #e3e3e3;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ cell }) =>
        cell.isRevealed
            ? cell.kind === CELL_KIND.MINE
                ? 'red'
                : 'white'
            : cell.isFlagged
            ? '#b4ff99'
            : '#7a7a7a'};
    cursor: ${({ cell }) => (cell.isRevealed ? 'default' : 'pointer')};
    font-family: 'Press Start 2P', serif;
    font-size: 1rem;
    color: ${({ cell }) =>
        cell.hint === 1
            ? 'blue'
            : cell.hint === 2
            ? 'green'
            : cell.hint === 3
            ? 'orange'
            : cell.hint === 4
            ? 'purple'
            : cell.hint === 5
            ? 'red'
            : 'black'};
`

export const Square: FC<SquareProps> = observer(({ cell, game }) => (
    <StyledSquare
        game={game}
        cell={cell}
        onClick={() => cell.reveal()}
        onContextMenu={(evt) => {
            evt.preventDefault()

            if (game.remainingFlags > 0 || cell.isFlagged) {
                cell.flag()
            }
        }}
    >
        {cell.isRevealed ? (
            <>
                {cell.kind === CELL_KIND.MINE
                    ? '💣'
                    : cell.kind === CELL_KIND.HINT
                    ? cell.hint
                    : null}
            </>
        ) : cell.isFlagged ? (
            '⛳️'
        ) : null}
    </StyledSquare>
))

export default Square
