import React from "react";
import { MoveCircle } from "./moveCircle";

const Cell = ({
  color,
  position,
  cell,
  onCellSelect,
  availableMoves,
  onFigureMove,
  onPostFigureMove,
}) => {
  return (
    <>
      {availableMoves.map((move, index) =>
        move.to === cell ? (
          <MoveCircle
            key={cell + index + "m"}
            move={move}
            position={position}
            cell={cell}
            onFigureMove={onFigureMove}
            onPostFigureMove={onPostFigureMove}
          />
        ) : null
      )}
      <mesh
        onClick={() => onCellSelect(cell)}
        scale={[1, 1, 0.1]}
        position={[position.x, 0, position.y]}
        rotation={[Math.PI / -2, 0, 0]}
      >
        <meshStandardMaterial roughness={0.1} metalness={0.7} color={color} />
        <boxGeometry />
      </mesh>
    </>
  );
};

export default Cell;
