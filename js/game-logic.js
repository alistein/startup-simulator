// === SECTION: GAME_LOGIC ===
function getCurrentStage() {
  let current = GAME_CONFIG.stages[0];
  for (let s of GAME_CONFIG.stages) {
    if (state.subscribers >= s.req) current = s;
  }
  return current;
}

function getItemCost(item) {
  const count = state.inventory[item.id] || 0;
  return Math.floor(item.cost * Math.pow(GAME_CONFIG.costMultiplier, count));
}

function recalculateRates() {
  let newSubs = GAME_CONFIG.baseSubscribers + state.bonusSubscribers;

  GAME_CONFIG.items.forEach(item => {
    const count = state.inventory[item.id] || 0;
    if (item.type === 'passive') newSubs += item.value * count;
  });

  state.subscribers = newSubs;

  const stage = getCurrentStage();
  let baseRate = newSubs * stage.mult;

  let cofounderMult = 1;
  state.cofounders.forEach(id => {
    if (GAME_CONFIG.cofounders[id]) cofounderMult *= GAME_CONFIG.cofounders[id].mult;
  });

  state.passiveRate = baseRate * cofounderMult;
}

function saveGame() {
  const data = {
    cash: state.cash,
    totalCash: state.totalCash,
    inventory: state.inventory,
    bonusSubscribers: state.bonusSubscribers,
    claimedMissions: state.claimedMissions,
    cofounders: state.cofounders
  };
  localStorage.setItem('startupSimSave', JSON.stringify(data));
}

function loadGame() {
  const saved = localStorage.getItem('startupSimSave');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      state.cash = data.cash || 0;
      state.totalCash = data.totalCash || 0;
      state.inventory = data.inventory || {};
      state.bonusSubscribers = data.bonusSubscribers || 0;
      state.claimedMissions = data.claimedMissions || [];
      state.cofounders = data.cofounders || [];
    } catch(e) {}
  }
}

function wipeSave() {
  localStorage.removeItem('startupSimSave');
  window.location.reload();
}

function claimMission(mId) {
  const m = GAME_CONFIG.missions.find(x => x.id === mId);
  if (!m || state.claimedMissions.includes(mId)) return;

  if (m.rewardType === 'cash') {
    state.cash += m.rewardValue;
    state.totalCash += m.rewardValue;
  } else if (m.rewardType === 'cofounder') {
    if (!state.cofounders.includes(m.rewardId)) state.cofounders.push(m.rewardId);
  }
  state.claimedMissions.push(mId);
  playChaChing();
  recalculateRates();
  forceUIUpdate();
  saveGame();

  const center = getWorkspaceCenter();
  spawnTextParticle(center.x, center.y - 150, m.rewardType === 'cash' ? `+$${m.rewardValue}` : `${m.rewardId.toUpperCase()} Joined!`, '#44ff44');
}

function buyItem(itemId) {
  const item = GAME_CONFIG.items.find(i => i.id === itemId);
  if (!item) return;

  const cost = getItemCost(item);
  if (state.cash >= cost) {
    state.cash -= cost;
    state.inventory[item.id] = (state.inventory[item.id] || 0) + 1;
    recalculateRates();
    forceUIUpdate();
    saveGame();
  }
}

function doMarketing(mId) {
  const m = GAME_CONFIG.marketing.find(x => x.id === mId);
  if (!m) return;

  if ((state.marketingCooldowns[mId] || 0) <= 0 && state.gamePhase === 'playing' && state.subscribers >= m.req) {
    const gained = Math.max(m.base, Math.floor(state.subscribers * m.mult));
    state.bonusSubscribers += gained;
    state.marketingCooldowns[mId] = m.cd;
    recalculateRates();
    forceUIUpdate();
    saveGame();

    const center = getWorkspaceCenter();
    spawnTextParticle(center.x, center.y - 120, `+${gained} Subs!`, m.color);
  }
}

function updateGameLogic(dt) {
  // Handle passive income
  if (state.passiveRate > 0) {
    state.passiveAccumulator += state.passiveRate * dt;
    if (state.passiveAccumulator >= 1) {
      const earned = Math.floor(state.passiveAccumulator);
      state.cash += earned;
      state.totalCash += earned;
      state.passiveAccumulator -= earned;

      // Visual indicator occasionally
      if (Math.random() < 0.1) {
        const center = getWorkspaceCenter();
        spawnTextParticle(center.x, center.y - 100, `+$${earned}`, '#aaa');
      }
    }
  }

  // Handle manual clicks
  if (input.clicked) {
    state.typingTimer = 0.15; // 150ms typing animation
    input.clicked = false;
  }

  if (state.typingTimer > 0) {
    state.typingTimer -= dt;
  }

  GAME_CONFIG.marketing.forEach(m => {
    if (state.marketingCooldowns[m.id] > 0) {
      state.marketingCooldowns[m.id] -= dt;
    }
  });

  state.saveTimer += dt;
  if (state.saveTimer >= 5) {
    saveGame();
    state.saveTimer = 0;
  }
}
