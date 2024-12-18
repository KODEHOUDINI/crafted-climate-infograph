import React, { useRef } from "react";
import { CameraControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useControls } from "leva";
import { or } from "three/tsl";

export function MeterHead(props) {
  const { nodes, materials } = useGLTF("/MeterSet.glb");

  const camControls = useRef();
  const groupRef = useRef();
  const meterHeadRef = useRef();

  const { rotZ } = useControls({
    rotZ: { value: 0.1, min: -Math.PI, max: 0, step: 0.01 },
  });

  const colorchanges = {
    green: -0.5,
    yellow: -1,
    orange: -1.56,
    red: -2.13,
    purple: -2.64,
    wine: -3.14,
  };

  useFrame((_, delta) => {
    easing.damp3(meterHeadRef.current.rotation, [0, 0, rotZ], 0.25, delta);
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
