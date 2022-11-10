import * as THREE from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js'

console.log(THREE);

//THREE scene
const scene = new THREE.Scene(); //THREE.Scene() = a class

//THREE camera
//the numbers are the camera perspective
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);

//takes scene and camera and renders a picture with them
const renderer = new THREE.WebGLRenderer()

//setting size of the renderer
renderer.setSize(window.innerWidth, window.innerHeight);

//adding renderer canvas to the document
document.body.appendChild(renderer.domElement);

const loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'/models/maze.obj',
    
	// called when resource is loaded
	function ( object ) {
        const material = new THREE.MeshPhysicalMaterial({
        color: 0x0ff0f0,
        roughness: 1
     });
        for (const child of object.children)
        {
            child.material = material;
        }
        console.log(object),
      //  requestAnimationFrame(object);
	    scene.add(object);
	},
);

const ambient = new THREE.AmbientLight(0xffffff, .8);
scene.add(ambient);
const directional = new THREE.DirectionalLight(0xfffffff, 0.7);
directional.position.x = 7;
directional.position.y = 14;
scene.add(directional);

//need something to render


// //creating a cube with a geometry, material, and mesh
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshPhysicalMaterial({
//     color: 0x0fff00,
//     roughness: 0.5
// });
// const cube = new THREE.Mesh(geometry, material);

// //used to add anything to the scene
// scene.add(cube);



//changing the cameras position because both the cube and camera are currently set at the same position
camera.position.z = 400;


function loop() {
    //adding an animation to the cube
    
    // object.rotation.x += 0.01;
    // object.rotation.y += 0.01;


    //render scene
    renderer.render(scene, camera);
    //make it a loop
    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
