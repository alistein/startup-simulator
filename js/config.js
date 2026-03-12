// === SECTION: GAME_CONFIG ===
// === GAME_CONFIG (edited by Pixelfork tools) ===
const GAME_CONFIG = {
  baseSubscribers: 1,
  costMultiplier: 1.15,
  stages: [
    { name: 'Prototype', req: 0, mult: 1, color: '#aaa' },
    { name: 'MVP', req: 100, mult: 2, color: '#44aaff' },
    { name: 'Launch', req: 1000, mult: 5, color: '#ffcc00' },
    { name: 'Production', req: 10000, mult: 10, color: '#44ff44' }
  ],
  marketing: [
    { id: 'x', name: 'Post on X', req: 0, mult: 0.1, base: 1, color: '#00aaff', cd: 15 },
    { id: 'reddit', name: 'Post on Reddit', req: 10, mult: 0.2, base: 5, color: '#ff4500', cd: 30 },
    { id: 'linkedin', name: 'Post on LinkedIn', req: 50, mult: 0.5, base: 25, color: '#0077b5', cd: 60 },
    { id: 'producthunt', name: 'Product Hunt Launch', req: 200, mult: 1.0, base: 100, color: '#da552f', cd: 120 }
  ],
  items: [
    { id: 'notion', name: 'Notion Workspace', type: 'passive', value: 1, cost: 15, desc: '+1 Subscriber' },
    { id: 'github', name: 'GitHub Copilot', type: 'passive', value: 2, cost: 50, desc: '+2 Subscribers' },
    { id: 'claude', name: 'Claude Pro', type: 'passive', value: 5, cost: 100, desc: '+5 Subscribers' },
    { id: 'macbook', name: 'Macbook Pro', type: 'passive', value: 10, cost: 250, desc: '+10 Subscribers' },
    { id: 'vercel', name: 'Vercel Pro', type: 'passive', value: 15, cost: 600, desc: '+15 Subscribers' },
    { id: 'aws_micro', name: 'AWS Micro', type: 'passive', value: 25, cost: 1200, desc: '+25 Subscribers' },
    { id: 'stripe', name: 'Stripe Atlas', type: 'passive', value: 50, cost: 3000, desc: '+50 Subscribers' },
    { id: 'aws_dedi', name: 'AWS Servers', type: 'passive', value: 150, cost: 8000, desc: '+150 Subscribers' },
    { id: 'cloud_cluster', name: 'Cloud Cluster', type: 'passive', value: 500, cost: 25000, desc: '+500 Subscribers' },
    { id: 'ai_datacenter', name: 'AI Data Center', type: 'passive', value: 2000, cost: 100000, desc: '+2000 Subscribers' }
  ],
  missions: [
    { id: 'm1', name: 'Traction', desc: 'Reach 100 Subscribers', type: 'subs', req: 100, rewardType: 'cash', rewardValue: 5000 },
    { id: 'm2', name: 'Technical Leader', desc: 'Reach 1,000 Subscribers', type: 'subs', req: 1000, rewardType: 'cofounder', rewardId: 'cto' },
    { id: 'm3', name: 'Marketing Guru', desc: 'Reach 10,000 Subscribers', type: 'subs', req: 10000, rewardType: 'cofounder', rewardId: 'cmo' },
    { id: 'm4', name: 'Operations Chief', desc: 'Earn $100,000 Total Cash', type: 'totalCash', req: 100000, rewardType: 'cofounder', rewardId: 'coo' }
  ],
  cofounders: {
    cto: { name: 'CTO', title: 'Chief Tech Officer', mult: 2, color: '#00ffff' },
    cmo: { name: 'CMO', title: 'Chief Marketing Officer', mult: 2, color: '#ff00ff' },
    coo: { name: 'COO', title: 'Chief Operating Officer', mult: 3, color: '#ffff00' }
  }
};

// === SECTION: CONSTANTS ===
const UNICORN_GOAL = 1000000000;
const COLORS = {
  wallTop: '#3a3a52',
  wallBottom: '#2d2d42',
  floor: '#1e1e2d',
  deskTop: '#8c5c38',
  deskLeg: '#4a2f1b',
  monitor: '#1a1a1a',
  screenOff: '#0f1712',
  screenOn: '#1a3a22',
  skin: '#ffccaa',
  hair: '#4a3018',
  shirt: '#d44444',
  chair: '#222'
};
