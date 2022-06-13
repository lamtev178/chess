import {
  boardAction,
  BoardActionTypes,
  cell,
  GameStatus,
} from "../../types/board";
import { pieces } from "../../types/pieces";
interface initialStateProps {
  end: GameStatus;
  whiteCastleLong: boolean;
  whiteCastleShort: boolean;
  darkCastleLong: boolean;
  darkCastleShort: boolean;
  isKingAttacked: false | pieces.KING_WHITE | pieces.KING_DARK;
  turn: "white" | "dark";
  choosePiece: false | cell;
  board: cell[];
  moves: cell[];
}
const board = [];
for (let i = 8; i > 0; i--) {
  for (let j = 97; j < 105; j++) {
    const cell: cell = {
      cell: String.fromCharCode(j) + "" + i,
      available: false,
      piece: null,
    };
    if (cell.cell[1] === "2") cell.piece = pieces.PAWN_WHITE;
    if (cell.cell[1] === "7") cell.piece = pieces.PAWN_DARK;
    if ((cell.cell[0] === "a" || cell.cell[0] === "h") && cell.cell[1] === "8")
      cell.piece = pieces.ROOK_DARK;
    if ((cell.cell[0] === "a" || cell.cell[0] === "h") && cell.cell[1] === "1")
      cell.piece = pieces.ROOK_WHITE;
    if ((cell.cell[0] === "b" || cell.cell[0] === "g") && cell.cell[1] === "1")
      cell.piece = pieces.KNIGHT_WHITE;
    if ((cell.cell[0] === "b" || cell.cell[0] === "g") && cell.cell[1] === "8")
      cell.piece = pieces.KNIGHT_DARK;
    if ((cell.cell[0] === "c" || cell.cell[0] === "f") && cell.cell[1] === "8")
      cell.piece = pieces.BISHOP_DARK;
    if ((cell.cell[0] === "c" || cell.cell[0] === "f") && cell.cell[1] === "1")
      cell.piece = pieces.BISHOP_WHITE;
    if (cell.cell[0] === "d" && cell.cell[1] === "1")
      cell.piece = pieces.QUEEN_WHITE;
    if (cell.cell[0] === "d" && cell.cell[1] === "8")
      cell.piece = pieces.QUEEN_DARK;
    if (cell.cell[0] === "e" && cell.cell[1] === "8")
      cell.piece = pieces.KING_DARK;
    if (cell.cell[0] === "e" && cell.cell[1] === "1")
      cell.piece = pieces.KING_WHITE;
    board.push(cell);
  }
}

const initialState: initialStateProps = {
  end: GameStatus.PLAYING,
  choosePiece: false,
  whiteCastleLong: true,
  whiteCastleShort: true,
  darkCastleLong: true,
  darkCastleShort: true,
  isKingAttacked: false,
  turn: "white",
  board: board,
  moves: [],
};

export const boardReducer = (
  store = initialState,
  action: boardAction
): initialStateProps => {
  switch (action.type) {
    case BoardActionTypes.CLICK_ON_FIGURE:
      return { ...store, board: action.payload, turn: store.turn };
    case BoardActionTypes.MOVE_PIECE:
      return {
        ...store,
        board: action.payload,
        turn: store.turn === "white" ? "dark" : "white",
      };
    case BoardActionTypes.END_OF_GAME:
      return { ...store, end: action.payload };
    case BoardActionTypes.IS_CASTLE: {
      if (action.payload === "h1") return { ...store, whiteCastleShort: false };
      else if (action.payload === "a1")
        return { ...store, whiteCastleLong: false };
      else if (action.payload === "a8")
        return { ...store, darkCastleLong: false };
      else if (action.payload === "h8")
        return { ...store, darkCastleShort: false };
      else if (action.payload === "e8")
        return { ...store, darkCastleShort: false, darkCastleLong: false };
      else if (action.payload === "e1")
        return { ...store, whiteCastleLong: false, whiteCastleShort: false };
      else return { ...store };
    }
    case BoardActionTypes.CASTLE: {
      const num =
        action.payload === "darkCastleShort" ||
        action.payload === "darkCastleLong"
          ? "8"
          : "1";
      if (
        action.payload === "whiteCastleShort" ||
        action.payload === "darkCastleShort"
      )
        return {
          ...store,
          whiteCastleShort:
            action.payload === "whiteCastleShort"
              ? false
              : store.whiteCastleShort,
          whiteCastleLong:
            action.payload === "whiteCastleShort"
              ? false
              : store.whiteCastleLong,
          darkCastleLong:
            action.payload === "darkCastleShort" ? false : store.darkCastleLong,
          darkCastleShort:
            action.payload === "darkCastleShort"
              ? false
              : store.darkCastleShort,
          board: [
            ...store.board.map((c: cell) => {
              if (c.cell === `h${num}` || c.cell === `e${num}`) {
                return { ...c, piece: null, available: false };
              } else if (c.cell === `g${num}`) {
                return {
                  ...c,
                  piece: num === "8" ? pieces.KING_DARK : pieces.KING_WHITE,
                  available: false,
                };
              } else if (c.cell === `f${num}`)
                return {
                  ...c,
                  piece: num === "8" ? pieces.ROOK_DARK : pieces.ROOK_WHITE,
                  available: false,
                };
              else return { ...c, available: false };
            }),
          ],
          turn: store.turn === "white" ? "dark" : "white",
        };
      else if (
        action.payload === "darkCastleLong" ||
        action.payload === "whiteCastleLong"
      )
        return {
          ...store,
          whiteCastleShort:
            action.payload === "whiteCastleLong"
              ? false
              : store.whiteCastleShort,
          whiteCastleLong:
            action.payload === "whiteCastleLong"
              ? false
              : store.whiteCastleLong,
          darkCastleLong:
            action.payload === "darkCastleLong" ? false : store.darkCastleLong,
          darkCastleShort:
            action.payload === "darkCastleLong" ? false : store.darkCastleShort,
          board: [
            ...store.board.map((c: cell) => {
              if (c.cell === `a${num}` || c.cell === `e${num}`) {
                return { ...c, piece: null, available: false };
              } else if (c.cell === `c${num}`) {
                return {
                  ...c,
                  piece: num === "8" ? pieces.KING_DARK : pieces.KING_WHITE,
                  available: false,
                };
              } else if (c.cell === `d${num}`)
                return {
                  ...c,
                  piece: num === "8" ? pieces.ROOK_DARK : pieces.ROOK_WHITE,
                  available: false,
                };
              else return { ...c, available: false };
            }),
          ],
          turn: store.turn === "white" ? "dark" : "white",
        };
      else return { ...store };
    }
    case BoardActionTypes.CHECK:
      return { ...store, isKingAttacked: action.payload };
    case BoardActionTypes.RESTART:
      return initialState;
    case BoardActionTypes.RESIGN:
      return { ...store, end: action.payload };
    case BoardActionTypes.MOVE:
      return { ...store, moves: store.moves.concat(...action.payload) };
    case BoardActionTypes.FETCHED_BOARD:
      return {
        ...store,
        board: action.payload.board,
        turn: action.payload.turn,
        darkCastleLong: action.payload.darkCastleLong,
        darkCastleShort: action.payload.darkCastleShort,
        whiteCastleLong: action.payload.whiteCastleLong,
        whiteCastleShort: action.payload.whiteCastleShort,
        moves: action.payload.moves,
      };
    case BoardActionTypes.CHOOSE_PIECE:
      return {
        ...store,
        choosePiece: Array.isArray(action.payload) ? false : action.payload,
        turn: Array.isArray(action.payload)
          ? store.turn === "white"
            ? "dark"
            : "white"
          : store.turn,
        board: Array.isArray(action.payload) ? action.payload : store.board,
      };
    default:
      return store;
  }
};
