import { cell } from "../../types/board";
import { bishop } from "./bishop";
import { potentialBoard } from "./board";
import { isKingAttacked } from "./king";
import { rook } from "./rook";

export function queenMove(
  cell: cell,
  board: cell[],
  color: "WHITE" | "DARK",
  darkKingPos: cell,
  whiteKingPos: cell
): cell[] {
  let res: cell[] = [];
  const resArrOfAvailableCells = rook(cell, board);
  const resArrOfAvailableNums = bishop(cell, board);
  res = [
    ...board.map((c) => {
      const isWhite: boolean = c.piece?.split("_")[1] !== color;
      if (
        ((resArrOfAvailableNums.indexOf(c.cell) !== -1 && isWhite) ||
          (resArrOfAvailableCells.indexOf(c.cell) !== -1 && isWhite)) &&
        !isKingAttacked(
          color === "WHITE" ? whiteKingPos : darkKingPos,
          potentialBoard(cell, c, board),
          color
        )
      ) {
        return { ...c, available: true };
      } else return c;
    }),
  ];
  return res;
}
