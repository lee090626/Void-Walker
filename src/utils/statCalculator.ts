import type { Player } from '../types/game';

export interface StatBreakdown {
  base: number;
  equipment: {
    weapon: number;
    armor: number;
    helmet: number;
    total: number;
  };
  skills: {
    [skillName: string]: number;
    total: number;
  };
  total: number;
}

export interface AllStatBreakdowns {
  atk: StatBreakdown;
  def: StatBreakdown;
  maxHp: StatBreakdown;
  maxMp: StatBreakdown;
  speed: StatBreakdown;
  // Skill effect percentages
  critDamage: { current: number; base: number };
  attackSpeed: { current: number; base: number };
  hpRegen: { current: number };
  expBonus: { current: number };
  dropRate: { current: number };
  goldBonus: { current: number };
}

export function calculateStatBreakdown(player: Player): AllStatBreakdowns {
  const {
    stats = { str: 1, dex: 1, int: 1, vit: 1, def: 1 },
    equipment,
    skills,
    level: playerLevel = 1,
  } = player;
  const { str = 1, dex = 1, int = 1, vit = 1, def = 1 } = stats;

  // ===== ATK =====
  // ===== ATK =====
  const baseAtk = 10 + str * 6 + playerLevel * 4;
  const weaponAtk = equipment.weapon?.atk || 0;
  const weaponEnhance = equipment.weapon?.enhanceLevel
    ? weaponAtk * equipment.weapon.enhanceLevel * 0.1
    : 0;
  const totalWeaponAtk = weaponAtk + weaponEnhance;

  const atkBreakdown: StatBreakdown = {
    base: baseAtk,
    equipment: {
      weapon: totalWeaponAtk,
      armor: 0,
      helmet: 0,
      total: totalWeaponAtk,
    },
    skills: {
      total: 0,
    },
    total: baseAtk + totalWeaponAtk,
  };

  // ===== DEF =====
  // ===== DEF =====
  const baseDef = 10 + def * 2 + playerLevel * 0.5;

  const armorDef = equipment.armor?.def || 0;
  const armorEnhance = equipment.armor?.enhanceLevel
    ? armorDef * equipment.armor.enhanceLevel * 0.1
    : 0;
  const totalArmorDef = armorDef + armorEnhance;

  const helmetDef = equipment.helmet?.def || 0;
  const helmetEnhance = equipment.helmet?.enhanceLevel
    ? helmetDef * equipment.helmet.enhanceLevel * 0.1
    : 0;
  const totalHelmetDef = helmetDef + helmetEnhance;

  const baseDefWithEquip = baseDef + totalArmorDef + totalHelmetDef;

  // Apply defense skill bonus
  const defenseMultiplier = 1 + skills.defenseBonus * 0.05;
  const skillDefBonus = Math.floor(baseDefWithEquip * (defenseMultiplier - 1));

  const defBreakdown: StatBreakdown = {
    base: baseDef,
    equipment: {
      weapon: 0,
      armor: totalArmorDef,
      helmet: totalHelmetDef,
      total: totalArmorDef + totalHelmetDef,
    },
    skills: {
      'Defense Skill': skillDefBonus,
      total: skillDefBonus,
    },
    total: Math.floor(baseDefWithEquip * defenseMultiplier),
  };

  // ===== MAX HP =====
  // ===== MAX HP =====
  const baseMaxHp = 100 + vit * 150 + playerLevel * 60;
  const skillHpBonus = skills.maxHpBonus * 100;

  const maxHpBreakdown: StatBreakdown = {
    base: baseMaxHp,
    equipment: {
      weapon: 0,
      armor: 0,
      helmet: 0,
      total: 0,
    },
    skills: {
      'Max HP Skill': skillHpBonus,
      total: skillHpBonus,
    },
    total: baseMaxHp + skillHpBonus,
  };

  // ===== MAX MP =====
  const baseMaxMp = 50 + int * 25 + playerLevel * 2;

  const maxMpBreakdown: StatBreakdown = {
    base: baseMaxMp,
    equipment: {
      weapon: 0,
      armor: 0,
      helmet: 0,
      total: 0,
    },
    skills: {
      total: 0,
    },
    total: baseMaxMp,
  };

  // ===== SPEED =====
  const baseSpeed = 200 + dex * 5;
  const speedMultiplier = 1 + skills.moveSpeed * 0.08;
  const skillSpeedBonus = Math.floor(baseSpeed * (speedMultiplier - 1));

  const speedBreakdown: StatBreakdown = {
    base: baseSpeed,
    equipment: {
      weapon: 0,
      armor: 0,
      helmet: 0,
      total: 0,
    },
    skills: {
      'Move Speed Skill': skillSpeedBonus,
      total: skillSpeedBonus,
    },
    total: Math.floor(baseSpeed * speedMultiplier),
  };

  // ===== SKILL EFFECTS =====
  const critDamageBonus = skills.critDamage * 10; // percentage
  const attackSpeedBonus = skills.attackSpeed * 4; // percentage
  const hpRegenRate = skills.hpRegen * 1; // HP/s
  const expBonusPercent = skills.expBonus * 10; // percentage
  const dropRatePercent = skills.dropRate * 10; // percentage
  const goldBonusPercent = skills.goldBonus * 15; // percentage

  return {
    atk: atkBreakdown,
    def: defBreakdown,
    maxHp: maxHpBreakdown,
    maxMp: maxMpBreakdown,
    speed: speedBreakdown,
    critDamage: { current: 150 + critDamageBonus, base: 150 },
    attackSpeed: { current: attackSpeedBonus, base: 0 },
    hpRegen: { current: hpRegenRate },
    expBonus: { current: expBonusPercent },
    dropRate: { current: dropRatePercent },
    goldBonus: { current: goldBonusPercent },
  };
}
