import React, { FC, useState, useEffect, DragEvent } from "react";
import { useActoins } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/usedTypeSelector";
import { cell, GameStatus } from "../types/board";
import Modal from "./Modal";
import Cell from "./Cell";
import { pieces } from "../types/pieces";

const Board: FC = () => {
  const {
    board,
    end,
    isKingAttacked,
    darkCastleLong,
    darkCastleShort,
    whiteCastleLong,
    whiteCastleShort,
    turn,
    choosePiece,
  } = useTypedSelector((store) => store.board);
  const { clickOnFigure, movePiece, restart, dispatchPieceisSelected, game } =
    useActoins();
  const [active, setActive] = useState<cell | null>(null);
  const [formerCell, setFormerCell] = useState<cell | null>(null);
  const arr = ["a", "c", "e", "g"];
  function pieceIsSelected(piece: pieces) {
    dispatchPieceisSelected(board, piece);
  }
  useEffect(() => {
    game(board, turn);
  }, [board]);
  function handleClick(cell: cell) {
    setActive(cell);
    if (cell.available === true) movePiece(cell, board, formerCell!);
    else
      clickOnFigure(
        cell,
        board,
        turn,
        darkCastleLong,
        darkCastleShort,
        whiteCastleLong,
        whiteCastleShort
      );
    setFormerCell(cell);
  }
  function DragStartHandler(e: DragEvent<HTMLImageElement>, cell: cell) {
    setFormerCell(cell);
    clickOnFigure(
      cell,
      board,
      turn,
      darkCastleLong,
      darkCastleShort,
      whiteCastleLong,
      whiteCastleShort
    );
  }
  function DragOverHandler(e: DragEvent<HTMLDivElement>, cell: cell) {
    e.preventDefault();
    if (cell.available === true && (e.target as Element).tagName === "DIV")
      (e.target as Element).classList.add("pieceHover");
  }
  function DropHandler(e: DragEvent<HTMLImageElement>, cell: cell) {
    e.preventDefault();
    if (cell.available === true) movePiece(cell, board, formerCell!);
    (e.target as Element).classList.remove("pieceHover");
  }
  function onDragLeaveHandler(e: DragEvent<HTMLImageElement>) {
    (e.target as Element).classList.remove("pieceHover");
  }
  return (
    <div className="flex board">
      {choosePiece ? (
        <Modal
          color={turn === "white" ? "dark" : "white"}
          onClick={pieceIsSelected}
        />
      ) : (
        <></>
      )}
      {board
        .map((cell: cell) => (
          <Cell
            key={cell.cell}
            cell={cell}
            active={active}
            onClick={handleClick}
            onDragStart={DragStartHandler}
            onDragLeave={onDragLeaveHandler}
            onDragOver={(e: DragEvent<HTMLDivElement>) =>
              DragOverHandler(e, cell)
            }
            onDrop={(e: DragEvent<HTMLImageElement>) => DropHandler(e, cell)}
            color={
              (arr.indexOf(cell.cell[0]) === -1 && +cell.cell[1] % 2 === 0) ||
              (arr.indexOf(cell.cell[0]) !== -1 && +cell.cell[1] % 2 !== 0)
                ? "black"
                : "white"
            }
            isKingAttacked={isKingAttacked}
          />
        ))
        .reverse()}
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
