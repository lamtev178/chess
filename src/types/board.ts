import { pieces } from "./pieces";

export interface cell {
  cell: string;
  piece: pieces | null;
  available: boolean;
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
}
interface ChangeTurn {
  type: BoardActionTypes.CHANGE_TURN;
  payload: string;
}
interface Restart {
  type: BoardActionTypes.RESTART;
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
  payload: "h1" | "a1" | "a8" | "h8" | "e8" | "e1";
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
  | Castle;
