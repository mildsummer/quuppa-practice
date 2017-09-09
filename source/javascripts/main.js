import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import TWEEN from '@tweenjs/tween.js';
import rawData from '../data/basketball.csv';

const data = [];
rawData.split(/\n/).forEach((line) => {
  let lineData = line.split('#')[0];
  if (lineData) {
    lineData = lineData.split(',');
    data.push({
      time: lineData[0] * 1,
      x: lineData[4] * 1,
      y: lineData[5] * 1,
      z: lineData[6] * 1,
      xv: lineData[7] * 1,
      yv: lineData[8] * 1,
      zv: lineData[9] * 1
    });
  }
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

const geometry = new THREE.SphereGeometry(0.1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.x = 0;
sphere.position.y = 0;
sphere.position.z = 0;
scene.add(sphere);

const xLineGeometry = new THREE.Geometry();
xLineGeometry.vertices.push(new THREE.Vector3(-10, 0, 0));
xLineGeometry.vertices.push(new THREE.Vector3(10, 0, 0));
scene.add(new THREE.Line(xLineGeometry, new THREE.LineBasicMaterial({ color: 0xffffff })));
const yLineGeometry = new THREE.Geometry();
yLineGeometry.vertices.push(new THREE.Vector3(0, -10, 0));
yLineGeometry.vertices.push(new THREE.Vector3(0, 10, 0));
scene.add(new THREE.Line(yLineGeometry, new THREE.LineBasicMaterial({ color: 0xffffff })));
const zLineGeometry = new THREE.Geometry();
zLineGeometry.vertices.push(new THREE.Vector3(0, 0, -10));
zLineGeometry.vertices.push(new THREE.Vector3(0, 0, 10));
scene.add(new THREE.Line(zLineGeometry, new THREE.LineBasicMaterial({ color: 0xffffff })));
scene.add(new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    opacity: 0.5,
    transparent: true
  })
));

camera.position.z = 5;

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
  renderer.render(scene, camera);
}

requestAnimationFrame(animate);

let index = 0;
let current = data[index];
let next = data[index + 1];
const coords = {
  x: current.x,
  y: current.y,
  z: current.z,
  position: 0
};
const tween = new TWEEN.Tween(coords)
  .onUpdate(() => {
    sphere.position.x = coords.x / 10;
    sphere.position.y = coords.y / 10;
    sphere.position.z = coords.z / 10;
    if (coords.position === 1 || coords.position === 0) {
      index += 1;
      current = next;
      next = data[index + 1];
      if (!next) {
        index = 0;
        current = data[0];
        next = data[1];
      }
      tween.to({
        x: next.x,
        y: next.y,
        z: next.z,
        position: coords.position === 1 ? 0 : 1
      }, (next.time - current.time) * 0.1)
        .start();
    }
  });

tween.to({ x: next.x, y: next.y, z: next.z, position: 1 }, (next.time - current.time) * 0.1)
  .start();
