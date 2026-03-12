// === SECTION: PHYSICS ===
function updatePhysics(dt) {
  for (let i = state.particles.length - 1; i >= 0; i--) {
    let p = state.particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;
    if (p.life <= 0) {
      state.particles.splice(i, 1);
    }
  }
}
