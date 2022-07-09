import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Adding Objects

//1. Geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// 2. Material
const material = new THREE.MeshStandardMaterial({
  color: 0x8A9A5B,
  // wireframe: true,
});

// 3. Mesh
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);
// renderer.render(scene, camera);

// Add Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffcccb);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 3);
// scene.add(lightHelper, gridHelper);

//Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Random Star Generation
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  // Using random float spread defining the x,y and z values of stars
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);
// Background

const spaceTexture = new THREE.TextureLoader().load("background.jpeg");
scene.background = spaceTexture;

// Add Avatar
const ammarTexture = new THREE.TextureLoader().load("ammar2.jpg");

const ammar = new THREE.Mesh(
  new THREE.BoxGeometry(4, 3, 3),
  new THREE.MeshBasicMaterial({ map: ammarTexture })
);
scene.add(ammar);

// Adding Moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

ammar.position.z = -5;
ammar.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.001;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.001;

  ammar.rotation.y += 0.01;
  ammar.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


//Animate the scene
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.001;

  controls.update();
  renderer.render(scene, camera);
}

animate();