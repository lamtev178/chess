import { FC } from "react";
import { pieces } from "../types/pieces";
interface ModalProps {
  color: "dark" | "white";
  onClick: (a: pieces) => void;
}
const Modal: FC<ModalProps> = ({ color, onClick }) => {
  const colorToUopper = color === "white" ? "WHITE" : "DARK";
  const BISHOP = require(`../pieces/BISHOP_${colorToUopper}.png`);
  const QUEEN = require(`../pieces/QUEEN_${colorToUopper}.png`);
  const ROOK = require(`../pieces/ROOK_${colorToUopper}.png`);
  const KNIGHT = require(`../pieces/KNIGHT_${colorToUopper}.png`);
  return (
    <>
      <div className="modal">
        {
          <>
            <img
              onClick={() =>
                onClick(
                  colorToUopper === "WHITE"
                    ? pieces.BISHOP_WHITE
                    : pieces.BISHOP_DARK
                )
              }
              src={BISHOP}
              alt={BISHOP}
            />
            <img
              onClick={() =>
                onClick(
                  colorToUopper === "WHITE"
                    ? pieces.QUEEN_WHITE
                    : pieces.QUEEN_DARK
                )
              }
              src={QUEEN}
              alt={QUEEN}
            />
            <img
              onClick={() =>
                onClick(
                  colorToUopper === "WHITE"
                    ? pieces.ROOK_WHITE
                    : pieces.ROOK_DARK
                )
              }
              src={ROOK}
              alt={ROOK}
            />
            <img
              onClick={() =>
                onClick(
                  colorToUopper === "WHITE"
                    ? pieces.KNIGHT_WHITE
                    : pieces.KNIGHT_DARK
                )
              }
              src={KNIGHT}
              alt={KNIGHT}
            />
          </>
        }
      </div>
      <div className="modal-back" />
    </>
  );
};

export default Modal;
