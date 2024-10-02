import React from 'react'
import { useRef,useState,useEffect } from 'react';
import { Canvas,useFrame,useLoader } from '@react-three/fiber';
import { ScrollControls,Scroll, FirstPersonControls,OrbitControls,useGLTF } from '@react-three/drei';
import { TextureLoader} from 'three';
import { ARButton,XRButton,XR, createXRStore, VRButton } from '@react-three/xr'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { AnimationMixer } from 'three';

function Avatar({ selectedAvatarPath,animationPath, ...props }) {
  const [model, setModel] = useState(null);
  const [mixer, setMixer] = useState(null);

  // useEffect(() => {
  //   const loader = new GLTFLoader();
  //   const fbxLoader = new FBXLoader();

  //   loader.load(selectedAvatarPath, (gltf) => {
  //     setModel(gltf.scene);
  //   });
  //  // Load the animation 
  //  fbxLoader.load(animationPath, (fbx) => {
  //   if (fbx.animations && model) {
  //     const mixer = new AnimationMixer(model); // Create mixer for the GLTF model
  //     const action = mixer.clipAction(fbx.animations[0]); // Use the first animation clip
  //     console.log('this is action: ',action)

  //     console.log('this is animation:', fbx.animations[0]); // Log animation clip for debugging

  //     action.play(); // Play the animation
  //     setMixer(mixer); // Set mixer to use in the frame update
  //   } else {
  //     console.error('No animations found in the FBX file or model not loaded.');
  //   }
  // });

  //   return () => {
  //     // Clean up the model and mixer when component unmounts
  //     if (model) {
  //       model.traverse((child) => {
  //         if (child.isMesh) {
  //           child.geometry.dispose();
  //           child.material.dispose();
  //         }
  //       });
  //       setModel(null);
  //     }
  //   };
  // }, [selectedAvatarPath,animationPath,model]);

  useEffect(() => {
    const loader = new GLTFLoader();
  
    loader.load(selectedAvatarPath, (gltf) => {
      setModel(gltf.scene);
    });
  
    return () => {
      // Clean up model
      if (model) {
        model.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            child.material.dispose();
          }
        });
        setModel(null);
      }
    };
  }, [selectedAvatarPath]);
  
  useEffect(() => {
    if (model) {
      const fbxLoader = new FBXLoader();
      fbxLoader.load(animationPath, (fbx) => {
        if (fbx.animations.length) {
          const mixer = new AnimationMixer(model);
          const action = mixer.clipAction(fbx.animations[0]);
          action.play();
          setMixer(mixer);
        }
      });
    }
  }, [model, animationPath]);
  
  useFrame((state, delta) => {
    if (mixer) mixer.update(delta);
    if (model) {
      model.position.set(0, -1, 0);
    }
  });


  return model ? <primitive object={model} /> : null;
}

export default function App() {
  const store = createXRStore()

  const avatarPaths = [
    '/1st.glb',
    '/2nd.glb',
    '/3rd.glb',
  ];

  const animationPath = [
    '/animations/Standing.fbx',
    '/animations/Dancing.fbx'
  ];

  const [selectedanimationPath, setSelectedanimationPath] = useState(animationPath[0]);
  const [selectedAvatarPath, setSelectedAvatarPath] = useState(avatarPaths[0]);

  console.log("this is avatar path: ",selectedAvatarPath)
  const handleAvatarSelect = (newAvatarPath) => {
    setSelectedAvatarPath(newAvatarPath);
  };
  const handleAnimationSelect = (newAnimationPath) => {
    setSelectedanimationPath(newAnimationPath);
  };

  return (
    
    <>

    <button onClick={() => store.enterVR()}>Enter VR</button>
    <button onClick={() => store.enterAR()}>Enter AR</button>
    <div>
      
    </div>

    <div id='canvas-container'>
      <Canvas camera={{ position: [0, 0.5,1.7] }}>
        <XR store={store}>
          {/* <axesHelper args={[10]}/>   */}
          <gridHelper args={[20]} />
          {/* <FirstPersonControls /> */}
          <OrbitControls />
          
          <ScrollControls pages={1} damping={0.1} >
            <Avatar selectedAvatarPath={selectedAvatarPath} animationPath={selectedanimationPath}/>
            <Scroll html>
              <div className='text-white grid grid-cols-2 w-screen h-screen'>
              <div className=' flex flex-col justify-center items-start lg:items-center max-lg:pl-[60px] py-[20%] gap-[30px] '>
                  <p>ANIMATION</p>
                  <div className=' flex  flex-col gap-[20px]'>
    
                    <button className='flex items-center justify-center w-full px-4 py-1 text-sm font-bold leading-6 capitalize duration-100 transform border-2 rounded-sm cursor-pointer border-white focus:ring-4 focus:ring-white focus:ring-opacity-50 focus:outline-none sm:w-auto sm:px-6 border-text  hover:shadow-lg hover:-translate-y-1' onClick={()=> handleAnimationSelect(animationPath[1])}>Dancing</button>
                    <button className='flex items-center justify-center w-full px-4 py-1 text-sm font-bold leading-6 capitalize duration-100 transform border-2 rounded-sm cursor-pointer border-white focus:ring-4 focus:ring-white focus:ring-opacity-50 focus:outline-none sm:w-auto sm:px-6 border-text  hover:shadow-lg hover:-translate-y-1' onClick={()=> handleAnimationSelect(animationPath[0])}>Standing</button>
                   
                  </div>




                </div>
                <div className=' flex flex-col items-center py-[20%] gap-[30px] '>
                  <p>SELECT AVATAR</p>
                  <div className=' flex flex-col gap-[20px]'>
    
                    <button className='flex items-center justify-center w-full px-4 py-1 text-sm font-bold leading-6 capitalize duration-100 transform border-2 rounded-sm cursor-pointer border-white focus:ring-4 focus:ring-white focus:ring-opacity-50 focus:outline-none sm:w-auto sm:px-6 border-text  hover:shadow-lg hover:-translate-y-1' onClick={()=> handleAvatarSelect(avatarPaths[0])}>Avatar1</button>
                    <button className='flex items-center justify-center w-full px-4 py-1 text-sm font-bold leading-6 capitalize duration-100 transform border-2 rounded-sm cursor-pointer border-white focus:ring-4 focus:ring-white focus:ring-opacity-50 focus:outline-none sm:w-auto sm:px-6 border-text  hover:shadow-lg hover:-translate-y-1' onClick={()=> handleAvatarSelect(avatarPaths[1])}>Avatar2</button>
                    <button className=' flex items-center justify-center w-full px-4 py-1 text-sm font-bold leading-6 capitalize duration-100 transform border-2 rounded-sm cursor-pointer border-white focus:ring-4 focus:ring-white focus:ring-opacity-50 focus:outline-none sm:w-auto sm:px-6 border-text  hover:shadow-lg hover:-translate-y-1' onClick={()=> handleAvatarSelect(avatarPaths[2])}>Avatar3</button>
                  </div>




                </div>

              </div>

              </Scroll>
          </ScrollControls>
          <ambientLight color={0xffffff} intensity={4} />
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
