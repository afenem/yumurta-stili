import * as THREE from 'three';

const material = (color, roughness = 1) => new THREE.MeshStandardMaterial({ color, roughness });

export function addDesertGround(scene, { size = 120, color = '#c9a36d' } = {}) {
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(size, size), material(color));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -.04; ground.receiveShadow = true; scene.add(ground);
  return ground;
}

export function addMudBrickFort(scene, { position = [0, 0, -13], width = 23, height = 8, color = '#a96536' } = {}) {
  const group = new THREE.Group(); group.position.set(...position);
  const wallMat = material(color), dark = material('#573923'), cap = material('#c4874f');
  const wall = new THREE.Mesh(new THREE.BoxGeometry(width, height, 1.25), wallMat);
  wall.position.y = height / 2; wall.castShadow = true; wall.receiveShadow = true; group.add(wall);
  const gate = new THREE.Mesh(new THREE.BoxGeometry(3.4, 4.4, .16), dark);
  gate.position.set(0, 2.2, .68); group.add(gate);
  const arch = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, .18, 32, 1, false, 0, Math.PI), cap);
  arch.rotation.z = Math.PI / 2; arch.position.set(0, 4.35, .7); group.add(arch);
  for (let x = -width / 2 + 1; x <= width / 2 - 1; x += 2.4) {
    const merlon = new THREE.Mesh(new THREE.BoxGeometry(.85, .8, 1.5), cap);
    merlon.position.set(x, height + .4, 0); merlon.castShadow = true; group.add(merlon);
    const slit = new THREE.Mesh(new THREE.BoxGeometry(.16, 1.2, .08), dark);
    slit.position.set(x, height - 1.4, .66); group.add(slit);
  }
  scene.add(group); return group;
}

export function addPalm(scene, x, z, height = 5.5) {
  const group = new THREE.Group(); group.position.set(x, 0, z);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.18, .32, height, 10), material('#76502e'));
  trunk.position.y = height / 2; trunk.castShadow = true; group.add(trunk);
  const leafMat = material('#4e6840');
  for (let i = 0; i < 9; i++) {
    const a = i / 9 * Math.PI * 2, leaf = new THREE.Mesh(new THREE.ConeGeometry(.18, height * .48, 5), leafMat);
    leaf.position.set(Math.cos(a) * 1.0, height + .35, Math.sin(a) * 1.0);
    leaf.rotation.z = Math.cos(a) * -.9; leaf.rotation.x = Math.sin(a) * .9; leaf.castShadow = true; group.add(leaf);
  }
  scene.add(group); return group;
}

export function addTent(scene, position = [-6, 0, 3], color = '#8b6b49') {
  const group = new THREE.Group(); group.position.set(...position);
  const cloth = new THREE.Mesh(new THREE.ConeGeometry(3.5, 3.3, 4, 1, true), new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide, roughness: 1 }));
  cloth.position.y = 1.65; cloth.rotation.y = Math.PI / 4; cloth.castShadow = true; group.add(cloth);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(.07, .07, 3.4, 8), material('#513a28'));
  pole.position.y = 1.7; group.add(pole);
  scene.add(group); return group;
}
