// === SECTION: STATE ===
let state = {
  gamePhase: 'menu', // 'menu', 'playing'
  cash: 0,
  totalCash: 0,
  bonusSubscribers: 0,
  passiveRate: 0,
  subscribers: 0,
  inventory: {},
  particles: [],
  typingTimer: 0,
  passiveAccumulator: 0,
  timeSinceUIUpdate: 0,
  saveTimer: 0,
  marketingCooldowns: {},
  claimedMissions: [],
  cofounders: []
};

// === SECTION: INPUT ===
const input = {
  clicked: false,
  pointer: { x: 0, y: 0 }
};
