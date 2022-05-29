import { cell } from "../../types/board";
import { potentialBoard } from "./board";
import { isKingAttacked } from "./king";

export function knight(
  board: cell[],
  cell: cell,
  color: "WHITE" | "DARK"
): string[] {
  let res: string[] = [];
  res = [
    ...board.map((c) => {
      const plusOneLines: boolean =
        c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) + 1) ||
        c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) - 1);
      const plusTwoLines: boolean =
        c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) + 2) ||
        c.cell[0] === String.fromCharCode(cell.cell[0].charCodeAt(0) - 2);
      const plusTwoNums: boolean =
        c.cell[1] === +cell.cell[1] + 2 + "" ||
        c.cell[1] === +cell.cell[1] - 2 + "";
      const plusOneNums: boolean =
        c.cell[1] === +cell.cell[1] + 1 + "" ||
        c.cell[1] === +cell.cell[1] - 1 + "";
      const isColor: boolean = c.piece?.split("_")[1] !== color;
      if (plusOneLines && plusTwoNums && isColor) return c.cell;
      else if (plusOneLines && plusTwoNums && isColor) return c.cell;
      else if (plusTwoLines && plusOneNums && isColor) return c.cell;
      else if (plusTwoLines && plusOneNums && isColor) return c.cell;
      else return "";
    }),
  ];
  return res;
}
export function knightMove(
  cell: cell,
  board: cell[],
  color: "WHITE" | "DARK",
  whiteKingPos: cell,
  darkKingPos: cell
): cell[] {
  let res: cell[] = [];
  const resArr: string[] = knight(board, cell, color);
  res = [
    ...board.map((c) => {
      if (
        resArr.indexOf(c.cell) !== -1 &&
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
