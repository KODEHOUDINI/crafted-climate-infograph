import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { useSnapshot } from "valtio";
import { craftedClimateState } from "../../store";

const Experience = () => {
  const snap = useSnapshot(craftedClimateState);
  return (
    <div className="flex-1">
      <Canvas>
        <color attach="background" args={[snap.climateColor]} />
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Experience;
