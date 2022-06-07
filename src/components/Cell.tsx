import React, { DragEvent, FC } from "react";
import { cell } from "../types/board";
import { pieces } from "../types/pieces";
interface CellProps {
  cell: cell;
  color: string;
  active: cell | null;
  onClick: (cell: cell) => void;
  isKingAttacked: false | pieces.KING_DARK | pieces.KING_WHITE;
  onDragStart: (e: DragEvent<HTMLImageElement>, cell: cell) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLImageElement>) => void;
  onDragLeave: (e: DragEvent<HTMLImageElement>) => void;
}
const Cell: FC<CellProps> = ({
  cell,
  color,
  active,
  onClick,
  isKingAttacked,
  onDragStart,
  onDragOver,
  onDrop,
  onDragLeave,
}) => {
  const img = cell.piece === null ? "" : require(`../pieces/${cell.piece}.png`);
  return (
    <div
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
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
          : "") +
        (cell.available && img === "" ? " cell-available" : "")
      }
      onClick={() => onClick(cell)}
    >
      {img === "" ? null : (
        <img
          onDragStart={(e) => onDragStart(e, cell)}
          draggable
          src={img}
          alt={cell.cell}
        />
      )}
    </div>
  );
};

export default Cell;
