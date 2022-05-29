import { Dispatch } from "react";
import {
  boardAction,
  BoardActionTypes,
  cell,
  GameStatus,
} from "../../types/board";
import { pieces } from "../../types/pieces";
import { bishopMove } from "./bishop";
import { rookMove } from "./rook";
import { knightMove } from "./knight";
import { pawnMove } from "./pawn";
import { isKingAttacked, kingMove } from "./king";
import { isGameOver } from "./board";
import { queenMove } from "./queen";

let whiteKingPos: cell = {
  cell: "e1",
  piece: pieces.KING_WHITE,
  available: false,
};
let darkKingPos: cell = {
  cell: "e8",
  piece: pieces.KING_DARK,
  available: false,
};
export const restart = () => (dispatch: Dispatch<boardAction>) => {
  dispatch({ type: BoardActionTypes.RESTART });
};
export const movePiece =
  (cell: cell, board: cell[], formerCell: cell) =>
  (dispatch: Dispatch<boardAction>) => {
    let res: cell[] = [];
    board = [
      ...board.map((c) =>
        c.available === true ? { ...c, available: false } : c
      ),
    ];
    if (formerCell.piece === pieces.KING_WHITE) whiteKingPos.cell = cell.cell;
    if (formerCell.piece === pieces.KING_DARK) darkKingPos.cell = cell.cell;
    res = [
      ...board.map((c) => {
        if (c.cell === cell.cell) return { ...c, piece: formerCell.piece };
        else if (c.cell === formerCell.cell) return { ...c, piece: null };
        return c;
      }),
    ];
    const piece: any = formerCell.piece?.split("_")[1];
    const oppositColor = piece === "WHITE" ? "DARK" : "WHITE";
    let endOfGame = isGameOver(res, oppositColor, darkKingPos, whiteKingPos);
    if (endOfGame !== GameStatus.PLAYING)
      dispatch({ type: BoardActionTypes.END_OF_GAME, payload: endOfGame });
    dispatch({ type: BoardActionTypes.MOVE_PIECE, payload: res });
    if (
      isKingAttacked(
        piece === "WHITE" ? darkKingPos : whiteKingPos,
        res,
        oppositColor
      )
    ) {
      dispatch({
        type: BoardActionTypes.CHECK,
        payload: piece === "WHITE" ? pieces.KING_DARK : pieces.KING_WHITE,
      });
    } else dispatch({ type: BoardActionTypes.CHECK, payload: false });
  };
export const clickOnFigure =
  (cell: cell, board: cell[], turn: "white" | "dark") =>
  (dispatch: Dispatch<boardAction>) => {
    board = [
      ...board.map((c) =>
        c.available === true ? { ...c, available: false } : c
      ),
    ];
    let res: cell[] = [];
    const color = cell.piece?.split("_")[1];
    if (color === "WHITE" && turn === "white") {
      switch (cell.piece) {
        case pieces.KING_WHITE: {
          res = kingMove(cell, board, color);
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: res,
          });
        }
        case pieces.QUEEN_WHITE: {
          res = queenMove(cell, board, color, darkKingPos, whiteKingPos);
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: res,
          });
        }
        case pieces.ROOK_WHITE: {
          res = rookMove(cell, board, color, whiteKingPos, darkKingPos);
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: res,
          });
        }
        case pieces.PAWN_WHITE: {
          res = pawnMove(cell, board, color, whiteKingPos, darkKingPos);
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: res,
          });
        }
        case pieces.BISHOP_WHITE: {
          res = bishopMove(cell, board, color, whiteKingPos, darkKingPos);
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: res,
          });
        }
        case pieces.KNIGHT_WHITE: {
          res = knightMove(cell, board, color, whiteKingPos, darkKingPos);
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: res,
          });
        }
      }
    }
    if (color === "DARK" && turn === "dark") {
      switch (cell.piece) {
        case pieces.KING_DARK: {
          res = kingMove(cell, board, color);
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: res,
          });
        }
        case pieces.QUEEN_DARK: {
          res = queenMove(cell, board, color, darkKingPos, whiteKingPos);
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: res,
          });
        }
        case pieces.ROOK_DARK: {
          res = rookMove(cell, board, color, whiteKingPos, darkKingPos);
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: res,
          });
        }
        case pieces.PAWN_DARK: {
          res = pawnMove(cell, board, color, whiteKingPos, darkKingPos);
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: res,
          });
        }
        case pieces.BISHOP_DARK: {
          res = bishopMove(cell, board, color, whiteKingPos, darkKingPos);
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: res,
          });
        }
        case pieces.KNIGHT_DARK: {
          res = knightMove(cell, board, color, whiteKingPos, darkKingPos);
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: res,
          });
        }
      }
    }
    dispatch({ type: BoardActionTypes.CLICK_ON_FIGURE, payload: board });
  };
