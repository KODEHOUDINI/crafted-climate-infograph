import React, { useRef } from "react";
import { CameraControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useControls } from "leva";
import { craftedClimateState } from "../../store";

export function MeterHead(props) {
  const { nodes, materials } = useGLTF("/MeterSet.glb");

  const camControls = useRef();
  const groupRef = useRef();
  const meterHeadRef = useRef();

  const { rotZ, apiVal } = useControls({
    apiVal: { value: 1, min: 1, max: 500, step: 1 },
  });

  const colorchanges = {
    green: -0.5,
    yellow: -1,
    orange: -1.56,
    red: -2.13,
    purple: -2.64,
    maroon: -3.14,
  };

  // Define the color change points in radians
  const colorPoints = [
    { color: "green", value: colorchanges.green },
    { color: "yellow", value: colorchanges.yellow },
    { color: "orange", value: colorchanges.orange },
    { color: "red", value: colorchanges.red },
    { color: "purple", value: colorchanges.purple },
    { color: "maroon", value: colorchanges.maroon },
  ];

  // Function to map the API value to a rotation value (radians)
  const mapValueToRotation = (apiValue) => {
    const maxApiValue = 500;

    // The full rotation range spans from 0 to 3.14 radians (as per your color changes)
    const totalRadianRange = 3.14; // FIX: Define the full range of radians

    // Calculate the scaled rotation value for the API value
    const scaledRadian = (apiValue / maxApiValue) * totalRadianRange; // FIX: Scale to 0 to 3.14 radians

    return -scaledRadian; // FIX: Returns rotation in radians from 0 to 3.14
  };

  const rotationValue = mapValueToRotation(apiVal);

  const getColorForRotation = (rotZ) => {
    if (rotZ >= colorchanges.green) return "green";
    if (rotZ >= colorchanges.yellow) return "yellow";
    if (rotZ >= colorchanges.orange) return "orange";
    if (rotZ >= colorchanges.red) return "red";
    if (rotZ >= colorchanges.purple) return "purple";
    if (rotZ >= colorchanges.maroon) return "maroon";
    return "green";
  };

  useFrame((_, delta) => {
    // easing.damp3(meterHeadRef.current.rotation, [0, 0, rotZ], 0.25, delta);
    easing.damp3(meterHeadRef.current.rotation, [0, 0, rotationValue], 0.25, delta);

    const color = getColorForRotation(rotationValue);
    craftedClimateState.climateColor = color;

    easing.dampC(meterHeadRef.current.material.color, color, 0.25, delta);

    camControls.current.fitToBox(groupRef.current, true, {
      paddingLeft: 0.3,
      paddingRight: 0.3,
      paddingBottom: 0.3,
      paddingTop: 0.3,
    });
  });

  return (
    <>
      <CameraControls
        azimuthRotateSpeed={0.6}
        mouseButtons={{ left: 0, middle: 0, right: 0, wheel: 0 }}
        touches={{ one: 0, three: 0, two: 0 }}
        smoothTime={0.85}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        ref={camControls}
      />
      <group {...props} dispose={null}>
        <group ref={groupRef} position={[0, 0.01, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Readings_1.geometry}
            material={materials.Good}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Readings_2.geometry}
            material={materials.Moderate}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Readings_3.geometry}
            material={materials.Hazardous}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Readings_4.geometry}
            material={materials["Very Unhealthy"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Readings_5.geometry}
            material={materials.Unhealthy}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Readings_6.geometry}
            material={materials["Unhealthy For Sensitive Goups"]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.MeterHead.geometry}
          material={materials["Meter Reader"]}
          position={[0, 0.01, 0.047]}
          ref={meterHeadRef}
        />
      </group>
    </>
  );
}

useGLTF.preload("/MeterSet.glb");
