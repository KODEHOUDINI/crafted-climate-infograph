import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { useSnapshot } from "valtio";
import { craftedClimateState } from "../../store";
import { MeterHead } from "./MeterHead";

const Experience = () => {
  const snap = useSnapshot(craftedClimateState);
  return (
    <div className="flex-1">
      <Canvas camera={{ fov: 40 }}>
        <color attach="background" args={["#ffffff"]} />
        <MeterHead />
        <Environment preset="city" environmentIntensity={2} />
      </Canvas>
    </div>
  );
};

export default Experience;
