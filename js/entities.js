// === SECTION: ENTITIES ===
function spawnTextParticle(x, y, text, color) {
  state.particles.push({
    x: x + (Math.random() * 40 - 20),
    y: y + (Math.random() * 20 - 10),
    vx: (Math.random() - 0.5) * 30,
    vy: -100 - Math.random() * 50,
    text: text,
    color: color,
    life: 1.0,
    maxLife: 1.0
  });
}

function getWorkspaceCenter() {
  // Center of the playable area (offset by shop width when playing)
  const shopWidth = state.gamePhase === 'playing' ? 340 : 0;
  return {
    x: (displayWidth - shopWidth) / 2,
    y: displayHeight / 2 + 50
  };
}
