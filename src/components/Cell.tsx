import React, { FC } from "react";
import { cell } from "../types/board";
interface CellProps {
  cell: cell;
  color: string;
  active: cell | null;
  onClick: (cell: cell) => void;
}
const Cell: FC<CellProps> = ({ cell, color, active, onClick }) => {
  const img = cell.piece === null ? "" : require(`../pieces/${cell.piece}.png`);
  return (
    <div
      className={
        (color === "white" ? "cell-white " : "cell-dark ") +
        (cell.available && img !== "" ? "attacked" : "") +
        (active?.cell === cell.cell ? " active" : "")
      }
      onClick={() => onClick(cell)}
    >
      {cell.available && img === "" ? <div className="cell-available" /> : null}
      {img === "" ? null : <img draggable src={img} alt={cell.cell} />}
    </div>
  );
};

export default Cell;
