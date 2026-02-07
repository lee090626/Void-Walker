export interface SkillDefinition {
  id: keyof PlayerSkills;
  name: string;
  category: 'combat' | 'survival' | 'utility';
  description: string;
  maxLevel: number;
  effectPerLevel: number;
  effectUnit: '%' | 'HP' | 'HP/s';
}

export interface PlayerSkills {
  // Combat (2)
  critDamage: number; // 0-20
  attackSpeed: number; // 0-20

  // Survival (3)
  maxHpBonus: number; // 0-30
  defenseBonus: number; // 0-20
  hpRegen: number; // 0-20

  // Utility (4)
  expBonus: number; // 0-20
  dropRate: number; // 0-20
  goldBonus: number; // 0-20
  moveSpeed: number; // 0-10
}

export const INITIAL_SKILLS: PlayerSkills = {
  critDamage: 0,
  attackSpeed: 0,
  maxHpBonus: 0,
  defenseBonus: 0,
  hpRegen: 0,
  expBonus: 0,
  dropRate: 0,
  goldBonus: 0,
  moveSpeed: 0,
};

export const SKILL_DEFINITIONS: SkillDefinition[] = [
  // Combat
  {
    id: 'critDamage',
    name: 'Crit Damage',
    category: 'combat',
    description: 'Increases extra damage dealt on critical hits.',
    maxLevel: 20,
    effectPerLevel: 10,
    effectUnit: '%',
  },
  {
    id: 'attackSpeed',
    name: 'Attack Speed',
    category: 'combat',
    description: 'Decreases attack cooldown.',
    maxLevel: 20,
    effectPerLevel: 4,
    effectUnit: '%',
  },

  // Survival
  {
    id: 'maxHpBonus',
    name: 'Max HP',
    category: 'survival',
    description: 'Increases maximum Health Points.',
    maxLevel: 30,
    effectPerLevel: 100,
    effectUnit: 'HP',
  },
  {
    id: 'defenseBonus',
    name: 'Defense',
    category: 'survival',
    description: 'Increases defense by a percentage.',
    maxLevel: 20,
    effectPerLevel: 5,
    effectUnit: '%',
  },
  {
    id: 'hpRegen',
    name: 'HP Regen',
    category: 'survival',
    description: 'Increases health regeneration per second.',
    maxLevel: 20,
    effectPerLevel: 1,
    effectUnit: 'HP/s',
  },

  // Utility
  {
    id: 'expBonus',
    name: 'EXP Bonus',
    category: 'utility',
    description: 'Increases experience gains.',
    maxLevel: 20,
    effectPerLevel: 10,
    effectUnit: '%',
  },
  {
    id: 'dropRate',
    name: 'Drop Rate',
    category: 'utility',
    description: 'Increases item drop probability.',
    maxLevel: 20,
    effectPerLevel: 10,
    effectUnit: '%',
  },
  {
    id: 'goldBonus',
    name: 'Gold Bonus',
    category: 'utility',
    description: 'Increases gold gains.',
    maxLevel: 20,
    effectPerLevel: 15,
    effectUnit: '%',
  },
  {
    id: 'moveSpeed',
    name: 'Move Speed',
    category: 'utility',
    description: 'Increases character movement speed.',
    maxLevel: 10,
    effectPerLevel: 8,
    effectUnit: '%',
  },
];

/**
 * Calculate skill points gained for a specific level
 * Lv.1-49: 1 point per level
 * Lv.50, 60, 70, ...: 4 points (1 base + 3 bonus)
 */
export const calculateSkillPointsForLevel = (level: number): number => {
  // New rule: 5 points every 10 levels starting from 50 (50, 60, 70...)
  if (level >= 50 && level % 10 === 0) {
    return 5;
  }

  return 0;
};

/**
 * Get skill definition by ID
 */
export const getSkillDefinition = (
  skillId: keyof PlayerSkills,
): SkillDefinition | undefined => {
  return SKILL_DEFINITIONS.find((def) => def.id === skillId);
};

/**
 * Get skills by category
 */
export const getSkillsByCategory = (
  category: 'combat' | 'survival' | 'utility',
): SkillDefinition[] => {
  return SKILL_DEFINITIONS.filter((def) => def.category === category);
};
