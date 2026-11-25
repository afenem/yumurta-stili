import * as THREE from 'three';
import { CamPath } from '../../engine/src/camera.js';
import { addDesertGround, addMudBrickFort, addPalm, addTent } from '../../engine/src/history/environment.js';
import { createFacelessCharacter, createBanner } from '../../engine/src/history/characters.js';

export const NAME = 'Hayber’in Sancağı';
export const DUR = 58;
export const FPS = 30;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const smooth = x => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };
const lerp = (a, b, t) => a + (b - a) * t;

export async function setup(ctx) {
  const { scene } = ctx;
  scene.background = new THREE.Color('#b97842');
  scene.fog = new THREE.Fog('#c58b55', 22, 70);
  addDesertGround(scene);
  addMudBrickFort(scene);
  addPalm(scene, -11, -8, 6.5); addPalm(scene, 12, -11, 5.8); addPalm(scene, 9, 4, 5.1);
  addTent(scene, [-7, 0, 4], '#806044'); addTent(scene, [7, 0, 5], '#6e513a');

  const sun = new THREE.DirectionalLight('#ffd49a', 3.0);
  sun.position.set(-8, 15, 8); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -25; sun.shadow.camera.right = 25; sun.shadow.camera.top = 25; sun.shadow.camera.bottom = -25; scene.add(sun);
  scene.add(new THREE.HemisphereLight('#f8dcb4', '#715039', 1.5));

  const ali = createFacelessCharacter(scene, { robe: '#315d4a', sash: '#b18a4e', turban: '#e7dfc9', position: [0, 0, 2], facing: Math.PI, scale: 1.08, isSacredFigure: true });
  const companions = [
    createFacelessCharacter(scene, { robe: '#6a5940', turban: '#d8c8a9', position: [-3.2, 0, 5], facing: Math.PI, scale: .96 }),
    createFacelessCharacter(scene, { robe: '#45566a', turban: '#e1d7c3', position: [3.1, 0, 5.5], facing: Math.PI, scale: 1.02 }),
  ];
  const banner = createBanner(scene, { position: [0.9, 3.25, 1.7], color: '#244c3b', width: 1.8, height: 1.35 });
  // Seeded particle layout: the same story always starts with the same composition.
  const dust = [];
  let seed = 24681357;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  for (let i = 0; i < 80; i++) {
    const x = (random() - .5) * 24, y = .15 + random() * 3.5, z = -10 + random() * 24;
    const m = new THREE.Mesh(new THREE.SphereGeometry(.025 + random() * .035, 5, 5), new THREE.MeshBasicMaterial({ color: '#f4d7a1', transparent: true, opacity: .24 }));
    m.position.set(x, y, z);
    scene.add(m);
    dust.push({ mesh: m, x, y, phase: random() * Math.PI * 2 });
  }
  const cam = new CamPath([
    { t: 0, pos: [0, 5.5, 18], look: [0, 3.2, -9], fov: 48 },
    { t: 8, pos: [-5, 4.4, 15], look: [0, 3, -10], fov: 45, move: 'glide', dur: 5 },
    { t: 18, pos: [0, 4.0, 12], look: [0, 2.6, 1], fov: 42, move: 'glide', dur: 4 },
    { t: 29, pos: [0, 3.4, 10], look: [0, 2.5, 1], fov: 39, move: 'glide', dur: 3 },
    { t: 40, pos: [2.5, 4.2, 14], look: [0, 3.2, -10], fov: 43, move: 'glide', dur: 4 },
    { t: 50, pos: [0, 5, 18], look: [0, 3, -10], fov: 46, move: 'glide', dur: 5 },
  ], { fps: FPS, creep: .12, drift: .04 });
  ctx.history = { ali, companions, banner, dust, cam };
}

export function frame(t, ctx) {
  const { ali, companions, banner, dust, cam } = ctx.history;
  cam.apply(ctx.cam, t);
  // Subtle cloth/flag movement. No facial animation or facial geometry exists.
  banner.rotation.z = Math.sin(t * 1.3) * .025;
  banner.children[1].rotation.y = -.08 + Math.sin(t * 1.1) * .045;
  ali.position.x = Math.sin(t * .22) * .06;
  companions.forEach((c, i) => { c.rotation.y = Math.PI + Math.sin(t * .35 + i) * .025; });
  // Pure time-based motion: rendering frame 20 before frame 10 must not alter either result.
  dust.forEach(({ mesh, x, y, phase }) => {
    mesh.position.x = x + Math.sin(t * .5 + phase) * .12;
    mesh.position.y = y + Math.cos(t * .7 + phase) * .08;
  });
  let focus = 10, coc = .7, bloom = .62, tint = [1.0, .91, .78];
  if (t < 8) { focus = 18; coc = .25; }
  else if (t < 18) { focus = 12; coc = .5; }
  else if (t < 40) { focus = 8; coc = .35; }
  else { focus = 18; coc = .45; }
  return { focus, coc, range: 16, bloom, sat: 1.02, contrast: 1.08, vignette: .16, tint };
}

export function overlay(g, t, ctx) {
  const W = ctx.W, H = ctx.H;
  const title = t < 8 ? 'HAYBER KUŞATMASI' : t < 18 ? 'ERTESİ GÜN...' : t < 30 ? 'SANCAK TESLİM EDİLİYOR' : t < 42 ? 'HZ. ALİ (R.A.)' : 'HİDAYETE DAVET';
  g.save();
  const y = H * .105, size = W * .047;
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = '800 ' + size + 'px Arial';
  g.shadowColor = 'rgba(28,14,6,.55)'; g.shadowBlur = 12; g.fillStyle = '#fff0d5';
  g.fillText(title, W / 2, y);
  g.restore();
}
