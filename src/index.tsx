import ReactDOM from 'react-dom'
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

import Board from './components/Board'
import Square from './components/Square'
import Title from './components/Title'
import SubTitle from './components/SubTitle'
import Minesweeper, { GAME_STATUS } from './models/Minesweeper'

const App = observer(() => {
    const { width, height } = useWindowSize()

    const [boardSize, setBoardSize] = useState(20)

    const [game] = useState<Minesweeper>(
        () => new Minesweeper(boardSize, boardSize, boardSize)
    )

    useEffect(() => {
        if (game.status === GAME_STATUS.PLAYING) {
            return
        }

        game.revealAll()
    })

    return (
        <>
            {game.status === GAME_STATUS.WON && (
                <Confetti width={width} height={height} recycle={false} />
            )}
            <div style={{ marginTop: '62px', textAlign: 'center' }}>
                <Title>Minesweeper</Title>
                {game.status === GAME_STATUS.WON ? (
                    <SubTitle>You Won!</SubTitle>
                ) : game.status === GAME_STATUS.LOST ? (
                    <SubTitle>Ouch!</SubTitle>
                ) : null}
                <Board size={boardSize}>
                    {game.board.flat().map((cell, idx) => (
                        <Square key={`cell-${idx}`} cell={cell} game={game} />
                    ))}
                </Board>
                {game.status !== GAME_STATUS.PLAYING && (
                    <button onClick={() => window.location.reload()}>
                        Restart Game
                    </button>
                )}
            </div>
        </>
    )
})

ReactDOM.render(<App />, document.getElementById('root'))
