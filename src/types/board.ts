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
  EAT_PIECE = "EAT_PIECE",
  CASTLE = "CASTLE",
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
interface EndGameAction {
  type: BoardActionTypes.END_OF_GAME;
  payload: GameStatus;
}
interface Castle {
  type: BoardActionTypes.CASTLE;
  payload: {
    side: string;
    direction: string;
  };
}
interface ClickOnFigure {
  type: BoardActionTypes.CLICK_ON_FIGURE;
  payload: cell[];
}
export type boardAction =
  | MovePieceAction
  | Castle
  | MovePieceAction
  | ChangeTurn
  | ClickOnFigure
  | EndGameAction
  | Restart;
