import { cell } from "../../types/board";
import { potentialBoard } from "./board";
import { isKingAttacked } from "./king";

export function pawnMove(
  cell: cell,
  board: cell[],
  color: "WHITE" | "DARK",
  whiteKingPos: cell,
  darkKingPos: cell
): cell[] {
  let res: cell[] = [];
  let pawnArr = pawn(board, cell, color);
  res = [
    ...board.map((c) => {
      if (
        pawnArr.indexOf(c.cell) !== -1 &&
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
export function pawn(
  board: cell[],
  cell: cell,
  color: "WHITE" | "DARK"
): string[] {
  let res = [];
  const line = cell.cell[0];
  res = [
    ...board.map((c) => {
      const cLine = c.cell[0];
      const oneLine = cLine === line;
      const cNum = c.cell[1];
      const nextNum = +cell.cell[1] + (color === "WHITE" ? +1 : -1) + "";
      const adjacentLinesLeft: string = String.fromCharCode(
        line.charCodeAt(0) - 1
      );
      const adjacentLinesRight: string = String.fromCharCode(
        line.charCodeAt(0) + 1
      );
      const pieceColor =
        c.piece?.split("_")[1] === (color === "WHITE" ? "DARK" : "WHITE");
      const isPeceLeft = c.cell === adjacentLinesLeft + nextNum && pieceColor;
      const isPeceRight = c.cell === adjacentLinesRight + nextNum && pieceColor;
      let canPushOnThirdNum = false;
      let canPushOnFourthNum = false;
      if (cell.cell[1] === "7" && color === "DARK") {
        canPushOnThirdNum = cNum === "6" && c.piece === null;
        canPushOnFourthNum =
          cNum === "5" &&
          c.piece === null &&
          [
            ...board.filter(
              (c) =>
                c.cell[0] === cLine && c.cell[1] === "6" && c.piece !== null
            ),
          ].length !== 1;
      }
      if (cell.cell[1] === "2" && color === "WHITE") {
        canPushOnThirdNum = cNum === "3" && c.piece === null;
        canPushOnFourthNum =
          cNum === "4" &&
          c.piece === null &&
          [
            ...board.filter(
              (c) =>
                c.cell[0] === cLine && c.cell[1] === "3" && c.piece !== null
            ),
          ].length !== 1;
      }
      const canPushPawn = oneLine && cNum === nextNum && c.piece === null;
      const canPushPawnFromTwo =
        oneLine && (canPushOnThirdNum || canPushOnFourthNum);
      if (canPushPawn || isPeceLeft || isPeceRight || canPushPawnFromTwo)
        return c.cell;
      return "";
    }),
  ];
  return res;
}
