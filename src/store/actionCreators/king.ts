import { cell } from "../../types/board";
import { pieces } from "../../types/pieces";
import { rook } from "./rook";
import { bishop } from "./bishop";
import { knight } from "./knight";
export function kingMove(
  cell: cell,
  board: cell[],
  color: "WHITE" | "DARK",
  darkCastlLong?: boolean,
  darkCastlShort?: boolean,
  whiteCastlLong?: boolean,
  whiteCastlShort?: boolean
): cell[] {
  let res: cell[] = [];
  let availableCells = king(
    cell,
    board,
    color,
    darkCastlLong,
    darkCastlShort,
    whiteCastlLong,
    whiteCastlShort
  );
  res = [
    ...board.map((c) => {
      if (
        availableCells.indexOf(c.cell) !== -1 &&
        !isKingAttacked(c, board, color)
      ) {
        return { ...c, available: true };
      } else return c;
    }),
  ];
  return res;
}
export function king(
  cell: cell,
  board: cell[],
  color: "WHITE" | "DARK",
  darkCastlLong?: boolean,
  darkCastlShort?: boolean,
  whiteCastlLong?: boolean,
  whiteCastlShort?: boolean
): string[] {
  let res: string[] = [];
  board.forEach((c) => {
    const isNextNums: boolean = c.cell[1] === +cell.cell[1] + 1 + "";
    const isNums: boolean = c.cell[1] === cell.cell[1];
    const isPrevNums: boolean = c.cell[1] === +cell.cell[1] - 1 + "";
    const isLine: boolean = c.cell[0] === cell.cell[0];
    const isPrevLine: boolean =
      c.cell[0].charCodeAt(0) - 1 === cell.cell[0].charCodeAt(0);
    const isNextLine: boolean =
      c.cell[0].charCodeAt(0) + 1 === cell.cell[0].charCodeAt(0);
    const isPiece: boolean = c.piece === null;
    const isPieceColor: boolean = c.piece?.split("_")[1] !== color;
    let isCastleLong;
    let isCastleShort;
    if (whiteCastlLong || whiteCastlShort || darkCastlLong || darkCastlShort) {
      const num = cell.cell[1] === "8" ? "8" : "1";
      const firstLine = rook(cell, board, color);
      const isPiecesFirstLineShort =
        firstLine.indexOf(`f${num}`) !== -1 &&
        firstLine.indexOf(`g${num}`) !== -1;
      const isPiecesFirstLineLong =
        firstLine.indexOf(`b${num}`) !== -1 &&
        firstLine.indexOf(`c${num}`) !== -1 &&
        firstLine.indexOf(`d${num}`) !== -1;
      isCastleLong =
        (c.cell === `a${num}` || c.cell === `c${num}`) &&
        (cell.cell[1] === "8" ? darkCastlLong : whiteCastlLong) &&
        isPiecesFirstLineLong;
      isCastleShort =
        (c.cell === `h${num}` || c.cell === `g${num}`) &&
        (cell.cell[1] === "8" ? darkCastlShort : whiteCastlShort) &&
        isPiecesFirstLineShort;
    }
    if (
      ((isNextNums || isPrevNums || isNums) &&
        (isLine || isNextLine || isPrevLine) &&
        (isPiece || isPieceColor)) ||
      isCastleLong ||
      isCastleShort
    ) {
      res.push(c.cell);
    }
  });
  return res;
}
export function isKingAttacked(
  cell: cell,
  board: cell[],
  color: "WHITE" | "DARK"
): boolean {
  let isAttacked: boolean = false;
  let rookArr: string[] = rook(cell, board, color);
  let bishopArr: string[] = bishop(cell, board, color);
  let knightArr: string[] = knight(board, cell, color);
  let kingArr: string[] = king(cell, board, color);
  const nextNum = +cell.cell[1] + (color !== "DARK" ? +1 : -1) + "";
  const adjacentLinesLeft: string = String.fromCharCode(
    cell.cell[0].charCodeAt(0) - 1
  );
  const adjacentLinesRight: string = String.fromCharCode(
    cell.cell[0].charCodeAt(0) + 1
  );
  let pawnArr: string[] = [
    adjacentLinesLeft + nextNum,
    adjacentLinesRight + nextNum,
  ];
  board.forEach((c) => {
    const inRookArr: boolean = rookArr.indexOf(c.cell) !== -1;
    const inBishopArr: boolean = bishopArr.indexOf(c.cell) !== -1;
    const inKnightArr: boolean = knightArr.indexOf(c.cell) !== -1;
    const inPawnArr: boolean = pawnArr.indexOf(c.cell) !== -1;
    const inKingArr: boolean = kingArr.indexOf(c.cell) !== -1;
    const isPieceRookQueen: boolean =
      c.piece === (color === "WHITE" ? pieces.ROOK_DARK : pieces.ROOK_WHITE) ||
      c.piece === (color === "WHITE" ? pieces.QUEEN_DARK : pieces.QUEEN_WHITE);
    const isPieceKnight: boolean =
      c.piece ===
      (color === "WHITE" ? pieces.KNIGHT_DARK : pieces.KNIGHT_WHITE);
    const isPiecePawn: boolean =
      c.piece === (color === "WHITE" ? pieces.PAWN_DARK : pieces.PAWN_WHITE);
    const isPieceKing: boolean =
      c.piece === (color === "WHITE" ? pieces.KING_DARK : pieces.KING_WHITE);
    const isPieceBishopQueen: boolean =
      c.piece ===
        (color === "WHITE" ? pieces.BISHOP_DARK : pieces.BISHOP_WHITE) ||
      c.piece === (color === "WHITE" ? pieces.QUEEN_DARK : pieces.QUEEN_WHITE);
    if (
      (inRookArr && isPieceRookQueen) ||
      (inBishopArr && isPieceBishopQueen) ||
      (inKnightArr && isPieceKnight) ||
      (inPawnArr && isPiecePawn) ||
      (inKingArr && isPieceKing)
    ) {
      isAttacked = true;
    }
  });
  return isAttacked;
}
