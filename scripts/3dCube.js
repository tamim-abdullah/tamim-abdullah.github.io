// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio set to 1
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true for transparency
renderer.setSize(200, 200); // Container size
document.getElementById('cube-container').appendChild(renderer.domElement);

// Set the scene background to transparent (or change the color as needed)
scene.background = null; // This will make the background transparent

// Create the cube with colored faces
const geometry = new THREE.BoxGeometry();
const materials = [
    new THREE.MeshBasicMaterial({ color: 0x3498db }), // Front face
    new THREE.MeshBasicMaterial({ color: 0xe74c3c }), // Back face
    new THREE.MeshBasicMaterial({ color: 0x2ecc71 }), // Left face
    new THREE.MeshBasicMaterial({ color: 0xf39c12 }), // Right face
    new THREE.MeshBasicMaterial({ color: 0x9b59b6 }), // Top face
    new THREE.MeshBasicMaterial({ color: 0x1abc9c })  // Bottom face
];
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

// Position the camera to look at the cube
camera.position.z = 5; // Move the camera back to see the cube

// Initialize rotation speed
let rotationSpeedX = 0;
let rotationSpeedY = 0;

// Handle wheel scroll event to rotate cube
window.addEventListener('wheel', (event) => {
    // Slow down the speed and allow both up and down scrolling for rotation
    const sensitivity = 0.0005; // Adjust sensitivity for slower rotation
    rotationSpeedX += event.deltaY * sensitivity; // Vertical scroll
    rotationSpeedY += event.deltaX * sensitivity; // Horizontal scroll
});

// Create an animation loop to rotate the cube
function animate() {
    requestAnimationFrame(animate);

    // Update cube rotation based on the rotation speed
    cube.rotation.x += rotationSpeedX;
    cube.rotation.y += rotationSpeedY;

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
