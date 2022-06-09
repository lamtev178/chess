import React, { FC, LegacyRef, MouseEvent } from "react";
import { cell } from "../types/board";
import { pieces } from "../types/pieces";
interface CellProps {
  cell: cell;
  formerCell: cell | null;
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
  drag: string | boolean;
  imgDrag: null | LegacyRef<HTMLImageElement>;
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
  drag,
  imgDrag,
  formerCell,
}) => {
  const img = cell.piece === null ? "" : require(`../pieces/${cell.piece}.png`);
  return (
    <div
      onMouseUp={(e: MouseEvent<HTMLDivElement>) => mouseUp(e, cell)}
      onMouseLeave={(e: MouseEvent<HTMLDivElement>) => onMouseLeave(e)}
      onMouseOver={(e: MouseEvent<HTMLDivElement>) => onMouseOver(e, cell)}
      onDragStart={(e) => e.preventDefault()}
      className={
        (color === "white" ? "cell-white " : "cell-dark ") +
        (formerCell !== null && formerCell!.cell === cell.cell
          ? " active"
          : "") +
        (formerCell !== null && formerCell!.cell === cell.cell && drag !== false
          ? " draggble"
          : "") +
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
      {cell.cell === "a1" ? (
        <div>
          {typeof drag === "string" ? (
            <img src={drag} alt={drag} ref={imgDrag} id="draggbleImg" />
          ) : null}
        </div>
      ) : null}
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
