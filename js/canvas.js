// === SECTION: CANVAS SETUP ===
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let displayWidth = window.innerWidth;
let displayHeight = window.innerHeight;
let dpr = window.devicePixelRatio || 1;

function resize() {
  displayWidth = window.innerWidth;
  displayHeight = window.innerHeight;
  canvas.style.width = displayWidth + 'px';
  canvas.style.height = displayHeight + 'px';
  canvas.width = Math.floor(displayWidth * dpr);
  canvas.height = Math.floor(displayHeight * dpr);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}
