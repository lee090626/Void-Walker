export type ItemType = 'Weapon' | 'Potion' | 'Material' | 'Armor';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  description: string;
  price: number;
  stackable: boolean;
  icon?: string;
  size?: { x: number; y: number };
  worldSize?: { x: number; y: number };
  inventorySize?: { x: number; y: number };
  quickBarSize?: { x: number; y: number };
}

export interface Weapon extends Item {
  type: 'Weapon';
  atk: number;
  range: number;
  swingArc: number;
  speed: number;
  weaponType: 'Sword' | 'Spear' | 'Bow';
}

export interface Potion extends Item {
  type: 'Potion';
  hpRestore?: number;
  mpRestore?: number;
}

export interface Armor extends Item {
  type: 'Armor';
  def: number;
}

export const ITEM_DATABASE: Record<string, Item> = {
  basic_sword: {
    id: 'basic_sword',
    name: '낡은 검',
    type: 'Weapon',
    description: '베기 적합한 낡고 무거운 검입니다.',
    price: 10,
    stackable: true,
    atk: 5,
    range: 60,
    speed: 0.4,
    weaponType: 'Sword',
    icon: 'assets/Items/BasicSword.png',
    size: { x: 32, y: 32 },
    worldSize: { x: 128, y: 128 },
    inventorySize: { x: 128, y: 128 },
    quickBarSize: { x: 54, y: 54 },
  } as Weapon,
  long_spear: {
    id: 'long_spear',
    name: '부러진 창',
    type: 'Weapon',
    description: '사거리가 긴 부러진 나무 창입니다.',
    price: 15,
    stackable: true,
    atk: 7,
    range: 120,
    speed: 2.5,
    weaponType: 'Spear',
    icon: 'assets/Items/LongSpear.png',
    size: { x: 40, y: 40 },
    worldSize: { x: 128, y: 128 },
    inventorySize: { x: 128, y: 128 },
    quickBarSize: { x: 54, y: 54 },
  } as Weapon,
  iron_sword: {
    id: 'iron_sword',
    name: '철검',
    type: 'Weapon',
    description: '잘 제련된 단단한 철제 검입니다.',
    price: 100,
    stackable: true,
    atk: 15,
    range: 60,
    speed: 4.0,
    weaponType: 'Sword',
    icon: 'assets/Items/IronSword.png',
    size: { x: 32, y: 32 },
    worldSize: { x: 128, y: 128 },
    inventorySize: { x: 128, y: 128 },
    quickBarSize: { x: 54, y: 54 },
  } as Weapon,
  old_armor: {
    id: 'old_armor',
    name: '낡은 갑옷',
    type: 'Armor',
    description: '군데군데 녹슬었지만 몸을 보호하기엔 충분합니다.',
    price: 50,
    stackable: true,
    def: 5,
    icon: 'assets/Items/OldArmor.png',
    size: { x: 32, y: 32 },
    worldSize: { x: 128, y: 128 },
    inventorySize: { x: 128, y: 128 },
    quickBarSize: { x: 54, y: 54 },
  } as Armor,
  slime_jelly: {
    id: 'slime_jelly',
    name: '슬라임 젤리',
    type: 'Material',
    description: '끈적끈적한 슬라임의 잔해입니다.',
    price: 20**10,
    stackable: true,
    icon: 'assets/Items/SlimeJelly.png',
    size: { x: 20, y: 20 },
    worldSize: { x: 76, y: 96 },
    inventorySize: { x: 128, y: 128 },
    quickBarSize: { x: 128, y: 128 },
  },
  bat_wing: {
    id: 'bat_wing',
    name: '박쥐 날개',
    type: 'Material',
    description: '박쥐의 얇고 질긴 가죽 날개입니다.',
    price: 5,
    stackable: true,
    icon: 'assets/Items/BatWing.png',
    size: { x: 20, y: 20 },
    worldSize: { x: 76, y: 96 },
    inventorySize: { x: 128, y: 128 },
    quickBarSize: { x: 54, y: 54 },
  },
  red_potion: {
    id: 'red_potion',
    name: '빨간 포션',
    type: 'Potion',
    description: '체력을 100 회복시켜주는 물약입니다.',
    price: 20,
    stackable: true,
    hpRestore: 100,
    icon: 'assets/Items/RedPotion.png',
    size: { x: 20, y: 20 },
    worldSize: { x: 76, y: 96 },
    inventorySize: { x: 128, y: 128 },
    quickBarSize: { x: 54, y: 54 },
  } as Potion,
  blue_potion: {
    id: 'blue_potion',
    name: '파란 포션',
    type: 'Potion',
    description: '마나를 50 회복시켜주는 물약입니다.',
    price: 30,
    stackable: true,
    mpRestore: 50,
    icon: 'assets/Items/BluePotion.png',
    size: { x: 20, y: 20 },
    worldSize: { x: 76, y: 96 },
    inventorySize: { x: 128, y: 128 },
    quickBarSize: { x: 54, y: 54 },
  } as Potion,
  return_scroll: {
    id: 'return_scroll',
    name: '마을 귀환서',
    type: 'Potion',
    description: '사용 시 즉시 마을로 귀환합니다.',
    price: 50,
    stackable: true,
    icon: 'assets/Items/ReturnScroll.png',
    size: { x: 20, y: 20 },
    worldSize: { x: 76, y: 96 },
    inventorySize: { x: 128, y: 128 },
    quickBarSize: { x: 54, y: 54 },
  } as Potion,
  enhance_stone: {
    id: 'enhance_stone',
    name: '강화석',
    type: 'Material',
    description: '장비를 강화하는 데 사용되는 신비한 돌입니다.',
    price: 100,
    stackable: true,
    icon: 'assets/Items/EnhanceStone.png',
    size: { x: 20, y: 20 },
    worldSize: { x: 76, y: 96 },
    inventorySize: { x: 128, y: 128 },
    quickBarSize: { x: 54, y: 54 },
  },
};

export const WEAPON_DATABASE = ITEM_DATABASE;
