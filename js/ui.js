// === SECTION: UI ===
const els = {
  cash: document.getElementById('cashDisplay'),
  stageDisplay: document.getElementById('stageDisplay'),
  stageMultDisplay: document.getElementById('stageMultDisplay'),
  missionBox: document.getElementById('missionBox'),
  missionName: document.getElementById('missionName'),
  missionDesc: document.getElementById('missionDesc'),
  claimMissionBtn: document.getElementById('claimMissionBtn'),
  subscribers: document.getElementById('subscribersDisplay'),
  passiveRate: document.getElementById('passiveRateDisplay'),
  unicornBar: document.getElementById('unicornBar'),
  unicornText: document.getElementById('unicornText'),
  shopItems: document.getElementById('shop-items'),
  marketingContainer: document.getElementById('marketing-container'),
  hud: document.getElementById('hud'),
  shopPanel: document.getElementById('shop-panel'),
  screens: document.getElementById('screens')
};

function initUI() {
  els.shopItems.innerHTML = '';
  GAME_CONFIG.items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'shop-btn';
    btn.id = 'btn-' + item.id;
    btn.onclick = () => buyItem(item.id);

    btn.innerHTML = `
      <div class="item-header">
        <span class="item-name">${item.name}</span>
        <span class="item-count" id="count-${item.id}">0</span>
      </div>
      <div class="item-desc">${item.desc}</div>
      <div class="item-cost">
        Cost: $<span class="cost-val" id="cost-${item.id}">0</span>
      </div>
    `;
    els.shopItems.appendChild(btn);
  });

  els.marketingContainer.innerHTML = '';
  GAME_CONFIG.marketing.forEach(m => {
    const btn = document.createElement('button');
    btn.id = 'mkt-' + m.id;
    btn.style.cssText = `flex: 1; max-width: 200px; background:${m.color}; color:white; border:none; padding:12px; border-radius:5px; cursor:pointer; font-family:inherit; font-weight:bold; box-shadow: 0 4px 0 ${m.color}88; transition: transform 0.1s; display:none;`;
    btn.onclick = () => doMarketing(m.id);
    els.marketingContainer.appendChild(btn);
  });
}

function forceUIUpdate() {
  state.timeSinceUIUpdate = 1; // trigger immediate update
}

function updateUI(dt) {
  if (state.gamePhase !== 'playing') return;

  state.timeSinceUIUpdate += dt;
  if (state.timeSinceUIUpdate >= 0.1) {
    state.timeSinceUIUpdate = 0;

    els.cash.textContent = '$' + Math.floor(state.cash).toLocaleString();

    const stage = getCurrentStage();
    els.stageDisplay.textContent = stage.name;
    els.stageDisplay.style.color = stage.color;
    els.stageMultDisplay.textContent = 'Revenue x' + stage.mult;

    els.subscribers.textContent = state.subscribers.toLocaleString();
    els.passiveRate.textContent = state.passiveRate.toLocaleString();

    const progress = Math.min((state.cash / UNICORN_GOAL) * 100, 100);
    els.unicornBar.style.width = progress + '%';
    els.unicornText.textContent = '$' + Math.floor(state.cash).toLocaleString() + ' / $1,000,000,000';

    const nextMission = GAME_CONFIG.missions.find(m => !state.claimedMissions.includes(m.id));
    if (nextMission) {
      els.missionBox.style.display = 'block';
      els.missionName.textContent = nextMission.name;
      els.missionDesc.textContent = nextMission.desc;

      let isComplete = false;
      if (nextMission.type === 'subs' && state.subscribers >= nextMission.req) isComplete = true;
      if (nextMission.type === 'totalCash' && state.totalCash >= nextMission.req) isComplete = true;

      if (isComplete) {
        els.claimMissionBtn.style.display = 'block';
        els.claimMissionBtn.onclick = () => claimMission(nextMission.id);
      } else {
        els.claimMissionBtn.style.display = 'none';
      }
    } else {
      els.missionBox.style.display = 'none';
    }

    GAME_CONFIG.marketing.forEach(m => {
      const btn = document.getElementById('mkt-' + m.id);
      if (btn) {
        if (state.subscribers >= m.req) {
          btn.style.display = 'block';
          const cd = state.marketingCooldowns[m.id] || 0;
          if (cd > 0) {
            btn.disabled = true;
            btn.textContent = `${m.name} (${Math.ceil(cd)}s)`;
            btn.style.background = '#555';
            btn.style.boxShadow = '0 4px 0 #222';
          } else {
            btn.disabled = false;
            btn.textContent = m.name;
            btn.style.background = m.color;
            btn.style.boxShadow = `0 4px 0 ${m.color}88`;
          }
        } else {
          btn.style.display = 'none';
        }
      }
    });

    GAME_CONFIG.items.forEach(item => {
      const cost = getItemCost(item);
      const count = state.inventory[item.id] || 0;
      const btn = document.getElementById('btn-' + item.id);
      const costEl = document.getElementById('cost-' + item.id);
      const countEl = document.getElementById('count-' + item.id);

      if (btn && costEl && countEl) {
        costEl.textContent = cost.toLocaleString();
        countEl.textContent = count;

        if (state.cash < cost) {
          btn.disabled = true;
          costEl.classList.add('too-expensive');
        } else {
          btn.disabled = false;
          costEl.classList.remove('too-expensive');
        }
      }
    });
  }
}

function startGame() {
  state.gamePhase = 'playing';
  els.screens.style.display = 'none';
  els.hud.style.display = 'flex';
  els.marketingContainer.style.display = 'flex';
  els.shopPanel.style.display = 'flex';
  document.getElementById('restartBtn').style.display = 'block';
  recalculateRates();
  forceUIUpdate();
}
