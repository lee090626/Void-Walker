export interface DropItem {
  itemId: string;
  chance: number; // 0 to 1
}

export const getMonsterStatsByLevel = (
  template: MonsterTemplate,
  level: number,
) => {
  const lvDiff = level - 1;
  const hpMultiplier = 1 + lvDiff * 0.2; // 20% per level (was 25%)
  const atkMultiplier = 1 + lvDiff * 0.12; // 12% per level (was 15%)
  const expMultiplier = 1 + lvDiff * 0.25; // 25% per level
  const defMultiplier = 1 + lvDiff * 0.08; // 8% per level (was 10%)
  const shieldMultiplier = 1 + lvDiff * 0.1; // 10% per level
  const skillMultiplier = 1 + lvDiff * 0.1; // 10% per level

  return {
    maxHp: Math.floor(template.maxHp * hpMultiplier),
    atk: Math.floor(template.atk * atkMultiplier),
    def: Math.floor((template.def || 0) * defMultiplier),
    expValue: Math.floor(template.expValue * expMultiplier),
    shield: template.shield
      ? Math.floor(template.shield * shieldMultiplier)
      : undefined,
    glacierFallDamage: template.glacierFallDamage
      ? Math.floor(template.glacierFallDamage * skillMultiplier)
      : undefined,
    tailSwipeDamage: template.tailSwipeDamage
      ? Math.floor(template.tailSwipeDamage * skillMultiplier)
      : undefined,
    orbitalLaserDamage: template.orbitalLaserDamage
      ? Math.floor(template.orbitalLaserDamage * skillMultiplier)
      : undefined,
    energyPulseDamage: template.energyPulseDamage
      ? Math.floor(template.energyPulseDamage * skillMultiplier)
      : undefined,
  };
};

/**
 * MonsterTemplate - Definition of base statistics and behavior for monsters
 *
 * Data model separation:
 * - MonsterTemplate: Base stats, behavior, and drop info for monsters in the game
 * - BossInfo (progression.ts): Metadata such as level cap increase and set item drops upon boss defeat
 *
 * Boss monsters are marked with isBoss=true, and additional metadata is retrieved from BOSS_DATABASE.
 */
export interface MonsterTemplate {
  id: string;
  name: string;
  description: string;
  maxHp: number;
  atk: number;
  expValue: number;
  color: string;
  speed: number;
  attackRange: number;
  attackCooldown: number;
  spriteUrl?: string;
  size: { x: number; y: number };
  hitboxSize: { x: number; y: number };
  hitboxOffset: { x: number; y: number }; // Added for offset positioning
  hpBarWidth: number;
  hpBarOffset: { x: number; y: number };
  def: number;
  drops: DropItem[]; // List of potential drops
  auraType?: 'defense_boost' | 'none';
  debuffType?: 'slow' | 'none';
  isStationary?: boolean; // If true, the monster will not move
  // Boss-specific properties (gameplay mechanics)
  isBoss?: boolean;
  shield?: number; // Ice Armor - damage absorption
  enrageThreshold?: number; // HP% to trigger enrage (0.25 = 25%)
  enrageAtkMultiplier?: number; // Attack multiplier when enraged
  enrageSpeedMultiplier?: number; // Speed multiplier when enraged
  glacierFallCooldown?: number; // Glacier fall cooldown in seconds
  glacierFallDamage?: number; // Damage per glacier fall
  glacierFallRadius?: number; // Radius of glacier fall
  glacierFallImpactTime?: number; // Time before impact in ms
  // New Melee Skill
  tailSwipeCooldown?: number;
  tailSwipeDamage?: number;
  tailSwipeRange?: number;
  tailSwipePreDelay?: number;
  attackPreDelay?: number; // Pre-delay for normal attacks in seconds
  // New Boss Skills (Lunacia Overseer)
  orbitalLaserCooldown?: number;
  orbitalLaserDamage?: number;
  orbitalLaserRadius?: number;
  orbitalLaserPreDelay?: number;
  energyPulseCooldown?: number;
  energyPulseDamage?: number;
  energyPulseRadius?: number;

  skillDescriptions?: { name: string; description: string }[];
}

export const MONSTER_DATABASE: Record<string, MonsterTemplate> = {
  slime: {
    id: 'slime',
    name: 'Slime',
    description: 'A common sticky creature found everywhere.',
    maxHp: 45,
    atk: 4,
    def: 0,
    expValue: 25,
    color: '#00ff00',
    speed: 80,
    attackRange: 40,
    attackCooldown: 1.5,
    spriteUrl: 'assets/Monsters/Slime.png',
    size: { x: 140, y: 70 },
    hitboxSize: { x: 50, y: 40 },
    hitboxOffset: { x: 5, y: 0 },
    hpBarWidth: 80,
    hpBarOffset: { x: 0, y: -45 },
    attackPreDelay: 0.6,

    drops: [
      { itemId: 'slime_jelly', chance: 8 },
      { itemId: 'red_potion', chance: 1 },
      { itemId: 'long_spear', chance: 1 },
    ],
  },
  goblin: {
    id: 'goblin',
    name: 'Goblin',
    description: 'A greedy and vile humanoid monster.',
    maxHp: 180,
    atk: 10,
    def: 3,
    expValue: 40,
    color: '#3cb371',
    speed: 120,
    attackRange: 50,
    attackCooldown: 1.2,
    spriteUrl: 'assets/Monsters/Goblin.png',
    size: { x: 200, y: 140 },
    hitboxSize: { x: 100, y: 120 },
    hitboxOffset: { x: 0, y: 0 },
    hpBarWidth: 100,
    hpBarOffset: { x: 0, y: -85 },
    attackPreDelay: 0.5,

    drops: [
      { itemId: 'iron_sword', chance: 3 },
      { itemId: 'red_potion', chance: 4 },
      { itemId: 'old_armor', chance: 3 },
    ],
  },
  bat: {
    id: 'bat',
    name: 'Bat',
    description: 'A small, fast monster living in the darkness of caves.',
    maxHp: 60,
    atk: 13,
    def: 2,
    expValue: 60,
    color: '#4b0082',
    speed: 400,
    attackRange: 30,
    attackCooldown: 1.0,
    spriteUrl: 'assets/Monsters/Bat.png',
    size: { x: 80, y: 70 },
    hitboxSize: { x: 50, y: 40 },
    hitboxOffset: { x: 0, y: 0 },
    hpBarWidth: 60,
    hpBarOffset: { x: 0, y: -25 },
    attackPreDelay: 0.3,

    drops: [
      { itemId: 'red_potion', chance: 1 },
      { itemId: 'blue_potion', chance: 1 },
      { itemId: 'bat_wing', chance: 8 },
    ],
  },
  yeti: {
    id: 'yeti',
    name: 'Yeti',
    description: 'A giant and powerful snow creature living in the mountains.',
    maxHp: 450,
    atk: 26,
    def: 15,
    expValue: 100,
    color: '#f0f8ff',
    speed: 100,
    attackRange: 60,
    attackCooldown: 2.0,
    spriteUrl: 'assets/Monsters/Yeti.png',
    size: { x: 375, y: 400 },
    hpBarWidth: 180,
    hpBarOffset: { x: 0, y: -100 },
    hitboxSize: { x: 200, y: 200 },
    hitboxOffset: { x: 0, y: 0 },

    drops: [
      { itemId: 'red_potion', chance: 0.5 },
      { itemId: 'enhance_stone', chance: 0.05 },
    ],
  },
  ice_spirit: {
    id: 'ice_spirit',
    name: 'Ice Spirit',
    description: 'A mysterious spirit made of pure cold.',
    maxHp: 300,
    atk: 24,
    def: 8,
    expValue: 100,
    color: '#070707ff',
    speed: 150,
    attackRange: 100,
    attackCooldown: 1.5,
    spriteUrl: 'assets/Monsters/IceSpirit.png',
    size: { x: 150, y: 150 },
    hpBarWidth: 100,
    hpBarOffset: { x: 0, y: -40 },
    hitboxSize: { x: 64, y: 64 },
    hitboxOffset: { x: 0, y: 0 },

    drops: [
      { itemId: 'blue_potion', chance: 0.5 },
      { itemId: 'enhance_stone', chance: 0.05 },
    ],
  },
  frost_dragon: {
    id: 'frost_dragon',
    name: 'Frost Dragon',
    description: 'An ancient ice dragon that slept deep within the ice caves.',
    maxHp: 35000,
    atk: 40,
    def: 30,
    expValue: 5000,
    color: '#87CEEB',
    speed: 80,
    attackRange: 200,
    attackCooldown: 2.5,
    spriteUrl: 'assets/Monsters/FrostDragon.png',
    size: { x: 500, y: 400 },
    hitboxSize: { x: 300, y: 250 },
    hitboxOffset: { x: 0, y: 0 },
    hpBarWidth: 300,
    hpBarOffset: { x: 0, y: -220 },

    drops: [
      { itemId: 'frost_blade', chance: 0.1 },
      { itemId: 'frost_armor', chance: 0.1 },
      { itemId: 'frost_helmet', chance: 0.1 },
      { itemId: 'enhance_stone', chance: 0.7 },
    ],
    // Boss-specific properties
    isBoss: true,
    isStationary: true,
    shield: 10000,
    enrageThreshold: 0.25,
    enrageAtkMultiplier: 2.0,
    enrageSpeedMultiplier: 1.6,
    glacierFallCooldown: 4,
    glacierFallDamage: 150,
    glacierFallRadius: 150,
    glacierFallImpactTime: 700, // 0.7s
    tailSwipeCooldown: 10,
    tailSwipeDamage: 200,
    tailSwipeRange: 200,
    tailSwipePreDelay: 1,

    skillDescriptions: [
      {
        name: 'Glacier Fall',
        description:
          'Summons giant ice chunks from the ceiling that crash down on the intruder.',
      },
      {
        name: 'Tail Swipe',
        description:
          'Swiftly swings its massive tail, dealing heavy damage to anything behind it.',
      },
      {
        name: 'Frost Armor',
        description:
          'Creates a thick layer of ice shield that absorbs a significant amount of damage.',
      },
    ],
  },
  // Proxima Luna Entities
  quantum_wraith: {
    id: 'quantum_wraith',
    name: 'Quantum Wraith',
    description: 'A transparent being with an unclear physical form.',
    maxHp: 1050,
    atk: 35,
    def: 15,
    expValue: 300,
    color: '#aaffff',
    speed: 140,
    attackRange: 60,
    attackCooldown: 1.5,
    spriteUrl: 'assets/Monsters/QuantumGhost.png',
    size: { x: 150, y: 150 },
    hpBarWidth: 100,
    hpBarOffset: { x: 0, y: -40 },
    hitboxSize: { x: 64, y: 64 },
    hitboxOffset: { x: 0, y: 0 },

    drops: [
      { itemId: 'phase_lens', chance: 0.15 },
      { itemId: 'blue_potion', chance: 0.2 },
    ],
  },
  optical_sentinel: {
    id: 'optical_sentinel',
    name: 'Optical Sentinel',
    description: 'An automated mechanical guard protecting the ancient ship.',
    maxHp: 2900,
    atk: 55,
    def: 30,
    expValue: 400,
    color: '#ff4444',
    speed: 100,
    attackRange: 200, // Long range laser
    attackCooldown: 3.0,
    spriteUrl: 'assets/Monsters/OpticalSentinel.png',
    size: { x: 350, y: 350 },
    hpBarWidth: 100,
    hpBarOffset: { x: 0, y: -100 },
    hitboxSize: { x: 150, y: 150 },
    hitboxOffset: { x: 0, y: 0 },

    drops: [
      { itemId: 'plasma_core', chance: 0.15 },
      { itemId: 'enhance_stone', chance: 0.05 },
    ],
  },
  grav_drifter: {
    id: 'grav_drifter',
    name: 'Gravity Drifter',
    description:
      'A mysterious jellyfish-like creature that floats by manipulating gravity.',
    maxHp: 1750,
    atk: 45,
    def: 25,
    expValue: 350,
    color: '#aa88ff',
    speed: 120,
    attackRange: 150,
    attackCooldown: 2.0,
    spriteUrl: 'assets/Monsters/GravDrifter.png',
    size: { x: 150, y: 150 },
    hpBarWidth: 100,
    hpBarOffset: { x: 0, y: -40 },
    hitboxSize: { x: 64, y: 64 },
    hitboxOffset: { x: 0, y: 0 },

    drops: [
      { itemId: 'grav_essence', chance: 0.12 },
      { itemId: 'red_potion', chance: 0.2 },
    ],
  },
  star_eater: {
    id: 'star_eater',
    name: 'Star Eater',
    description: 'A dark parasitic creature that devours surrounding energy.',
    maxHp: 2500,
    atk: 85,
    def: 35,
    expValue: 450,
    color: '#111111',
    speed: 90,
    attackRange: 150,
    attackCooldown: 2.5,
    spriteUrl: 'assets/Monsters/StarEater.png',
    size: { x: 400, y: 400 },
    hitboxSize: { x: 170, y: 170 },
    hitboxOffset: { x: 0, y: 0 },
    hpBarWidth: 90,
    hpBarOffset: { x: 0, y: -55 },

    drops: [
      { itemId: 'void_shard', chance: 0.08 },
      { itemId: 'enhance_stone', chance: 0.03 },
    ],
  },
  summoned_star_eater: {
    id: 'summoned_star_eater',
    name: 'Star Eater (Summon)',
    description: 'A parasitic creature summoned to protect its master.',
    maxHp: 2500,
    atk: 85,
    def: 35,
    expValue: 0,
    color: '#331133',
    speed: 110, // Slightly faster
    attackRange: 150,
    attackCooldown: 2.5,
    spriteUrl: 'assets/Monsters/StarEater.png',
    size: { x: 400, y: 400 },
    hitboxSize: { x: 170, y: 170 },
    hitboxOffset: { x: 0, y: 0 },
    hpBarWidth: 90,
    hpBarOffset: { x: 0, y: -55 },
    drops: [], // No drops
  },
  luna_overseer: {
    id: 'luna_overseer',
    name: 'Luna Overseer',
    description:
      'A giant mechanical weapon guarding the heart of Proxima Luna.',
    maxHp: 40000,
    atk: 150,
    def: 50,
    expValue: 10000,
    color: '#ffff00',
    speed: 120,
    attackRange: 250,
    attackCooldown: 3.5,
    spriteUrl: 'assets/Monsters/LunaOverseer.png',
    isBoss: true,
    shield: 20000,
    enrageThreshold: 0.3,
    enrageAtkMultiplier: 1.8,
    enrageSpeedMultiplier: 1.5,
    size: { x: 600, y: 500 },
    hitboxSize: { x: 250, y: 250 },
    hitboxOffset: { x: 0, y: 0 },
    hpBarWidth: 400,
    hpBarOffset: { x: 0, y: -280 },
    attackPreDelay: 0.8, // 전조 시간 추가

    // 보스 전용 패턴 스탯
    orbitalLaserCooldown: 8,
    orbitalLaserDamage: 450,
    orbitalLaserRadius: 120,
    orbitalLaserPreDelay: 1.5,

    energyPulseCooldown: 12,
    energyPulseDamage: 300,
    energyPulseRadius: 350,

    skillDescriptions: [
      {
        name: 'Orbital Laser',
        description:
          'Targets the player with a high-intensity laser from orbit. Move quickly to avoid the impact zone.',
      },
      {
        name: 'Energy Pulse',
        description:
          'Releases a massive electromagnetic shockwave that deals damage and knocks back nearby intruders.',
      },
      {
        name: 'Iron Shield',
        description:
          'Generates a heavy metallic shield to absorb incoming attacks.',
      },
    ],

    drops: [
      { itemId: 'overseer_heart', chance: 1.0 },
      { itemId: 'pulse_blade', chance: 0.4 },
      { itemId: 'titanium_armor', chance: 0.3 },
      { itemId: 'enhance_stone', chance: 1.0 },
    ],
  },
  // Aetheria Monsters
  sky_wisp: {
    id: 'sky_wisp',
    name: 'Sky Wisp',
    description: 'A pure wind spirit born within the clouds of Aetheria.',
    maxHp: 3500,
    atk: 110,
    def: 35,
    expValue: 1200,
    color: '#87ceeb',
    speed: 180,
    attackRange: 70,
    attackCooldown: 1.8,
    spriteUrl: 'assets/Monsters/SkyWisp.png',
    size: { x: 80, y: 80 },
    hitboxSize: { x: 50, y: 50 },
    hitboxOffset: { x: 0, y: 0 },
    hpBarWidth: 70,
    hpBarOffset: { x: 0, y: -45 },

    drops: [
      { itemId: 'wind_essence', chance: 0.4 },
      { itemId: 'blue_potion', chance: 0.2 },
    ],
  },
  cloud_guardian: {
    id: 'cloud_guardian',
    name: 'Cloud Guardian',
    description: "A giant cloud creature guarding Aetheria's floating islands.",
    maxHp: 5200,
    atk: 140,
    def: 60,
    expValue: 1800,
    color: '#f0f8ff',
    speed: 100,
    attackRange: 120,
    attackCooldown: 2.2,
    spriteUrl: 'assets/Monsters/CloudGuardian.png',
    size: { x: 120, y: 100 },
    hitboxSize: { x: 80, y: 70 },
    hitboxOffset: { x: 0, y: 0 },
    hpBarWidth: 100,
    hpBarOffset: { x: 0, y: -60 },

    drops: [
      { itemId: 'cloud_crystal', chance: 0.25 },
      { itemId: 'wind_essence', chance: 0.3 },
      { itemId: 'enhance_stone', chance: 0.08 },
    ],
  },
  storm_elemental: {
    id: 'storm_elemental',
    name: 'Storm Elemental',
    description:
      'A powerful atmospheric spirit that controls lightning and wind.',
    maxHp: 7500,
    atk: 180,
    def: 50,
    expValue: 2500,
    color: '#4169e1',
    speed: 140,
    attackRange: 150,
    attackCooldown: 2.5,
    spriteUrl: 'assets/Monsters/StormElemental.png',
    size: { x: 100, y: 120 },
    hitboxSize: { x: 70, y: 90 },
    hitboxOffset: { x: 0, y: 0 },
    hpBarWidth: 120,
    hpBarOffset: { x: 0, y: -70 },

    drops: [
      { itemId: 'storm_core', chance: 0.15 },
      { itemId: 'lightning_shard', chance: 0.2 },
      { itemId: 'wind_essence', chance: 0.4 },
    ],
    debuffType: 'slow',
  },
  aether_drake: {
    id: 'aether_drake',
    name: 'Aether Drake',
    description: 'An elegant dragonoid ruling the skies of Aetheria.',
    maxHp: 11000,
    atk: 250,
    def: 80,
    expValue: 4000,
    color: '#9370db',
    speed: 160,
    attackRange: 180,
    attackCooldown: 3.0,
    spriteUrl: 'assets/Monsters/AetherDrake.png',
    size: { x: 150, y: 120 },
    hitboxSize: { x: 100, y: 80 },
    hitboxOffset: { x: 0, y: 0 },
    hpBarWidth: 140,
    hpBarOffset: { x: 0, y: -80 },

    drops: [
      { itemId: 'drake_scale', chance: 0.3 },
      { itemId: 'aether_gem', chance: 0.12 },
      { itemId: 'storm_core', chance: 0.08 },
      { itemId: 'enhance_stone', chance: 0.15 },
    ],
  },
  celestial_architect: {
    id: 'celestial_architect',
    name: 'Celestial Architect',
    description:
      'The remains of an ancient being that created Aetheria. It can manipulate space.',
    maxHp: 350000,
    atk: 1200,
    def: 280,
    expValue: 200000,
    color: '#ffd700',
    speed: 110,
    attackRange: 300,
    attackCooldown: 4.0,
    isBoss: true,
    isStationary: true,
    shield: 50000,
    enrageThreshold: 0.35,
    enrageAtkMultiplier: 1.6,
    enrageSpeedMultiplier: 1.4,
    size: { x: 400, y: 350 },
    hitboxSize: { x: 250, y: 200 },
    hitboxOffset: { x: 0, y: 0 },
    hpBarWidth: 300,
    hpBarOffset: { x: 0, y: -200 },

    skillDescriptions: [
      {
        name: 'Dimension Blade',
        description: 'Strikes through space to hit targets from a distance.',
      },
      {
        name: 'Void Pull',
        description:
          'Creates a gravitational anomaly that pulls stars and enemies alike.',
      },
      {
        name: "Architect's Will",
        description:
          "The ancient creator's presence strengthens its own defenses.",
      },
    ],

    drops: [
      { itemId: 'architect_core', chance: 1.0 },
      { itemId: 'celestial_blade', chance: 0.3 },
      { itemId: 'sky_weaver_robe', chance: 0.25 },
      { itemId: 'aether_gem', chance: 0.8 },
      { itemId: 'enhance_stone', chance: 1.0 },
    ],
  },
  training_dummy: {
    id: 'training_dummy',
    name: 'Training Dummy',
    description: 'A dummy made for target practice.',
    maxHp: 10000000,
    atk: 0,
    def: 0,
    expValue: 0,
    color: '#8b4513',
    speed: 0,
    attackRange: 0,
    attackCooldown: 0,
    spriteUrl: 'assets/Monsters/TrainingDummy.png', // Temporarily use slime image
    size: { x: 250, y: 250 },
    hitboxSize: { x: 80, y: 120 },
    hitboxOffset: { x: 0, y: 0 },
    hpBarWidth: 100,
    hpBarOffset: { x: 0, y: -60 },

    isStationary: true,
    drops: [],
  },
};
