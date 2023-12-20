import React, { FC } from "react";
import Cell from "./cell";
import { BoardDesk, FigureType } from "../../../store/gameSlice";
import Figure from "../figures/figure";
import { Text } from "@react-three/drei";
import { Chess } from "chess.js";
import $ from "jquery";

const rowNames = ["a", "b", "c", "d", "e", "f", "g", "h"];

const Board = ({
  board,
  figures,
  onCellSelect,
  onPostFigureMove,
  selectedCell,
  availableMoves,
  onFigureMove,
}) => {
  return (
    <group position={[-3.5, 0, 3.5]}>
      {board.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell
              availableMoves={availableMoves}
              onPostFigureMove={onPostFigureMove}
              onFigureMove={onFigureMove}
              onCellSelect={onCellSelect}
              key={rowIndex.toString() + cellIndex.toString()}
              cell={cell}
              color={(cellIndex + rowIndex) % 2 === 0 ? "white" : "black"}
              position={{ x: rowIndex, y: -cellIndex }}
            />
          ))}
        </React.Fragment>
      ))}
      {figures.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((figure, cellIndex) => (
            <Figure
              key={rowIndex.toString() + cellIndex.toString()}
              position={{ x: rowIndex, y: -cellIndex }}
              selected={!!(figure && figure.square === selectedCell)}
              figure={figure}
            />
          ))}
        </React.Fragment>
      ))}
    </group>
  );
};

export default Board;
