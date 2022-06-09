import React, { FC, useState, useEffect, MouseEvent, useRef } from "react";
import { useActoins } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/usedTypeSelector";
import { cell, fetchBoardInterface, GameStatus } from "../types/board";
import Modal from "./Modal";
import Cell from "./Cell";
import { pieces } from "../types/pieces";
import tom from "../sounds/tom.wav";
import { io, Socket } from "socket.io-client";
const { Howl } = require("howler");

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
  var sound = new Howl({
    src: tom,
    html5: true,
  });
  const imgDrag = useRef<HTMLImageElement | null>(null);
  const [drag, setDrag] = useState<boolean | string>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const {
    clickOnFigure,
    movePiece,
    restart,
    dispatchPieceisSelected,
    game,
    fetchBoard,
  } = useActoins();
  const [formerCell, setFormerCell] = useState<cell | null>(null);
  const arr = ["a", "c", "e", "g"];
  function pieceIsSelected(piece: pieces) {
    dispatchPieceisSelected(
      board,
      piece,
      choosePiece ? choosePiece : null,
      choosePiece ? formerCell : null
    );
    console.log("piece", choosePiece ? choosePiece : null);
  }
  useEffect(() => {
    const newSocket = io("https://la-chess-server.herokuapp.com/");
    //const newSocket = io("http://localhost:3030/");
    setSocket(newSocket);
  }, []);
  useEffect(() => {
    if (socket) {
      socket!.on("connect", () => console.log(socket!.connected, socket.id));
      socket!.on("board", (arg: fetchBoardInterface) => fetchBoard(arg));
      socket.once("get color", (color: string) => {
        console.log("get color", color);
        localStorage.color = color;
      });
      socket.once("firstFetch", (arg: fetchBoardInterface) => fetchBoard(arg));
    }
  }, [socket]);
  useEffect(() => {
    game(board, turn);
    sound.play();
    if (socket !== null)
      socket.emit("board", {
        board: board,
        darkCastleLong: darkCastleLong,
        darkCastleShort: darkCastleShort,
        whiteCastleLong: whiteCastleLong,
        whiteCastleShort: whiteCastleShort,
        turn,
      });
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
  const boardjsx = board.map((cell: cell) => (
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
  ));
  return (
    <div className="flex board" id="board" onMouseMove={onMouseMove}>
      {choosePiece ? <Modal color={turn} onClick={pieceIsSelected} /> : <></>}
      {localStorage.color === "dark" ? boardjsx.reverse() : boardjsx}
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
