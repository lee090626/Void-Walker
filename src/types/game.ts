import type { Weapon, Armor, Helmet } from './item';
import type { PlayerSkills } from './skills';
import { INITIAL_SKILLS } from './skills';
export type { Weapon, Armor, Helmet };

export interface Portal {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  targetMapId: string;
  targetX: number;
  targetY: number;
  requiredBossId?: string; // Optional: Boss ID that must be defeated to use this portal
}

export interface MapData {
  id: string;
  name: string;
  bgColor: string;
  bgImage?: string; // Optional path to map image
  canSpawnMonsters: boolean;
  spawnInterval?: number; // In seconds (e.g., 5)
  maxMonsters?: number; // Maximum number of monsters allowed on this map (default: 10)
  portals: Portal[];
  npcs: NPC[];
  fixedSpawns?: Array<{
    monsterId: string;
    x: number;
    y: number;
    level?: number;
    respawnCooldown?: number; // Respawn time in seconds (default: 60)
  }>;
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
    def: number;
  };
  defeatedBosses: string[]; // List of defeated boss IDs
  equipment: {
    weapon: (Weapon & { enhanceLevel?: number }) | null;
    armor: (Armor & { enhanceLevel?: number }) | null;
    helmet: (Helmet & { enhanceLevel?: number }) | null;
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
  acquiredEquipment: string[]; // Unique equipment tracking (Weapon, Armor, Helmet IDs only)
  moveSpeedMultiplier: number; // 1.0 = normal, 0.6 = slowed
  slowEndTime: number; // Timestamp when slow ends
  skillPoints: number; // Available skill points
  skills: PlayerSkills; // Skill levels
}

export interface Enemy extends Entity {
  type: string;
  hp: number;
  maxHp: number;
  level: number;
  expValue: number;
  atk: number;
  def: number;
  attackRange: number;
  attackCooldown: number; // in seconds
  lastAttackTime: number; // timestamp
  hitboxSize: Vector2D; // Added for monster-specific hitbox
  hitboxOffset: Vector2D; // Added for offset positioning
  // Boss-specific runtime state
  shield?: number; // Current shield amount
  isEnraged?: boolean; // Enrage mode active
  lastEnrageTime?: number; // Enrage duration check
  lastGlacierFallTime?: number; // Last glacier fall timestamp
  lastTailSwipeTime?: number; // Last tail swipe timestamp
  lastOrbitalLaserTime?: number; // Last orbital laser timestamp
  orbitalLaserStartTime?: number; // Orbital laser preparing tracking
  lastEnergyPulseTime?: number; // Last energy pulse timestamp
  tailSwipeStartTime?: number; // Skill pre-delay tracking
  attackStartTime?: number; // Normal attack pre-delay tracking
  glacierFallDamage?: number;
  tailSwipeDamage?: number;
  orbitalLaserDamage?: number;
  energyPulseDamage?: number;
}

export interface GlacierFall {
  id: string;
  position: Vector2D;
  createdAt: number;
  damage: number;
  radius: number; // Damage radius
  impactTime: number; // Time until impact (ms)
}

export interface OrbitalLaser {
  id: string;
  position: Vector2D;
  createdAt: number;
  damage: number;
  radius: number;
  impactTime: number; // ms until impact
}

export interface NPC extends Entity {
  name: string;
  type: 'Merchant' | 'Quest' | 'Blacksmith' | 'Spaceship' | 'Guide';
  shopItems?: string[]; // Item IDs
  nameOffset?: Vector2D;
  dialogues?: string[]; // List of possible dialogues
  dialogueMode?: 'random' | 'sequential'; // Default is random if undefined
  spriteUrl?: string; // Optional custom sprite
}

export interface ToastMessage {
  id: string;
  message: string;
  duration?: number;
}

export interface RespawnTask {
  monsterId: string; // The fixed monster ID (e.g., fixed-sky_wisp-...)
  templateId: string; // The monster template ID (e.g., sky_wisp)
  level: number;
  position: Vector2D;
  respawnTime: number; // Timestamp when it should respawn
}

export function calculateDerivedStats(
  stats: Player['stats'],
  equipment: Player['equipment'],
  playerLevel: number,
  mapId?: string,
  skills?: Player['skills'],
) {
  /* Removed duplicate const declarations */
  const { str = 1, dex = 1, int = 1, vit = 1, def: defStat = 1 } = stats;
  // stats is Player['stats'], which doesn't have level. Level is outside in Player.
  // We should pass level explicitly or get it from somewhere else.
  // For now, let's assume level might be passed as an optional param or is 1.

  let atk = 10 + str * 6 + playerLevel * 4;
  let def = 10 + defStat * 4 + playerLevel * 0.5;
  let maxHp = 100 + vit * 150 + playerLevel * 60;
  let maxMp = 50 + int * 25 + playerLevel * 2;
  let speed = 200 + dex * 5;

  // Apply equipment bonuses
  if (equipment.weapon) atk += equipment.weapon.atk || 0;
  if (equipment.armor) def += equipment.armor.def || 0;
  if (equipment.helmet) def += equipment.helmet.def || 0;

  // Apply enhancement bonuses
  if (equipment.weapon?.enhanceLevel) {
    const enhanceBonus =
      (equipment.weapon.atk || 0) * equipment.weapon.enhanceLevel * 0.1;
    atk += enhanceBonus;
  }
  if (equipment.armor?.enhanceLevel) {
    const enhanceBonus =
      (equipment.armor.def || 0) * equipment.armor.enhanceLevel * 0.1;
    def += enhanceBonus;
  }
  if (equipment.helmet?.enhanceLevel) {
    const enhanceBonus =
      (equipment.helmet.def || 0) * equipment.helmet.enhanceLevel * 0.1;
    def += enhanceBonus;
  }

  // [NEW] Apply skill bonuses
  if (skills) {
    // Max HP bonus (+100 per level, max 30 levels = +3000 HP)
    maxHp += skills.maxHpBonus * 100;

    // Defense bonus (+5% per level, max 20 levels = +100%)
    const defenseMultiplier = 1 + skills.defenseBonus * 0.05;
    def = Math.floor(def * defenseMultiplier);

    // Move speed bonus (+8% per level, max 10 levels = +80%)
    const speedMultiplier = 1 + skills.moveSpeed * 0.08;
    speed = Math.floor(speed * speedMultiplier);
  }

  // Map Speed Multipliers
  if (mapId?.startsWith('proxima_')) {
    speed *= 1.2; // Low Gravity
  }

  return { atk, def, maxHp, maxMp, speed };
}

export type UIType =
  | 'None'
  | 'Inventory'
  | 'Status'
  | 'Shop'
  | 'MonsterBook'
  | 'Skills'
  | 'Enhance'
  | 'PlanetSelect'
  | 'Settings'
  | 'Dialog';

export interface GameState {
  player: Player;
  enemies: Enemy[];
  droppedItems: WorldItem[];
  damageNumbers: DamageNumber[];
  glacierFalls: GlacierFall[]; // Boss glacier fall projectiles
  orbitalLasers: OrbitalLaser[];
  currentMapId: string;
  bestiary: Record<string, number>; // monsterTypeId -> killCount
  lastUpdate: number;
  lastBossKillTime: number; // For boss respawn timer
  activeUI: UIType;
  currentDialog: {
    speaker: string;
    text: string;
    action?: string;
    actionLabel?: string;
    messages?: string[]; // Full list of messages for sequential dialog
    messageIndex?: number; // Current message index
  } | null;
  quickBar: (string | null)[]; // Array of 5 item IDs
  settings: {
    showRange: boolean;
    showHitbox: boolean;
    cooldownVisualMode: number; // 0: None, 1: Radial, 2: HUD, 3: Flash
    playerStyle: number; // 0: Procedural, 1: Fantasy, 2: Sci-Fi, 3: Assassin, 4: Chibi, 5: Urban
    showCoordinates: boolean;
  };
  toasts: ToastMessage[];
  lastExpGain?: {
    amount: number;
    timestamp: number;
  };
  lastSpawnTime: number; // Timestamp for internal spawn timer
  respawnQueue: RespawnTask[]; // Queue for fixed monster respawns
}

export const INITIAL_STATE: GameState = {
  player: {
    id: 'player',
    position: { x: 650, y: 450 },
    velocity: { x: 0, y: 0 },
    size: { x: 128, y: 128 },
    level: 1,
    exp: 0,
    maxExp: 100,
    statPoints: 0,
    stats: {
      str: 1,
      dex: 1,
      int: 1,
      vit: 1,
      def: 1,
    },
    equipment: {
      weapon: null,
      armor: null,
      helmet: null,
    },
    ...calculateDerivedStats(
      { str: 1, dex: 1, int: 1, vit: 1, def: 1 },
      {
        weapon: null,
        armor: null,
        helmet: null,
      },
      1,
      'town',
      INITIAL_SKILLS,
    ),
    hp: 290,
    mp: 77,

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
    acquiredEquipment: ['basic_sword'],
    moveSpeedMultiplier: 1,
    slowEndTime: 0,
    skillPoints: 0,
    skills: {
      critDamage: 0,
      attackSpeed: 0,
      maxHpBonus: 0,
      defenseBonus: 0,
      hpRegen: 0,
      expBonus: 0,
      dropRate: 0,
      goldBonus: 0,
      moveSpeed: 0,
    },
    defeatedBosses: [],
  },

  enemies: [],
  droppedItems: [],
  damageNumbers: [],
  glacierFalls: [],
  orbitalLasers: [],
  currentMapId: 'town',
  bestiary: {},
  lastUpdate: Date.now(),
  activeUI: 'None',
  currentDialog: null,
  quickBar: [null, null, null, null, null],
  settings: {
    showRange: true,
    showHitbox: true,
    cooldownVisualMode: 1, // Default to Radial
    playerStyle: 4, // Fixed to Chibi Style
    showCoordinates: true,
  },
  toasts: [],
  lastBossKillTime: 0,
  lastSpawnTime: 0,
  respawnQueue: [],
};
