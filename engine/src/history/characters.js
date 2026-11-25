import * as THREE from 'three';
import { assertHistoryCharacterSpec } from './policy.js';

const mat = (color, roughness = .92) => new THREE.MeshStandardMaterial({ color, roughness });
const capsule = (radius, length, material) => new THREE.Mesh(new THREE.CapsuleGeometry(radius, length, 6, 10), material);

/**
 * Basit, yüzsüz tarihî karakter gövdesi.
 * Başta yüz geometrisi bulunmaz; başlık/örtü başı tamamen kapatır.
 * Karakteri kamera önüne çevirmek yerine kamera karakterin arkasına yerleştirilmelidir.
 */
export function createFacelessCharacter(scene, spec = {}) {
  assertHistoryCharacterSpec({ ...spec, isSacredFigure: spec.isSacredFigure ?? true, faceVisible: false });
  const {
    robe = '#315b49', sash = '#8d633b', turban = '#e8dfc9',
    scale = 1, position = [0, 0, 0], facing = Math.PI,
    cloak = true, belt = true,
  } = spec;
  const root = new THREE.Group();
  root.position.set(...position);
  root.rotation.y = facing;
  root.scale.setScalar(scale);

  const robeMat = mat(robe), darkRobe = mat(new THREE.Color(robe).multiplyScalar(.72)), cloth = mat(turban), beltMat = mat(sash);
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(.48, 1.05, 8, 16), robeMat);
  torso.position.y = 1.15; torso.scale.set(.88, 1.0, .56); torso.castShadow = true; root.add(torso);

  const headCover = new THREE.Mesh(new THREE.SphereGeometry(.34, 20, 16), cloth);
  headCover.position.y = 2.18; headCover.scale.set(.92, 1.05, .9); headCover.castShadow = true; root.add(headCover);
  const turbanWrap = new THREE.Mesh(new THREE.TorusGeometry(.34, .105, 10, 28), cloth);
  turbanWrap.position.y = 2.24; turbanWrap.rotation.x = Math.PI / 2; root.add(turbanWrap);
  const turbanTop = new THREE.Mesh(new THREE.SphereGeometry(.29, 20, 12), cloth);
  turbanTop.position.set(0, 2.39, 0); turbanTop.scale.set(1.0, .45, .92); root.add(turbanTop);

  if (cloak) {
    const mantle = new THREE.Mesh(new THREE.ConeGeometry(.68, 1.5, 4, 1, true), darkRobe);
    mantle.position.set(0, 1.15, -.06); mantle.rotation.y = Math.PI / 4; mantle.castShadow = true; root.add(mantle);
  }
  if (belt) {
    const beltMesh = new THREE.Mesh(new THREE.CylinderGeometry(.49, .49, .13, 24), beltMat);
    beltMesh.position.y = .88; beltMesh.scale.z = .7; root.add(beltMesh);
  }

  for (const side of [-1, 1]) {
    const arm = capsule(.14, .72, robeMat);
    arm.position.set(side * .52, 1.34, 0); arm.rotation.z = side * -.18; arm.castShadow = true; root.add(arm);
    const leg = capsule(.18, .68, darkRobe);
    leg.position.set(side * .22, .38, .02); leg.castShadow = true; root.add(leg);
    const sandal = new THREE.Mesh(new THREE.BoxGeometry(.23, .09, .42), beltMat);
    sandal.position.set(side * .22, .08, .12); root.add(sandal);
  }
  scene.add(root);
  return root;
}

export function createBanner(scene, { color = '#5b3324', pole = '#76502e', position = [0, 2.8, 0], width = 1.7, height = 1.15 } = {}) {
  const group = new THREE.Group(); group.position.set(...position);
  const poleMesh = new THREE.Mesh(new THREE.CylinderGeometry(.035, .045, height + .55, 10), mat(pole));
  poleMesh.position.y = -height * .1; poleMesh.castShadow = true; group.add(poleMesh);
  const cloth = new THREE.Mesh(new THREE.PlaneGeometry(width, height, 12, 8), new THREE.MeshStandardMaterial({
    color, roughness: 1, side: THREE.DoubleSide,
  }));
  cloth.position.set(width * .52, .04, 0); cloth.rotation.y = -.08; cloth.castShadow = true; group.add(cloth);
  scene.add(group);
  return group;
}
