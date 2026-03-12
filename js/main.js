// === SECTION: GAME_LOOP ===
let lastTime = 0;
function gameLoop(timestamp) {
  requestAnimationFrame(gameLoop);
  const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
  lastTime = timestamp;

  if (state.gamePhase === 'playing') {
    updatePhysics(dt);
    updateGameLogic(dt);
  }

  updateUI(dt);
  render();
}

// === SECTION: INIT ===
window.addEventListener('resize', resize);

// Initialize immediately without waiting for fonts to prevent loading hangs
function initGame() {
  resize();
  loadGame();
  initUI();

  document.getElementById('startBtn').addEventListener('click', startGame);
  document.getElementById('restartBtn').addEventListener('click', wipeSave);

  // Handle clicks on canvas
  canvas.addEventListener('mousedown', (e) => {
    if (state.gamePhase === 'playing') {
      input.clicked = true;
      input.pointer.x = e.clientX;
      input.pointer.y = e.clientY;
    }
  });

  // Touch support for canvas
  canvas.addEventListener('touchstart', (e) => {
    if (state.gamePhase === 'playing') {
      e.preventDefault();
      input.clicked = true;
      input.pointer.x = e.touches[0].clientX;
      input.pointer.y = e.touches[0].clientY;
    }
  }, { passive: false });

  requestAnimationFrame((t) => {
    lastTime = t;
    gameLoop(t);
  });
}

initGame();
