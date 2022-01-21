import styled from 'styled-components'

interface BoardProps {
    size: number
}

export const Board = styled.div<BoardProps>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.size}, 36px);
    grid-template-rows: repeat(${(props) => props.size}, 36px);
    grid-auto-columns: 25px;
    justify-content: center;
    grid-column-gap: 4px;
    grid-row-gap: 4px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 24px;
    border: 4px solid #3d3d3d;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 10px 20px -2px rgba(0, 0, 0, 0.42);
    width: fit-content;
    background: #3d3d3d;
`

export default Board
