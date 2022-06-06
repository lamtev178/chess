import { cell, GameStatus } from "../../types/board";
import { pieces } from "../../types/pieces";
import { bishopMove } from "./bishop";
import { isKingAttacked, kingMove } from "./king";
import { knightMove } from "./knight";
import { pawnMove } from "./pawn";
import { queenMove } from "./queen";
import { rookMove } from "./rook";
export function potentialBoard(
  formerCell: cell,
  cell: cell,
  board: cell[]
): cell[] {
  let res: cell[] = [];
  let piece = formerCell.piece;
  res = [
    ...board.map((c) => {
      if (c.cell === cell.cell) {
        return { ...c, piece: piece };
      } else if (c.cell === formerCell.cell) {
        return { ...c, piece: null };
      } else return c;
    }),
  ];
  return res;
}
export function getKingPos(board: cell[]) {
  let res: any = { dark: null, white: null };
  board.forEach((c) => {
    if (c.piece === pieces.KING_DARK) res.dark = c;
    if (c.piece === pieces.KING_WHITE) res.white = c;
  });
  return res;
}
export function isGameOver(
  board: cell[],
  turn: "WHITE" | "DARK",
  darkKingPos: cell,
  whiteKingPos: cell
): GameStatus {
  let res;
  board.forEach((c: cell) => {
    if (c.piece?.split("_")[1] === turn) {
      if (c.piece === pieces.BISHOP_DARK || c.piece === pieces.BISHOP_WHITE) {
        if (
          bishopMove(c, board, turn, whiteKingPos, darkKingPos).filter(
            (c: cell) => c.available
          ).length > 0
        )
          res = GameStatus.PLAYING;
      } else if (
        c.piece === pieces.QUEEN_DARK ||
        c.piece === pieces.QUEEN_WHITE
      ) {
        if (
          queenMove(c, board, turn, whiteKingPos, darkKingPos).filter(
            (c: cell) => c.available
          ).length > 0
        )
          res = GameStatus.PLAYING;
      } else if (
        c.piece === pieces.ROOK_DARK ||
        c.piece === pieces.ROOK_WHITE
      ) {
        if (
          rookMove(c, board, turn, whiteKingPos, darkKingPos).filter(
            (c: cell) => c.available
          ).length > 0
        )
          res = GameStatus.PLAYING;
      } else if (
        c.piece === pieces.PAWN_DARK ||
        c.piece === pieces.PAWN_WHITE
      ) {
        if (
          pawnMove(c, board, turn, whiteKingPos, darkKingPos).filter(
            (c: cell) => c.available
          ).length > 0
        )
          res = GameStatus.PLAYING;
      } else if (
        c.piece === pieces.KNIGHT_DARK ||
        c.piece === pieces.KNIGHT_WHITE
      ) {
        if (
          knightMove(c, board, turn, whiteKingPos, darkKingPos).filter(
            (c: cell) => c.available
          ).length > 0
        )
          res = GameStatus.PLAYING;
      } else if (c.piece === pieces.KING_DARK || c.piece === pieces.KING_WHITE)
        if (
          kingMove(c, board, turn).filter((c: cell) => c.available).length > 0
        )
          res = GameStatus.PLAYING;
    }
  });
  if (res === GameStatus.PLAYING) return res;
  else if (
    res !== GameStatus.PLAYING &&
    turn === "DARK" &&
    isKingAttacked(darkKingPos, board, turn)
  ) {
    res = GameStatus.WHITE_IS_WIN;
  } else if (
    res !== GameStatus.PLAYING &&
    turn === "WHITE" &&
    isKingAttacked(whiteKingPos, board, turn)
  )
    res = GameStatus.DARK_IS_WIN;
  else res = GameStatus.DRAW;
  return res;
}
