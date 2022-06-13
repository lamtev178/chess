import { Dispatch } from "react";
import {
  boardAction,
  BoardActionTypes,
  cell,
  fetchBoardInterface,
  GameStatus,
} from "../../types/board";
import { pieces } from "../../types/pieces";
import { bishopMove } from "./bishop";
import { rookMove } from "./rook";
import { knightMove } from "./knight";
import { pawnMove } from "./pawn";
import { isKingAttacked, kingMove } from "./king";
import { getKingPos, isGameOver } from "./board";
import { queenMove } from "./queen";
export const restart = () => (dispatch: Dispatch<boardAction>) => {
  dispatch({ type: BoardActionTypes.RESTART });
};
export const fetchBoard =
  (board: fetchBoardInterface) => (dispatch: Dispatch<boardAction>) => {
    dispatch({ type: BoardActionTypes.FETCHED_BOARD, payload: board });
  };
export const game =
  (board: cell[], turn: string) => (dispatch: Dispatch<boardAction>) => {
    const piece: any = turn === "white" ? "DARK" : "WHITE";
    const oppositColor = piece === "WHITE" ? "DARK" : "WHITE";
    let endOfGame = isGameOver(
      board,
      oppositColor,
      getKingPos(board).dark,
      getKingPos(board).white
    );
    if (endOfGame !== GameStatus.PLAYING)
      dispatch({ type: BoardActionTypes.END_OF_GAME, payload: endOfGame });
    if (
      isKingAttacked(
        piece === "WHITE" ? getKingPos(board).dark : getKingPos(board).white,
        board,
        oppositColor
      )
    ) {
      dispatch({
        type: BoardActionTypes.CHECK,
        payload: piece === "WHITE" ? pieces.KING_DARK : pieces.KING_WHITE,
      });
    } else dispatch({ type: BoardActionTypes.CHECK, payload: false });
  };
export const resign =
  (game: GameStatus) => (dispatch: Dispatch<boardAction>) => {
    dispatch({
      type: BoardActionTypes.RESIGN,
      payload: game,
    });
  };
export const dispatchPieceisSelected =
  (board: cell[], piece: pieces, cell: cell | null, formerCell: cell | null) =>
  (dispatch: Dispatch<boardAction>) => {
    board = [
      ...board.map((c) =>
        c.available === true ? { ...c, available: false } : c
      ),
    ];
    let res: cell[] = [];
    res = [
      ...board.map((c) => {
        if (formerCell && c.cell === formerCell.cell)
          return { ...c, piece: null };
        if (cell && c.cell === cell.cell)
          return { ...c, piece: piece, available: false };
        return c;
      }),
    ];
    dispatch({ type: BoardActionTypes.CHOOSE_PIECE, payload: res });
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
    dispatch({ type: BoardActionTypes.MOVE, payload: [formerCell, cell] });
    if (
      formerCell.cell === "e1" &&
      (cell.cell === "a1" || cell.cell === "c1") &&
      formerCell.piece === pieces.KING_WHITE
    )
      dispatch({ type: BoardActionTypes.CASTLE, payload: "whiteCastleLong" });
    else if (
      formerCell.cell === "e1" &&
      (cell.cell === "h1" || cell.cell === "g1") &&
      formerCell.piece === pieces.KING_WHITE
    )
      dispatch({
        type: BoardActionTypes.CASTLE,
        payload: "whiteCastleShort",
      });
    else if (
      formerCell.cell === "e8" &&
      (cell.cell === "h8" || cell.cell === "g8") &&
      formerCell.piece === pieces.KING_DARK
    )
      dispatch({ type: BoardActionTypes.CASTLE, payload: "darkCastleShort" });
    else if (
      formerCell.cell === "e8" &&
      (cell.cell === "a8" || cell.cell === "c8") &&
      formerCell.piece === pieces.KING_DARK
    )
      dispatch({ type: BoardActionTypes.CASTLE, payload: "darkCastleLong" });
    else {
      if (formerCell.cell[1] === "7" && formerCell.piece === pieces.PAWN_WHITE)
        return dispatch({ type: BoardActionTypes.CHOOSE_PIECE, payload: cell });
      if (formerCell.cell[1] === "2" && formerCell.piece === pieces.PAWN_DARK)
        return dispatch({ type: BoardActionTypes.CHOOSE_PIECE, payload: cell });
      res = [
        ...board.map((c) => {
          if (
            ["a1", "a8", "h1", "h8", "e1", "e8"].indexOf(formerCell.cell) !== -1
          )
            dispatch({
              type: BoardActionTypes.IS_CASTLE,
              payload: formerCell.cell,
            });
          if (c.cell === cell.cell) return { ...c, piece: formerCell.piece };
          else if (c.cell === formerCell.cell) return { ...c, piece: null };
          return c;
        }),
      ];
      dispatch({ type: BoardActionTypes.MOVE_PIECE, payload: res });
    }
  };

export const clickOnFigure =
  (
    cell: cell,
    board: cell[],
    turn: "white" | "dark",
    darkCastlLong: boolean,
    darkCastlShort: boolean,
    whiteCastlLong: boolean,
    whiteCastlShort: boolean
  ) =>
  (dispatch: Dispatch<boardAction>) => {
    board = [
      ...board.map((c) =>
        c.available === true ? { ...c, available: false } : c
      ),
    ];
    const color = cell.piece?.split("_")[1];
    if (
      color === "WHITE" &&
      turn === "white" &&
      localStorage.color === "white"
    ) {
      switch (cell.piece) {
        case pieces.KING_WHITE: {
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: kingMove(
              cell,
              board,
              color,
              darkCastlLong,
              darkCastlShort,
              whiteCastlLong,
              whiteCastlShort
            ),
          });
        }
        case pieces.QUEEN_WHITE: {
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: queenMove(
              cell,
              board,
              color,
              getKingPos(board).dark,
              getKingPos(board).white
            ),
          });
        }
        case pieces.ROOK_WHITE: {
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: rookMove(
              cell,
              board,
              color,
              getKingPos(board).white,
              getKingPos(board).dark
            ),
          });
        }
        case pieces.PAWN_WHITE: {
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: pawnMove(
              cell,
              board,
              color,
              getKingPos(board).white,
              getKingPos(board).dark
            ),
          });
        }
        case pieces.BISHOP_WHITE: {
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: bishopMove(
              cell,
              board,
              color,
              getKingPos(board).white,
              getKingPos(board).dark
            ),
          });
        }
        case pieces.KNIGHT_WHITE: {
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: knightMove(
              cell,
              board,
              color,
              getKingPos(board).white,
              getKingPos(board).dark
            ),
          });
        }
      }
    }
    if (color === "DARK" && turn === "dark" && localStorage.color === "dark") {
      switch (cell.piece) {
        case pieces.KING_DARK: {
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: kingMove(
              cell,
              board,
              color,
              darkCastlLong,
              darkCastlShort,
              whiteCastlLong,
              whiteCastlShort
            ),
          });
        }
        case pieces.QUEEN_DARK: {
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: queenMove(
              cell,
              board,
              color,
              getKingPos(board).dark,
              getKingPos(board).white
            ),
          });
        }
        case pieces.ROOK_DARK: {
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: rookMove(
              cell,
              board,
              color,
              getKingPos(board).white,
              getKingPos(board).dark
            ),
          });
        }
        case pieces.PAWN_DARK: {
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: pawnMove(
              cell,
              board,
              color,
              getKingPos(board).white,
              getKingPos(board).dark
            ),
          });
        }
        case pieces.BISHOP_DARK: {
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: bishopMove(
              cell,
              board,
              color,
              getKingPos(board).white,
              getKingPos(board).dark
            ),
          });
        }
        case pieces.KNIGHT_DARK: {
          return dispatch({
            type: BoardActionTypes.CLICK_ON_FIGURE,
            payload: knightMove(
              cell,
              board,
              color,
              getKingPos(board).white,
              getKingPos(board).dark
            ),
          });
        }
      }
    }
    dispatch({ type: BoardActionTypes.CLICK_ON_FIGURE, payload: board });
  };
