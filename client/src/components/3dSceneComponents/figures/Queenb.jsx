/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.5 public/models/queenb.glb
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Queen({ position, color, selected }) {
  const { nodes, materials } = useGLTF("models/queenb.glb");
  return (
    <group position={[position.x, 0.65, position.y]} scale={[0.3, 0.3, 0.3]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Black_queen.geometry}
        material={materials["Material.001"]}
      >
        <meshStandardMaterial
          roughness={0.1}
          metalness={0.7}
          color={selected ? "green" : color === "w" ? "white" : "black"}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("models/queenb.glb");
