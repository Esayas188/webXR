
import * as THREE from 'three';

const w = window.innerWidth;
const h = window.innerHeight;
// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

// Set the camera position and look at the center of the scene
camera.position.set(0, 2, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0))

// Add the camera to the scene
scene.add(camera);

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Create a geometry
const geometry = new THREE.IcosahedronGeometry(1.0, 3.0);

// Create a material
const material = new THREE.MeshStandardMaterial({ 
    color: 0x0066ff,
    flatShading: true,
    transparent: true,
    opacity: 1.0
})

// Create a mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Add a light source
const light = new THREE.HemisphereLight(0xffffff, 0xff0000);
scene.add(light);

// Render loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the mesh
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    // Update the renderer
    renderer.render(scene, camera);
}
animate();

// Resize the renderer on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
