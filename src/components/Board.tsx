import React, { FC, useState } from "react";
import { useActoins } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/usedTypeSelector";
import { cell, GameStatus } from "../types/board";
import Cell from "./Cell";

const Board: FC = () => {
  const { board, end, isKingAttacked } = useTypedSelector(
    (store) => store.board
  );
  const turn = useTypedSelector<"white" | "dark">((store) => store.board.turn);
  const { clickOnFigure, movePiece, restart } = useActoins();
  const [active, setActive] = useState<cell | null>(null);
  const [formerCell, setFormerCell] = useState<cell | null>(null);
  const arr = ["a", "c", "e", "g"];
  function handleClick(cell: cell) {
    setActive(cell);
    if (cell.available === true) movePiece(cell, board, formerCell!);
    else clickOnFigure(cell, board, turn);
    setFormerCell(cell);
  }
  return (
    <div className="flex board">
      {board.map((cell: cell) => (
        <Cell
          key={cell.cell}
          cell={cell}
          active={active}
          onClick={handleClick}
          color={
            (arr.indexOf(cell.cell[0]) === -1 && +cell.cell[1] % 2 === 0) ||
            (arr.indexOf(cell.cell[0]) !== -1 && +cell.cell[1] % 2 !== 0)
              ? "black"
              : "white"
          }
          isKingAttacked={isKingAttacked}
        />
      ))}
      {end !== GameStatus.PLAYING ? (
        <div>
          <div className="board__modal modal">
            {end}
            <br />
            <button className="btn" onClick={restart}>
              Начать снова
            </button>
          </div>
          <div className="modal-back" />
        </div>
      ) : null}
    </div>
  );
};

export default Board;
