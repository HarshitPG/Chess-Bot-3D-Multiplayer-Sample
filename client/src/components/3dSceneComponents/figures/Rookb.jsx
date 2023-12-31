/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.5 public/models/rookb.glb
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Rook({ position, color, selected }) {
  const { nodes, materials } = useGLTF("models/rookb.glb");
  return (
    <group position={[position.x, 0.45, position.y]} scale={[0.3, 0.3, 0.3]}>
      <mesh
        geometry={nodes.Black_rook.geometry}
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

useGLTF.preload("models/rookb.glb");
