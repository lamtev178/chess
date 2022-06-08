import React, { DragEvent, FC, MouseEvent } from "react";
import { cell } from "../types/board";
import { pieces } from "../types/pieces";
interface CellProps {
  cell: cell;
  color: string;
  onClick: (cell: cell) => void;
  isKingAttacked: false | pieces.KING_DARK | pieces.KING_WHITE;
  onMouseDown: (
    e: MouseEvent<HTMLImageElement>,
    cell: cell,
    img: string
  ) => void;
  mouseUp: (e: MouseEvent<HTMLDivElement>, cell: cell) => void;
  onMouseLeave: (e: MouseEvent<HTMLDivElement>) => void;
  onMouseOver: (e: MouseEvent<HTMLDivElement>, cell: cell) => void;
}
const Cell: FC<CellProps> = ({
  cell,
  color,
  onClick,
  isKingAttacked,
  onMouseDown,
  mouseUp,
  onMouseLeave,
  onMouseOver,
}) => {
  const img = cell.piece === null ? "" : require(`../pieces/${cell.piece}.png`);
  return (
    <div
      onMouseUp={(e: MouseEvent<HTMLDivElement>) => mouseUp(e, cell)}
      onMouseLeave={(e: MouseEvent<HTMLDivElement>) => onMouseLeave(e)}
      onMouseOver={(e: MouseEvent<HTMLDivElement>) => onMouseOver(e, cell)}
      onDragStart={(e) => e.preventDefault()}
      id={cell.cell}
      className={
        (color === "white" ? "cell-white " : "cell-dark ") +
        (cell.available && img !== "" ? "attacked " : "") +
        (cell.piece === isKingAttacked && color === "white"
          ? " kingIsAttacked-white"
          : "") +
        (cell.piece === isKingAttacked && color !== "white"
          ? " kingIsAttacked-dark"
          : "") +
        (cell.available && img === "" ? " cell-available" : "")
      }
      onClick={() => onClick(cell)}
    >
      {cell.cell === "a1" ? <div id="secret" /> : null}
      {img === "" ? null : (
        <img
          onMouseDown={(e: MouseEvent<HTMLImageElement>) => {
            onMouseDown(e, cell, img);
          }}
          src={img}
          alt={cell.cell}
        />
      )}
    </div>
  );
};

export default Cell;
