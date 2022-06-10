import { FC } from "react";
import { useActoins } from "../hooks/useActions";
import { GameStatus } from "../types/board";
const BoardEnvironment: FC = () => {
  const { resign } = useActoins();
  return (
    <div className="BoardEnvironment">
      <button
        className="BoardEnvironment__btn btn"
        onClick={() =>
          resign(
            localStorage.color === "white"
              ? GameStatus.DARK_IS_WIN
              : GameStatus.WHITE_IS_WIN
          )
        }
      >
        Resign
      </button>
    </div>
  );
};

export default BoardEnvironment;
