import React from "react";
import { Box, Cylinder, Sphere } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";

export const MoveCircle = ({
  cell,
  position,
  onFigureMove,
  onPostFigureMove,
  move,
}) => {
  const onMoveClick = (event) => {
    // console.log("onFigureMove", position, cell, onFigureMove, move);
    event.stopPropagation();
    onFigureMove(cell);
    onPostFigureMove(cell);
  };

  return (
    <Box
      onClick={(event) => onMoveClick(event)}
      scale={[0.9, 0.1, 0.9]}
      position={[position.x, 0.01, position.y]}
    >
      <meshStandardMaterial
        transparent={true}
        opacity={0.8}
        roughness={0.1}
        metalness={0.7}
        color={move.flags.includes("c") ? "red" : "green"}
      />
    </Box>
  );
};
