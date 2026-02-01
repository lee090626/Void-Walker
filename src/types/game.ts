import type { Weapon, Armor } from './item';
export type { Weapon, Armor };

import { ITEM_DATABASE } from './item';

export interface Portal {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  targetMapId: string;
  targetX: number;
  targetY: number;
}

export interface MapData {
  id: string;
  name: string;
  bgColor: string;
  bgImage?: string; // Optional path to map image
  canSpawnMonsters: boolean;
  portals: Portal[];
  npcs: NPC[];
}

export interface InventoryItem {
  itemId: string;
  quantity: number;
  enhanceLevel?: number; // Added for equipment
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface DamageNumber {
  id: string;
  value: number;
  position: Vector2D;
  vx: number; // Horizontal velocity for spreading
  color: string;
  createdAt: number;
}

export interface WorldItem {
  id: string;
  itemId: string;
  position: Vector2D;
  droppedAt: number;
}

export interface Entity {
  id: string;
  position: Vector2D;
  velocity: Vector2D;
  size: Vector2D;
  speed: number;
}

export interface Player extends Entity {
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  level: number;
  exp: number;
  maxExp: number;
  atk: number;
  def: number;
  statPoints: number;
  stats: {
    str: number;
    dex: number;
    int: number;
    vit: number;
  };
  equipment: {
    weapon: (Weapon & { enhanceLevel?: number }) | null;
    armor: (Armor & { enhanceLevel?: number }) | null;
  };

  attack: {
    isAttacking: boolean;
    angle: number; // Current swing angle
    targetAngle: number;
    progress: number; // 0 to 1
    hitEnemies: string[]; // IDs of enemies hit during the current swing
  };
  direction: number; // Facing angle in radians
  lastDamageTime: number; // For visual feedback
  inventory: InventoryItem[];
  gold: number;
}

export interface Enemy extends Entity {
  type: string;
  hp: number;
  maxHp: number;
  level: number;
  expValue: number;
  atk: number;
  attackRange: number;
  attackCooldown: number; // in seconds
  lastAttackTime: number; // timestamp
  hitboxSize: Vector2D; // Added for monster-specific hitbox
  hitboxOffset: Vector2D; // Added for offset positioning
}

export interface NPC extends Entity {
  name: string;
  type: 'Merchant' | 'Quest' | 'Blacksmith' | 'Spaceship';
  shopItems?: string[]; // Item IDs
}

export function calculateDerivedStats(
  stats: Player['stats'],
  equipment: {
    weapon: (Weapon & { enhanceLevel?: number }) | null;
    armor: (Armor & { enhanceLevel?: number }) | null;
  },
) {
  const atk =
    10 +
    stats.str * stats.str +
    (equipment.weapon?.atk || 0) +
    (equipment.weapon?.enhanceLevel || 0) * 3;
  const def =
    (equipment.armor?.def || 0) +
    Math.floor((stats.vit - 1) / 2) +
    (equipment.armor?.enhanceLevel || 0) * 2;
  const maxHp = 100 + stats.vit * 15 + stats.str * 2;
  const maxMp = 50 + stats.int * 15;
  const speed = Math.min(500, 200 + (stats.dex - 1) * 10); // Offset adjusted

  return { atk, def, maxHp, maxMp, speed };
}

export interface GameState {
  player: Player;
  enemies: Enemy[];
  droppedItems: WorldItem[];
  damageNumbers: DamageNumber[];
  currentMapId: string;
  bestiary: Record<string, number>; // monsterTypeId -> killCount
  lastUpdate: number;
  activeUI:
    | 'None'
    | 'Inventory'
    | 'Status'
    | 'Shop'
    | 'MonsterBook'
    | 'Enhance'
    | 'PlanetSelect'
    | 'Settings';
  quickBar: (string | null)[]; // Array of 5 item IDs
  settings: {
    showRange: boolean;
    showHitbox: boolean;
    cooldownVisualMode: number; // 0: None, 1: Radial, 2: HUD, 3: Flash
  };
}

export const INITIAL_STATE: GameState = {
  player: {
    id: 'player',
    position: { x: 400, y: 300 },
    velocity: { x: 0, y: 0 },
    size: { x: 32, y: 32 },
    level: 1,
    exp: 0,
    maxExp: 100,
    statPoints: 0,
    stats: {
      str: 1,
      dex: 1,
      int: 1,
      vit: 1,
    },
    equipment: {
      weapon: ITEM_DATABASE['basic_sword'] as Weapon,
      armor: null,
    },
    ...calculateDerivedStats(
      { str: 1, dex: 1, int: 1, vit: 1 },
      { weapon: ITEM_DATABASE['basic_sword'] as Weapon, armor: null },
    ),
    hp: calculateDerivedStats(
      { str: 1, dex: 1, int: 1, vit: 1 },
      { weapon: ITEM_DATABASE['basic_sword'] as Weapon, armor: null },
    ).maxHp,
    mp: calculateDerivedStats(
      { str: 1, dex: 1, int: 1, vit: 1 },
      { weapon: ITEM_DATABASE['basic_sword'] as Weapon, armor: null },
    ).maxMp,

    attack: {
      isAttacking: false,
      angle: 0,
      targetAngle: 0,
      progress: 0,
      hitEnemies: [],
    },
    direction: 0,
    lastDamageTime: 0,
    inventory: [{ itemId: 'basic_sword', quantity: 1 }],
    gold: 0,
  },

  enemies: [],
  droppedItems: [],
  damageNumbers: [],
  currentMapId: 'town',
  bestiary: {},
  lastUpdate: Date.now(),
  activeUI: 'None',
  quickBar: [null, null, null, null, null],
  settings: {
    showRange: true,
    showHitbox: true,
    cooldownVisualMode: 1, // Default to Radial
  },
};
