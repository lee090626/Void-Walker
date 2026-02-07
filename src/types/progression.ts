export interface SetItem {
  id: string;
  name: string;
  description: string;
  pieces: SetItemPiece[];
  bonuses: {
    twopiece?: SetBonus;
    threepice?: SetBonus;
    fourpiece?: SetBonus;
  };
  requiredLevel: number;
  bossSource: string; // Boss ID that drops this set
}

export interface SetItemPiece {
  itemId: string;
  type: 'Weapon' | 'Armor' | 'Helmet';
  setId: string;
}

export interface SetBonus {
  atk?: number;
  def?: number;
  maxHp?: number;
  maxMp?: number;
  speed?: number;
  critChance?: number;
  critDamage?: number;
  expBonus?: number;
  goldBonus?: number;
  dropRateBonus?: number;
}

// Boss Set Item Database
// Order: Earth -> Proxima Luna -> Aetheria -> Ignis Prime -> Xylos
export const BOSS_SET_DATABASE: Record<string, SetItem> = {
  // Earth - Frost Dragon Set (Ice Cave)
  frost_dragon_set: {
    id: 'frost_dragon_set',
    name: 'Frost Dragon Set',
    description:
      'A mysterious set from the ancient Frost Dragon of the Ice Cave',
    requiredLevel: 25,
    bossSource: 'frost_dragon',
    pieces: [
      {
        itemId: 'frost_blade',
        type: 'Weapon',
        setId: 'frost_dragon_set',
      },
      {
        itemId: 'frost_armor',
        type: 'Armor',
        setId: 'frost_dragon_set',
      },
      {
        itemId: 'frost_helmet',
        type: 'Helmet',
        setId: 'frost_dragon_set',
      },
    ],
    bonuses: {
      twopiece: {
        atk: 50,
        def: 15,
      },
      threepice: {
        atk: 100,
        def: 30,
        maxHp: 200,
        critChance: 0.05,
      },
    },
  },

  // Proxima Luna - Luna Overseer Set
  luna_overseer_set: {
    id: 'luna_overseer_set',
    name: 'Luna Overseer Set',
    description:
      'Set from the robotic weapon that guarded the heart of Proxima Luna',
    requiredLevel: 28,
    bossSource: 'luna_overseer',
    pieces: [
      {
        itemId: 'pulse_blade',
        type: 'Weapon',
        setId: 'luna_overseer_set',
      },
      {
        itemId: 'titanium_armor',
        type: 'Armor',
        setId: 'luna_overseer_set',
      },
      {
        itemId: 'luna_goggles',
        type: 'Helmet',
        setId: 'luna_overseer_set',
      },
    ],
    bonuses: {
      twopiece: {
        atk: 60,
        def: 35,
        speed: 20,
      },
      threepice: {
        atk: 120,
        def: 70,
        maxHp: 250,
        speed: 40,
        goldBonus: 0.25,
      },
    },
  },

  // Proxima Luna - Luna Overseer Final Set (Future)
  luna_overseer_final_set: {
    id: 'luna_overseer_final_set',
    name: 'Luna Overseer Final Set',
    description: 'Set containing the true power of the Luna Overseer',
    requiredLevel: 35,
    bossSource: 'luna_overseer_final',
    pieces: [
      {
        itemId: 'pulse_blade_final',
        type: 'Weapon',
        setId: 'luna_overseer_final_set',
      },
      {
        itemId: 'titanium_armor_final',
        type: 'Armor',
        setId: 'luna_overseer_final_set',
      },
      {
        itemId: 'luna_goggles_final',
        type: 'Helmet',
        setId: 'luna_overseer_final_set',
      },
    ],
    bonuses: {
      twopiece: {
        atk: 100,
        def: 60,
        speed: 40,
      },
      threepice: {
        atk: 200,
        def: 120,
        maxHp: 400,
        speed: 60,
        goldBonus: 0.4,
      },
    },
  },

  // Aetheria - Celestial Architect Set
  celestial_architect_set: {
    id: 'celestial_architect_set',
    name: 'Celestial Architect Set',
    description: 'Sacred set worn by the Celestial Architect',
    requiredLevel: 40,
    bossSource: 'celestial_architect',
    pieces: [
      {
        itemId: 'celestial_blade',
        type: 'Weapon',
        setId: 'celestial_architect_set',
      },
      {
        itemId: 'sky_weaver_robe',
        type: 'Armor',
        setId: 'celestial_architect_set',
      },
      {
        itemId: 'celestial_crown',
        type: 'Helmet',
        setId: 'celestial_architect_set',
      },
    ],
    bonuses: {
      twopiece: {
        atk: 80,
        def: 25,
        speed: 30,
      },
      threepice: {
        atk: 150,
        def: 50,
        maxHp: 300,
        speed: 50,
        expBonus: 0.2,
      },
    },
  },

  // Aetheria - Aetheria Supreme Set (Future)
  aetheria_supreme_set: {
    id: 'aetheria_supreme_set',
    name: 'Aetheria Supreme Set',
    description: 'The ultimate set containing all the power of Aetheria',
    requiredLevel: 50,
    bossSource: 'aetheria_supreme',
    pieces: [
      {
        itemId: 'celestial_blade_supreme',
        type: 'Weapon',
        setId: 'aetheria_supreme_set',
      },
      {
        itemId: 'sky_weaver_robe_supreme',
        type: 'Armor',
        setId: 'aetheria_supreme_set',
      },
      {
        itemId: 'celestial_crown_supreme',
        type: 'Helmet',
        setId: 'aetheria_supreme_set',
      },
    ],
    bonuses: {
      twopiece: {
        atk: 150,
        def: 50,
        speed: 60,
      },
      threepice: {
        atk: 250,
        def: 100,
        maxHp: 500,
        speed: 80,
        expBonus: 0.3,
      },
    },
  },

  // Ignis Prime - Ignis Overlord Set
  ignis_overlord_set: {
    id: 'ignis_overlord_set',
    name: 'Ignis Overlord Set',
    description: 'A powerful set born in the lava of the volcanic planet',
    requiredLevel: 60,
    bossSource: 'ignis_overlord',
    pieces: [
      {
        itemId: 'inferno_blade',
        type: 'Weapon',
        setId: 'ignis_overlord_set',
      },
      {
        itemId: 'magma_armor',
        type: 'Armor',
        setId: 'ignis_overlord_set',
      },
      {
        itemId: 'inferno_crown',
        type: 'Helmet',
        setId: 'ignis_overlord_set',
      },
    ],
    bonuses: {
      twopiece: {
        atk: 120,
        def: 40,
        critDamage: 0.2,
      },
      threepice: {
        atk: 200,
        def: 80,
        maxHp: 400,
        critChance: 0.1,
        critDamage: 0.4,
      },
    },
  },

  // Ignis Prime - Ignis Emperor Set (Future)
  ignis_emperor_set: {
    id: 'ignis_emperor_set',
    name: 'Ignis Emperor Set',
    description: 'Set of the absolute ruler of Ignis Prime',
    requiredLevel: 70,
    bossSource: 'ignis_emperor',
    pieces: [
      {
        itemId: 'inferno_blade_emperor',
        type: 'Weapon',
        setId: 'ignis_emperor_set',
      },
      {
        itemId: 'magma_armor_emperor',
        type: 'Armor',
        setId: 'ignis_emperor_set',
      },
      {
        itemId: 'inferno_crown_emperor',
        type: 'Helmet',
        setId: 'ignis_emperor_set',
      },
    ],
    bonuses: {
      twopiece: {
        atk: 200,
        def: 80,
        critDamage: 0.3,
      },
      threepice: {
        atk: 350,
        def: 150,
        maxHp: 600,
        critChance: 0.15,
        critDamage: 0.6,
      },
    },
  },

  // Xylos - Xylos Guardian Set (Future)
  xylos_guardian_set: {
    id: 'xylos_guardian_set',
    name: 'Xylos Guardian Set',
    description: 'Set worn by the guardian of Xylos',
    requiredLevel: 80,
    bossSource: 'xylos_guardian',
    pieces: [
      {
        itemId: 'jungle_blade_guardian',
        type: 'Weapon',
        setId: 'xylos_guardian_set',
      },
      {
        itemId: 'jungle_armor_guardian',
        type: 'Armor',
        setId: 'xylos_guardian_set',
      },
      {
        itemId: 'jungle_crown_guardian',
        type: 'Helmet',
        setId: 'xylos_guardian_set',
      },
    ],
    bonuses: {
      twopiece: {
        atk: 180,
        def: 70,
        speed: 50,
      },
      threepice: {
        atk: 300,
        def: 140,
        maxHp: 550,
        speed: 70,
        dropRateBonus: 0.25,
      },
    },
  },

  // Xylos - Xylos Sovereign Set
  xylos_sovereign_set: {
    id: 'xylos_sovereign_set',
    name: 'Xylos Sovereign Set',
    description: 'A mysterious set worn by the King of the Jungle',
    requiredLevel: 90,
    bossSource: 'xylos_sovereign',
    pieces: [
      {
        itemId: 'jungle_blade',
        type: 'Weapon',
        setId: 'xylos_sovereign_set',
      },
      {
        itemId: 'jungle_armor',
        type: 'Armor',
        setId: 'xylos_sovereign_set',
      },
      {
        itemId: 'jungle_crown',
        type: 'Helmet',
        setId: 'xylos_sovereign_set',
      },
    ],
    bonuses: {
      twopiece: {
        atk: 250,
        def: 100,
        speed: 60,
      },
      threepice: {
        atk: 400,
        def: 200,
        maxHp: 700,
        speed: 80,
        dropRateBonus: 0.4,
      },
    },
  },
};

// Boss Info (Metadata for monsters with isBoss=true in MonsterTemplate)
// Order: Earth -> Proxima Luna -> Aetheria -> Ignis Prime -> Xylos
export interface BossInfo {
  id: string; // MonsterTemplate.id와 동일
  name: string; // MonsterTemplate.name과 동일
  mapId: string; // 보스가 위치한 맵
  setItemId: string; // 드롭하는 세트 아이템 ID
  rewards: {
    exp: number; // 보스 처치 시 추가 보상 (MonsterTemplate.expValue와 별도)
    gold: number; // 보스 처치 시 추가 보상
  };
}

// Boss Database - Metadata for monsters with isBoss=true in MonsterTemplate
// Order: Earth -> Proxima Luna -> Aetheria -> Ignis Prime -> Xylos
export const BOSS_DATABASE: Record<string, BossInfo> = {
  // Earth - Ice Cave (End of Base Game)
  frost_dragon: {
    id: 'frost_dragon',
    name: 'Frost Dragon',
    mapId: 'ice_cave',
    setItemId: 'frost_dragon_set',
    rewards: {
      exp: 3000,
      gold: 1000,
    },
  },

  // Proxima Luna - First Planet
  luna_overseer: {
    id: 'luna_overseer',
    name: 'Luna Overseer',
    mapId: 'proxima_core',
    setItemId: 'luna_overseer_set',
    rewards: {
      exp: 5000,
      gold: 2000,
    },
  },
  luna_overseer_final: {
    id: 'luna_overseer_final',
    name: 'Luna Overseer (Final)',
    mapId: 'proxima_core',
    setItemId: 'luna_overseer_final_set',
    rewards: {
      exp: 10000,
      gold: 5000,
    },
  },

  // Aetheria - Second Planet
  celestial_architect: {
    id: 'celestial_architect',
    name: 'Celestial Architect',
    mapId: 'celestial_sanctum',
    setItemId: 'celestial_architect_set',
    rewards: {
      exp: 20000,
      gold: 10000,
    },
  },
  aetheria_supreme: {
    id: 'aetheria_supreme',
    name: 'Aetheria Supreme Being',
    mapId: 'celestial_sanctum',
    setItemId: 'aetheria_supreme_set',
    rewards: {
      exp: 30000,
      gold: 15000,
    },
  },

  // Ignis Prime - Third Planet
  ignis_overlord: {
    id: 'ignis_overlord',
    name: 'Ignis Overlord',
    mapId: 'ignis_prime',
    setItemId: 'ignis_overlord_set',
    rewards: {
      exp: 50000,
      gold: 25000,
    },
  },
  ignis_emperor: {
    id: 'ignis_emperor',
    name: 'Ignis Emperor',
    mapId: 'ignis_prime',
    setItemId: 'ignis_emperor_set',
    rewards: {
      exp: 75000,
      gold: 40000,
    },
  },

  // Xylos - Fourth Planet
  xylos_guardian: {
    id: 'xylos_guardian',
    name: 'Xylos Guardian',
    mapId: 'xylos',
    setItemId: 'xylos_guardian_set',
    rewards: {
      exp: 100000,
      gold: 60000,
    },
  },
  xylos_sovereign: {
    id: 'xylos_sovereign',
    name: 'Xylos Sovereign',
    mapId: 'xylos',
    setItemId: 'xylos_sovereign_set',
    rewards: {
      exp: 150000,
      gold: 100000,
    },
  },
};

/**
 * Helper function to retrieve boss info
 * Returns metadata for monsters with isBoss=true in MonsterTemplate.
 * @param monsterId - Monster ID
 * @returns BossInfo or undefined
 */
export function getBossInfo(monsterId: string): BossInfo | undefined {
  return BOSS_DATABASE[monsterId];
}
