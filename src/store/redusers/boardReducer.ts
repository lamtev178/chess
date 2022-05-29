import {
  boardAction,
  BoardActionTypes,
  cell,
  GameStatus,
} from "../../types/board";
import { pieces } from "../../types/pieces";
interface initialStateProps {
  end: GameStatus;
  whiteCastlLong: boolean;
  whiteCastlShort: boolean;
  darkCastlLong: boolean;
  darkCastlShort: boolean;
  isKingAttacked: false | pieces.KING_WHITE | pieces.KING_DARK;
  turn: "white" | "dark";
  board: cell[];
}
const initialState: initialStateProps = {
  end: GameStatus.PLAYING,
  whiteCastlLong: true,
  whiteCastlShort: true,
  darkCastlLong: true,
  darkCastlShort: true,
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
    case BoardActionTypes.CHECK:
      return { ...store, isKingAttacked: action.payload };
    case BoardActionTypes.RESTART:
      return initialState;
    default:
      return store;
  }
};
