export type ItemType = 'Weapon' | 'Potion' | 'Material' | 'Armor';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  description: string;
  price: number;
  stackable: boolean;
  icon?: string;
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
    stackable: true, // Changed to true
    atk: 5,
    range: 60,
    swingArc: 90,
    speed: 0.4,
    weaponType: 'Sword',
  } as Weapon,
  long_spear: {
    id: 'long_spear',
    name: '부러진 창',
    type: 'Weapon',
    description: '사거리가 긴 부러진 나무 창입니다.',
    price: 15,
    stackable: true, // Changed to true
    atk: 7,
    range: 60,
    swingArc: 30,
    speed: 2.5,
    weaponType: 'Spear',
  } as Weapon,
  iron_sword: {
    id: 'iron_sword',
    name: '철검',
    type: 'Weapon',
    description: '잘 제련된 단단한 철제 검입니다.',
    price: 100,
    stackable: true, // Changed to true
    atk: 15,
    range: 45,
    swingArc: 100,
    speed: 4.0,
    weaponType: 'Sword',
  } as Weapon,
  old_armor: {
    id: 'old_armor',
    name: '낡은 갑옷',
    type: 'Armor',
    description: '군데군데 녹슬었지만 몸을 보호하기엔 충분합니다.',
    price: 50,
    stackable: true, // Changed to true
    def: 5,
  } as Armor,
  slime_jelly: {
    id: 'slime_jelly',
    name: '슬라임 젤리',
    type: 'Material',
    description: '끈적끈적한 슬라임의 잔해입니다.',
    price: 20 ** 10,
    stackable: true,
  },
  bat_wing: {
    id: 'bat_wing',
    name: '박쥐 날개',
    type: 'Material',
    description: '박쥐의 얇고 질긴 가죽 날개입니다.',
    price: 5,
    stackable: true,
  },
  red_potion: {
    id: 'red_potion',
    name: '빨간 포션',
    type: 'Potion',
    description: '체력을 30 회복시켜주는 물약입니다.',
    price: 20,
    stackable: true,
    hpRestore: 30,
  } as Potion,
  blue_potion: {
    id: 'blue_potion',
    name: '파란 포션',
    type: 'Potion',
    description: '마나를 20 회복시켜주는 물약입니다.',
    price: 30,
    stackable: true,
    mpRestore: 20,
  } as Potion,
  return_scroll: {
    id: 'return_scroll',
    name: '마을 귀환서',
    type: 'Potion',
    description: '사용 시 즉시 마을로 귀환합니다.',
    price: 50,
    stackable: true,
  } as Potion,
  enhance_stone: {
    id: 'enhance_stone',
    name: '강화석',
    type: 'Material',
    description: '장비를 강화하는 데 사용되는 신비한 돌입니다.',
    price: 100,
    stackable: true,
  },
};

export const WEAPON_DATABASE = ITEM_DATABASE;
