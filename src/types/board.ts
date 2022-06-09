import { pieces } from "./pieces";

export interface cell {
  cell: string;
  piece: pieces | null;
  available: boolean;
}
export interface fetchBoardInterface {
  board: cell[];
  darkCastleLong: boolean;
  darkCastleShort: boolean;
  whiteCastleLong: boolean;
  whiteCastleShort: boolean;
  turn: "white" | "dark";
}
export const enum GameStatus {
  PLAYING = "PLAYING",
  DRAW = "DRAW",
  DARK_IS_WIN = "DARK IS WIN",
  WHITE_IS_WIN = "WHITE IS WIN",
}
export const enum BoardActionTypes {
  MOVE_PIECE = "MOVE_PIECE",
  RESTART = "RESTART",
  CHECK = "CHECK",
  CASTLE = "CASTLE",
  IS_CASTLE = "IS_CASTLE",
  CHANGE_TURN = "CHANGE_TURN",
  CLICK_ON_FIGURE = "CLICK_ON_FIGURE",
  END_OF_GAME = "END_OF_GAME",
  CHOOSE_PIECE = "CHOOSE_PIECE",
  FETCHED_BOARD = "FETCHED_BOARD",
}
interface ChangeTurn {
  type: BoardActionTypes.CHANGE_TURN;
  payload: string;
}
interface fetchBoard {
  type: BoardActionTypes.FETCHED_BOARD;
  payload: fetchBoardInterface;
}
interface Restart {
  type: BoardActionTypes.RESTART;
}
interface choosePiece {
  type: BoardActionTypes.CHOOSE_PIECE;
  payload: cell | cell[];
}
interface MovePieceAction {
  type: BoardActionTypes.MOVE_PIECE;
  payload: cell[];
}
interface Check {
  type: BoardActionTypes.CHECK;
  payload: pieces.KING_WHITE | pieces.KING_DARK | false;
}
interface EndGameAction {
  type: BoardActionTypes.END_OF_GAME;
  payload: GameStatus;
}
interface isCastlePossible {
  type: BoardActionTypes.IS_CASTLE;
  payload: string;
}
interface Castle {
  type: BoardActionTypes.CASTLE;
  payload:
    | "whiteCastleLong"
    | "whiteCastleShort"
    | "darkCastleShort"
    | "darkCastleLong";
}
interface ClickOnFigure {
  type: BoardActionTypes.CLICK_ON_FIGURE;
  payload: cell[];
}
export type boardAction =
  | MovePieceAction
  | isCastlePossible
  | Check
  | ChangeTurn
  | ClickOnFigure
  | EndGameAction
  | Restart
  | Castle
  | choosePiece
  | fetchBoard;
