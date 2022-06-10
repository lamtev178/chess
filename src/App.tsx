import React from "react";
import Board from "./components/Board";
import BoardEnvironment from "./components/BoardEnvironment";

const App = () => {
  return (
    <div className="app">
      <Board />
      <BoardEnvironment />
    </div>
  );
};

export default App;
