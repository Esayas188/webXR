import React from 'react'
import { useRef } from 'react';
import { Canvas,useFrame,useLoader } from '@react-three/fiber';
import { FirstPersonControls,OrbitControls,useGLTF } from '@react-three/drei';
import { TextureLoader} from 'three';
import { XR, createXRStore } from '@react-three/xr'
// import {
//   GizmoHelper,
//   GizmoViewcube,
//   GizmoViewport,
// } from '@react-three/drei';
function RotatingSphere() {
  const sphereRef = useRef();
  const texture = useLoader(TextureLoader, 'src/assets/earth.jpg');
  const result = useGLTF('/public/model.gltf');
  
  // useFrame can now be used inside this component
  // useFrame(() => {
  //   if (sphereRef.current) {
  //     sphereRef.current.rotation.x += 0.005;
  //     sphereRef.current.rotation.y += 0.005;
  //     sphereRef.current.rotation.z += 0.005;
  //   }
  // });

  return (
    <primitive object={result.scene} />
    // <mesh ref={sphereRef}>
    //   <sphereGeometry args={[2, 80, 80]} />
   
    //   <meshStandardMaterial  map={texture}  />

    //   {/* <meshStandardMaterial color={0x00bfff} wireframe  /> */}
    // </mesh>
  );
}

export default function App() {
  const store = createXRStore()




  return (
    
    <>
    <button onClick={() => store.enterVR()}>Enter VR</button>
    <button onClick={() => store.enterAR()}>Enter AR</button>
    <div>
      
    </div>

    <div id='canvas-container'>
      <Canvas camera={{ position: [2, 5, 1] }}>
        <XR store={store}>
          <axesHelper args={[10]}/>  
          <gridHelper args={[20]} />
          {/* <FirstPersonControls /> */}
          <OrbitControls />
          <RotatingSphere/>
          <ambientLight color={0xffffff} intensity={1} />
          {/* <directionalLight
            position={[4, 2, 3]}
            color={0xffea00}
            intensity={0.8}
          /> */}
          {/* <directionalLight position={[2, 2, 2]} /> */}
          </XR>
      </Canvas>
    </div>
    </>

  )
}
