import React from 'react'
import { useRef } from 'react';
import { Canvas,useFrame } from '@react-three/fiber';

function RotatingSphere() {
  const sphereRef = useRef();
  
  // useFrame can now be used inside this component
  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.005;
      sphereRef.current.rotation.y += 0.005;
      sphereRef.current.rotation.z += 0.005;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[2, 30, 30]} />
      <meshStandardMaterial color={0x00bfff} wireframe  />
    </mesh>
  );
}

export default function App() {



  return (
    <div id='canvas-container'>
      <Canvas camera={{ position: [2, 5, 1] }}>
          <RotatingSphere/>

          <directionalLight position={[2, 2, 2]} />
      </Canvas>
    </div>
  )
}
