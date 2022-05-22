import React, { FC, useState } from 'react';
import { useActoins } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/usedTypeSelector';
import { cell } from '../types/board';
import Cell from './Cell';

const Board:FC = () => {
  const board = useTypedSelector<cell[]>(store => store.board.board)
  const turn = useTypedSelector<string>(store => store.board.turn)
  const {clickOnFigure, movePiece} = useActoins()
  const [active, setActive] = useState<cell | null>(null)
  const [formerCell, setFormerCell] = useState<cell | null>(null)
  const arr = ["a", "c", "e", "g"]
  function handleClick(cell:cell){
    setActive(cell)
    if(cell.available === true)
      movePiece(cell, board, formerCell!)
    else
      clickOnFigure(cell, board, turn)
    setFormerCell(cell)
  }
  return (
    <div className="flex board">
      {board.map((cell:cell)=>
          <Cell
            key={cell.cell}
            cell={cell}
            active = {active}
            onClick={handleClick}
            color={
              (arr.indexOf(cell.cell[0]) === -1 &&  (+cell.cell[1] % 2 === 0))
              || (arr.indexOf(cell.cell[0]) !== -1 &&  (+cell.cell[1] % 2 !== 0))
              ? "black" : "white"}/>
      )}
    </div>
  );
};

export default Board;
