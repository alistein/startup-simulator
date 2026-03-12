// === SECTION: RENDERING ===
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
}

function drawRoom() {
  const cx = getWorkspaceCenter().x;
  const cy = getWorkspaceCenter().y;
  const time = Date.now() / 1000;
  const isTyping = state.typingTimer > 0;

  // Background
  drawRect(0, 0, displayWidth, cy - 80, COLORS.wallTop);
  drawRect(0, cy - 80, displayWidth, 80, COLORS.wallBottom);
  drawRect(0, cy, displayWidth, displayHeight - cy, COLORS.floor);

  // Subtle floor grid
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 2;
  for (let i = -10; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(cx + i * 100 - 500, cy);
    ctx.lineTo(cx + i * 200 - 1000, displayHeight);
    ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(0, cy + 100); ctx.lineTo(displayWidth, cy + 100); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, cy + 250); ctx.lineTo(displayWidth, cy + 250); ctx.stroke();

  // --- BACKGROUND ITEMS ---
  if (state.inventory.stripe) {
    drawRect(cx - 250, cy - 250, 100, 140, '#222');
    drawRect(cx - 245, cy - 245, 90, 130, '#11aaff');
    drawRect(cx - 230, cy - 200, 60, 60, '#ffcc00'); // Sun/logo
  }

  if (state.inventory.aws_dedi) {
    drawRect(cx - 350, cy - 150, 90, 200, '#111');
    drawRect(cx - 340, cy - 140, 70, 180, '#222');
    for (let i = 0; i < 5; i++) {
      drawRect(cx - 330, cy - 130 + i * 30, 50, 20, '#333');
      if (Math.sin(time * 10 + i) > 0) drawRect(cx - 320, cy - 125 + i * 30, 8, 8, '#44ff44');
      if (Math.cos(time * 15 + i) > 0.5) drawRect(cx - 300, cy - 125 + i * 30, 8, 8, '#ff4444');
    }
  }

  if (state.inventory.ai_datacenter) {
    drawRect(cx + 300, cy - 200, 120, 250, '#222');
    drawRect(cx + 310, cy - 180, 100, 80, '#111'); // screen
    if (time % 2 < 1) drawRect(cx + 330, cy - 150, 20, 20, '#ff00ff');
    else drawRect(cx + 350, cy - 130, 20, 20, '#00ffff');
    drawRect(cx + 300, cy - 100, 120, 40, '#444'); // deck
    drawRect(cx + 320, cy - 90, 10, 10, '#ff0000'); // joystick
  }

  // --- DESK ---
  // Legs
  drawRect(cx - 180, cy, 20, 120, COLORS.deskLeg);
  drawRect(cx + 160, cy, 20, 120, COLORS.deskLeg);
  // Top
  drawRect(cx - 200, cy - 20, 400, 25, COLORS.deskTop);
  drawRect(cx - 195, cy + 5, 390, 10, '#6b4528'); // desk shadow/edge

  // --- DESK ITEMS (BACK) ---
  if (state.inventory.macbook) {
    drawRect(cx + 50, cy - 130, 100, 70, COLORS.monitor); // bezel
    drawRect(cx + 55, cy - 125, 90, 60, (isTyping || state.subscribers > 0) ? '#112233' : '#050a11'); // screen
    drawRect(cx + 90, cy - 60, 20, 40, '#333'); // stand
    if (isTyping || state.subscribers > 0) {
      if (state.inventory.notion) {
        drawRect(cx + 60, cy - 120, 35, 40, '#fff'); // Notion page
        drawRect(cx + 65, cy - 115, 15, 4, '#333');
      } else {
        drawRect(cx + 65, cy - 110, 40, 4, '#44aaff');
      }
      if (state.inventory.claude) {
        drawRect(cx + 100, cy - 120, 40, 40, '#2a2a2a'); // Claude UI
        drawRect(cx + 105, cy - 115, 10, 10, '#d97757'); // Logo
      } else {
        drawRect(cx + 65, cy - 90, 60, 4, '#44aaff');
      }
    }
  }

  // --- MAIN MONITOR ---
  drawRect(cx - 70, cy - 120, 100, 70, COLORS.monitor); // bezel
  drawRect(cx - 65, cy - 115, 90, 60, (isTyping || state.subscribers > 0) ? COLORS.screenOn : COLORS.screenOff); // screen
  drawRect(cx - 30, cy - 50, 20, 30, '#333'); // stand
  if (isTyping || state.subscribers > 0) {
    if (state.inventory.vercel) {
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.moveTo(cx - 5, cy - 110); ctx.lineTo(cx + 5, cy - 95); ctx.lineTo(cx - 15, cy - 95); ctx.fill();
    }
    // Code lines
    for (let i = 0; i < 4; i++) {
      drawRect(cx - 55, cy - 105 + i * 12, 20 + Math.random() * 30, 4, '#44ff44');
      if (state.inventory.github) {
        drawRect(cx - 30 + Math.random() * 10, cy - 105 + i * 12, 10 + Math.random() * 20, 4, 'rgba(150,150,150,0.5)');
      }
    }
  }

  // --- CHAIR & BOY ---
  const idleBounce = Math.sin(time * 3) * 2;
  const boyY = cy - 20 + (isTyping ? 0 : idleBounce);

  // Chair
  if (state.inventory.aws_micro) {
    drawRect(cx - 45, cy + 30, 50, 10, '#555'); // seat base
    drawRect(cx - 20, cy + 40, 10, 50, '#111'); // piston
    drawRect(cx - 40, cy + 80, 50, 10, '#333'); // wheels base
    drawRect(cx - 45, cy - 40, 15, 80, '#444'); // backrest
  } else {
    drawRect(cx - 35, cy + 30, 40, 10, COLORS.chair); // simple stool
    drawRect(cx - 25, cy + 40, 20, 60, '#111'); // stool legs
  }

  // Boy Body
  drawRect(cx - 30, boyY - 30, 40, 60, COLORS.shirt);
  // Head
  drawRect(cx - 25, boyY - 70, 30, 35, COLORS.skin);
  // Hair
  drawRect(cx - 30, boyY - 75, 40, 15, COLORS.hair);
  drawRect(cx + 5, boyY - 60, 10, 15, COLORS.hair);
  // Glasses/Eyes
  drawRect(cx - 5, boyY - 55, 12, 8, '#222');
  drawRect(cx - 3, boyY - 53, 4, 4, '#fff');

  // Arms
  if (isTyping) {
    // Reaching forward
    drawRect(cx - 15, boyY - 20, 45, 12, COLORS.shirt);
    drawRect(cx + 30, boyY - 20, 12, 12, COLORS.skin);
  } else {
    // Resting down
    drawRect(cx - 10, boyY - 20, 12, 40, COLORS.shirt);
    drawRect(cx - 10, boyY + 20, 12, 12, COLORS.skin);
  }

  // --- DESK ITEMS (FRONT) ---
  // Standard Keyboard
  drawRect(cx - 35, cy - 10, 60, 12, '#333');
  ctx.fillStyle = isTyping ? '#555' : '#444';
  ctx.fillRect(cx - 30, cy - 8, 50, 3);
  ctx.fillRect(cx - 30, cy - 4, 50, 3);

  // --- FLOOR ITEMS (FRONT) ---
  if (state.inventory.cloud_cluster) {
    const catY = cy + 60 + Math.sin(time * 2) * 1; // breathing
    drawRect(cx + 150, catY, 40, 25, '#e67e22'); // body
    drawRect(cx + 180, catY + 5, 20, 20, '#e67e22'); // head
    drawRect(cx + 185, catY, 5, 8, '#d35400'); // ear
    drawRect(cx + 195, catY, 5, 8, '#d35400'); // ear
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (state.gamePhase === 'playing') {
    drawRoom();

    // Particles
    state.particles.forEach(p => {
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      ctx.fillStyle = p.color;
      ctx.font = "20px 'PeaBerry Mono', monospace";
      ctx.fillText(p.text, p.x, p.y);
    });
    ctx.globalAlpha = 1.0;
  }
}
