import { pieces } from "./pieces"

export interface cell {
  cell : string,
  piece : pieces | null,
  available : boolean
}
export const enum BoardActionTypes{
  MOVE_PIECE = "MOVE_PIECE",
  EAT_PIECE = "EAT_PIECE",
  CASTLE = "CASTLE",
  CHANGE_TURN = "CHANGE_TURN",
  CLICK_ON_FIGURE = "CLICK_ON_FIGURE",
}
interface ChangeTurn{
  type: BoardActionTypes.CHANGE_TURN,
  payload: string
}
interface MovePieceAction {
  type: BoardActionTypes.MOVE_PIECE,
  payload: cell[]
}
interface Castle {
  type: BoardActionTypes.CASTLE,
  payload: {
    side : string,
    direction : string
  }
}
interface ClickOnFigure {
  type: BoardActionTypes.CLICK_ON_FIGURE,
  payload: cell[]
}
interface EatPieceAction {
  type: BoardActionTypes.EAT_PIECE,
  payload: {
    piece : pieces,
    eatedPiece : pieces,
    from : string,
    to : string
  }
}
export type boardAction = MovePieceAction | EatPieceAction | Castle | MovePieceAction | ChangeTurn | ClickOnFigure