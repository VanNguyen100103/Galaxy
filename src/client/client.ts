import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
const canvas = document.getElementById('c1') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const objects: any[] = [];
const solarSystem = new THREE.Object3D();
scene.add(solarSystem); // Thêm dòng này để thêm solarSystem vào cảnh
objects.push(solarSystem);

const sunGeometry = new THREE.IcosahedronGeometry(6, 2);
const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.scale.set(5, 5, 5);
solarSystem.add(sun); // Thêm Mặt Trời vào hệ thống Mặt Trời, không phải trực tiếp vào cảnh
objects.push(sun);

const earthGeometry = new THREE.IcosahedronGeometry(2, 2);
const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233FF, emissive: 0x112244 });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.x = 10;
solarSystem.add(earth); // Thêm Trái Đất vào hệ thống Mặt Trời
objects.push(earth);
sun.add(earth)

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

new OrbitControls(camera, renderer.domElement);

function render() {
    renderer.render(scene, camera);
}

function animate(time: any) {
    requestAnimationFrame(animate);
    time *= 0.001; // Chuyển thời gian từ milliseconds sang seconds
    
    objects.forEach((obj : any)=>{
        obj.rotation.y = time;
    })

    render();
}

animate(0.4)
