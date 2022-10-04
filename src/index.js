// Import Threejs.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



// Scene.
var camera, scene, renderer, light, cube;
var orbitControls;

function init() {

  // Camera.
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 2000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 500);

  const canvas = document.querySelector('#c');
  renderer = new THREE.WebGLRenderer( { canvas } );
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  window.addEventListener('resize', onWindowResize, false);

  // Orbit controls.
  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enablePan = true;
  orbitControls.enableKeys = false;
  orbitControls.update();
  orbitControls.addEventListener('change', render);

  // Adding orbit controls to camera (expected by AMI image widgets).
  camera.controls = orbitControls;

  // Scene.
  scene = new THREE.Scene();

  // Lights.
  light = new THREE.PointLight(0xffffff, 1.5);
  light.position.set(-600, 600, 1000);
  scene.add(light);


  // Cube
  var geometry = new THREE.BoxGeometry(50, 50, 50);
  var material = new THREE.MeshBasicMaterial(
    { color: "blue" }
  )
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

}

// Draw Scene
function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  render()
}

// start scene
init();
render();