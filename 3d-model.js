// 3D Model for product visualization
document.addEventListener('DOMContentLoaded', () => {
  // Check if Three.js is loaded and if we're on a page with the 3D model
  if (window.THREE && document.getElementById('product-model')) {
    initProductModel();
  } else {
    // Create a fallback if Three.js isn't available
    createImageFallback();
  }
});

function initProductModel() {
  // Get the container
  const container = document.getElementById('product-model');
  const containerRect = container.getBoundingClientRect();
  
  // Set up scene
  const scene = new THREE.Scene();
  
  // Set up camera
  const camera = new THREE.PerspectiveCamera(75, containerRect.width / containerRect.height, 0.1, 1000);
  camera.position.z = 5;
  
  // Set up renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(containerRect.width, containerRect.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);
  
  const pointLight1 = new THREE.PointLight(0x00d4ff, 2, 10);
  pointLight1.position.set(2, 2, 2);
  scene.add(pointLight1);
  
  const pointLight2 = new THREE.PointLight(0x7928ca, 2, 10);
  pointLight2.position.set(-2, -2, 2);
  scene.add(pointLight2);
  
  // Create a simple box model (in production, you'd load a detailed 3D model)
  const geometry = new THREE.BoxGeometry(2, 3, 1);
  
  // Create materials for each side with different colors
  const materials = [
    new THREE.MeshPhongMaterial({ color: 0x1a1a30, shininess: 100 }),  // Right
    new THREE.MeshPhongMaterial({ color: 0x1a1a30, shininess: 100 }),  // Left
    new THREE.MeshPhongMaterial({ color: 0x7928ca, shininess: 100 }),  // Top
    new THREE.MeshPhongMaterial({ color: 0x1a1a30, shininess: 100 }),  // Bottom
    new THREE.MeshPhongMaterial({ color: 0x00d4ff, shininess: 100 }),  // Front
    new THREE.MeshPhongMaterial({ color: 0x1a1a30, shininess: 100 }),  // Back
  ];
  
  // Create the cube with the materials
  const cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);
  
  // Add text to the box (brand name)
  const loader = new THREE.TextureLoader();
  
  // Create a canvas to draw text
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 512;
  canvas.height = 512;
  
  // Draw background
  context.fillStyle = '#00d4ff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw text
  context.font = 'bold 48px Montserrat';
  context.fillStyle = '#ffffff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText('NUTRITION', canvas.width / 2, canvas.height / 2 - 30);
  context.fillText('EXPRESS', canvas.width / 2, canvas.height / 2 + 30);
  
  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  
  // Replace front face material with the texture
  materials[4] = new THREE.MeshPhongMaterial({ map: texture, shininess: 100 });
  cube.material = materials;
  
  // Add animation
  function animate() {
    requestAnimationFrame(animate);
    
    // Gentle rotation
    cube.rotation.y += 0.005;
    cube.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
    
    renderer.render(scene, camera);
  }
  animate();
  
  // Resize handler
  window.addEventListener('resize', () => {
    const newRect = container.getBoundingClientRect();
    camera.aspect = newRect.width / newRect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(newRect.width, newRect.height);
  });
}

// Fallback to image if Three.js isn't available
function createImageFallback() {
  const container = document.getElementById('product-model');
  if (!container) return;
  
  // Clear the container
  container.innerHTML = '';
  
  // Create a stylish product image
  const image = document.createElement('img');
  image.src = 'https://images.pexels.com/photos/3621181/pexels-photo-3621181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  image.alt = 'Nutrition Express Creatine';
  image.style.width = '100%';
  image.style.height = '100%';
  image.style.objectFit = 'contain';
  image.style.transform = 'rotateY(20deg) rotateX(10deg)';
  image.style.transition = 'transform 0.5s ease';
  image.classList.add('float-animation');
  
  container.appendChild(image);
  
  // Add hover effect
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    
    image.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  });
}