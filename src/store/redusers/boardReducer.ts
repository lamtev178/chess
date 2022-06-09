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
  board: [
    {
      cell: "a8",
      piece: pieces.ROOK_DARK,
      available: false,
    },
    {
      cell: "b8",
      piece: pieces.KNIGHT_DARK,
      available: false,
    },
    {
      cell: "c8",
      piece: pieces.BISHOP_DARK,
      available: false,
    },
    {
      cell: "d8",
      piece: pieces.QUEEN_DARK,
      available: false,
    },
    {
      cell: "e8",
      piece: pieces.KING_DARK,
      available: false,
    },
    {
      cell: "f8",
      piece: pieces.BISHOP_DARK,
      available: false,
    },
    {
      cell: "g8",
      piece: pieces.KNIGHT_DARK,
      available: false,
    },
    {
      cell: "h8",
      piece: pieces.ROOK_DARK,
      available: false,
    },
    {
      cell: "a7",
      piece: pieces.PAWN_DARK,
      available: false,
    },
    {
      cell: "b7",
      piece: pieces.PAWN_DARK,
      available: false,
    },
    {
      cell: "c7",
      piece: pieces.PAWN_DARK,
      available: false,
    },
    {
      cell: "d7",
      piece: pieces.PAWN_DARK,
      available: false,
    },
    {
      cell: "e7",
      piece: pieces.PAWN_DARK,
      available: false,
    },
    {
      cell: "f7",
      piece: pieces.PAWN_DARK,
      available: false,
    },
    {
      cell: "g7",
      piece: pieces.PAWN_DARK,
      available: false,
    },
    {
      cell: "h7",
      piece: pieces.PAWN_DARK,
      available: false,
    },
    {
      cell: "a6",
      piece: null,
      available: false,
    },
    {
      cell: "b6",
      piece: null,
      available: false,
    },
    {
      cell: "c6",
      piece: null,
      available: false,
    },
    {
      cell: "d6",
      piece: null,
      available: false,
    },
    {
      cell: "e6",
      piece: null,
      available: false,
    },
    {
      cell: "f6",
      piece: null,
      available: false,
    },
    {
      cell: "g6",
      piece: null,
      available: false,
    },
    {
      cell: "h6",
      piece: null,
      available: false,
    },
    {
      cell: "a5",
      piece: null,
      available: false,
    },
    {
      cell: "b5",
      piece: null,
      available: false,
    },
    {
      cell: "c5",
      piece: null,
      available: false,
    },
    {
      cell: "d5",
      piece: null,
      available: false,
    },
    {
      cell: "e5",
      piece: null,
      available: false,
    },
    {
      cell: "f5",
      piece: null,
      available: false,
    },
    {
      cell: "g5",
      piece: null,
      available: false,
    },
    {
      cell: "h5",
      piece: null,
      available: false,
    },
    {
      cell: "a4",
      piece: null,
      available: false,
    },
    {
      cell: "b4",
      piece: null,
      available: false,
    },
    {
      cell: "c4",
      piece: null,
      available: false,
    },
    {
      cell: "d4",
      piece: null,
      available: false,
    },
    {
      cell: "e4",
      piece: null,
      available: false,
    },
    {
      cell: "f4",
      piece: null,
      available: false,
    },
    {
      cell: "g4",
      piece: null,
      available: false,
    },
    {
      cell: "h4",
      piece: null,
      available: false,
    },
    {
      cell: "a3",
      piece: null,
      available: false,
    },
    {
      cell: "b3",
      piece: null,
      available: false,
    },
    {
      cell: "c3",
      piece: null,
      available: false,
    },
    {
      cell: "d3",
      piece: null,
      available: false,
    },
    {
      cell: "e3",
      piece: null,
      available: false,
    },
    {
      cell: "f3",
      piece: null,
      available: false,
    },
    {
      cell: "g3",
      piece: null,
      available: false,
    },
    {
      cell: "h3",
      piece: null,
      available: false,
    },
    {
      cell: "a2",
      piece: pieces.PAWN_WHITE,
      available: false,
    },
    {
      cell: "b2",
      piece: pieces.PAWN_WHITE,
      available: false,
    },
    {
      cell: "c2",
      piece: pieces.PAWN_WHITE,
      available: false,
    },
    {
      cell: "d2",
      piece: pieces.PAWN_WHITE,
      available: false,
    },
    {
      cell: "e2",
      piece: pieces.PAWN_WHITE,
      available: false,
    },
    {
      cell: "f2",
      piece: pieces.PAWN_WHITE,
      available: false,
    },
    {
      cell: "g2",
      piece: pieces.PAWN_WHITE,
      available: false,
    },
    {
      cell: "h2",
      piece: pieces.PAWN_WHITE,
      available: false,
    },
    {
      cell: "a1",
      piece: pieces.ROOK_WHITE,
      available: false,
    },
    {
      cell: "b1",
      piece: pieces.KNIGHT_WHITE,
      available: false,
    },
    {
      cell: "c1",
      piece: pieces.BISHOP_WHITE,
      available: false,
    },
    {
      cell: "d1",
      piece: pieces.QUEEN_WHITE,
      available: false,
    },
    {
      cell: "e1",
      piece: pieces.KING_WHITE,
      available: false,
    },
    {
      cell: "f1",
      piece: pieces.BISHOP_WHITE,
      available: false,
    },
    {
      cell: "g1",
      piece: pieces.KNIGHT_WHITE,
      available: false,
    },
    {
      cell: "h1",
      piece: pieces.ROOK_WHITE,
      available: false,
    },
  ],
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
    case BoardActionTypes.FETCHED_BOARD:
      return {
        ...store,
        board: action.payload.board,
        turn: action.payload.turn,
        darkCastleLong: action.payload.darkCastleLong,
        darkCastleShort: action.payload.darkCastleShort,
        whiteCastleLong: action.payload.whiteCastleLong,
        whiteCastleShort: action.payload.whiteCastleShort,
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
