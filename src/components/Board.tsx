import React, { FC, useState, useEffect, MouseEvent, useRef } from "react";
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
  const imgDrag = useRef<HTMLImageElement | null>(null);
  const [drag, setDrag] = useState<boolean | string>(false);
  const { clickOnFigure, movePiece, restart, dispatchPieceisSelected, game } =
    useActoins();
  const [formerCell, setFormerCell] = useState<cell | null>(null);
  const arr = ["a", "c", "e", "g"];
  function pieceIsSelected(piece: pieces) {
    dispatchPieceisSelected(board, piece);
  }
  useEffect(() => {
    game(board, turn);
  }, [turn]);
  function handleClick(cell: cell) {
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
  function moveAt(pageX: any, pageY: any) {
    imgDrag.current!.style.left =
      pageX - imgDrag.current!.offsetWidth / 2 + "px";
    imgDrag.current!.style.top =
      pageY - imgDrag.current!.offsetHeight / 2 + "px";
  }
  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (drag) moveAt(e.pageX, e.pageY);
  }
  async function onMouseDownHandler(
    e: MouseEvent<HTMLImageElement>,
    cell: cell,
    img: string
  ) {
    setFormerCell(cell);
    await setDrag(img);
    moveAt(e.pageX, e.pageY);
    e.preventDefault();
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
  function mouseUpHandler(e: MouseEvent<HTMLDivElement>, cell: cell) {
    setDrag(false);
    if (cell.available === true) movePiece(cell, board, formerCell!);
    (e.target as Element).classList.remove("pieceHover");
  }
  function onMouseOverHandler(e: MouseEvent<HTMLDivElement>, cell: cell) {
    e.preventDefault();
    if (cell.available === true && (e.target as Element).tagName === "DIV")
      (e.target as Element).classList.add("pieceHover");
  }
  function onMouseLeaveHandler(e: MouseEvent<HTMLDivElement>) {
    (e.target as Element).classList.remove("pieceHover");
  }
  return (
    <div className="flex board" id="board" onMouseMove={onMouseMove}>
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
            drag={drag}
            imgDrag={imgDrag}
            key={cell.cell}
            cell={cell}
            onClick={handleClick}
            onMouseDown={onMouseDownHandler}
            onMouseLeave={onMouseLeaveHandler}
            mouseUp={mouseUpHandler}
            onMouseOver={onMouseOverHandler}
            formerCell={formerCell}
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
