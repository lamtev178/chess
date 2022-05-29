import React, { FC } from "react";
import { cell } from "../types/board";
import { pieces } from "../types/pieces";
interface CellProps {
  cell: cell;
  color: string;
  active: cell | null;
  onClick: (cell: cell) => void;
  isKingAttacked: false | pieces.KING_DARK | pieces.KING_WHITE;
}
const Cell: FC<CellProps> = ({
  cell,
  color,
  active,
  onClick,
  isKingAttacked,
}) => {
  const img = cell.piece === null ? "" : require(`../pieces/${cell.piece}.png`);
  return (
    <div
      className={
        (color === "white" ? "cell-white " : "cell-dark ") +
        (cell.available && img !== "" ? "attacked " : "") +
        (active?.cell === cell.cell ? " active " : "") +
        (cell.piece === isKingAttacked && color === "white"
          ? " kingIsAttacked-white"
          : "") +
        (cell.piece === isKingAttacked && color !== "white"
          ? " kingIsAttacked-dark"
          : "") +
        (cell.piece === isKingAttacked && active?.cell === cell.cell
          ? " kingIsAttacked-active"
          : "")
      }
      onClick={() => onClick(cell)}
    >
      {cell.available && img === "" ? <div className="cell-available" /> : null}
      {img === "" ? null : <img draggable src={img} alt={cell.cell} />}
    </div>
  );
};

export default Cell;
