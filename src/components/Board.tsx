import React, { FC, useState, useEffect, DragEvent, MouseEvent } from "react";
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
  }, [board]);
  function handleClick(cell: cell) {
    document
      .getElementById(formerCell !== null ? formerCell.cell : "")
      ?.classList.remove("active");
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
    const newImg = document.getElementById("draggbleImg");
    newImg!.style.left = pageX - newImg!.offsetWidth / 2 + "px";
    newImg!.style.top = pageY - newImg!.offsetHeight / 2 + "px";
  }
  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (drag) moveAt(e.pageX, e.pageY);
  }
  function onMouseDownHandler(
    e: MouseEvent<HTMLImageElement>,
    cell: cell,
    img: string
  ) {
    setFormerCell(cell);
    setDrag(cell.cell);
    e.preventDefault();
    const newImg = new Image();
    newImg.src = img;
    document.getElementById("secret")!.append(newImg);
    console.log("DOWN", formerCell !== null ? formerCell.cell : "");

    document
      .getElementById(formerCell !== null ? formerCell.cell : "")
      ?.classList.remove("active");
    document.getElementById(cell.cell)!.classList.add("draggble", "active");
    newImg.id = "draggbleImg";
    moveAt(e.pageX, e.pageY);
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
    document
      .getElementById(formerCell !== null ? formerCell.cell : "")
      ?.classList.remove("draggble");
    setDrag(false);
    document.getElementById("draggbleImg")?.remove();
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
            key={cell.cell}
            cell={cell}
            onClick={handleClick}
            onMouseDown={onMouseDownHandler}
            onMouseLeave={onMouseLeaveHandler}
            mouseUp={mouseUpHandler}
            onMouseOver={onMouseOverHandler}
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
