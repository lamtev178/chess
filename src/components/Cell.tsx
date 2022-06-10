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
    <>
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
          (formerCell !== null && formerCell!.cell === cell.cell && drag
            ? " draggble"
            : "") +
          (cell.available && img !== "" ? "attacked " : "") +
          (cell.piece === isKingAttacked && color === "white"
            ? " kingIsAttacked-white"
            : "") +
          (cell.piece === isKingAttacked && color !== "white"
            ? " kingIsAttacked-dark"
            : "") +
          (cell.available && img === "" ? " cell-available" : "") +
          (drag && color === "white" ? " cell-white-before" : "") +
          (drag && color === "dark" ? " cell-dark-before" : "")
        }
        onClick={() => onClick(cell)}
      >
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
      {cell.cell === "a1" ? (
        <div
          className="cell-white secret"
          onMouseUp={(e: MouseEvent<HTMLDivElement>) => mouseUp(e, cell)}
          onMouseLeave={(e: MouseEvent<HTMLDivElement>) => onMouseLeave(e)}
          onMouseOver={(e: MouseEvent<HTMLDivElement>) => onMouseOver(e, cell)}
          onDragStart={(e) => e.preventDefault()}
        >
          {typeof drag === "string" ? (
            <img
              onMouseDown={(e: MouseEvent<HTMLImageElement>) => {
                onMouseDown(e, cell, img);
              }}
              src={drag}
              alt={drag}
              ref={imgDrag}
              className="draggbleImg"
            />
          ) : (
            <></>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Cell;
