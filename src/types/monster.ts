export interface DropItem {
  itemId: string;
  chance: number; // 0 to 1
}

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
  synergyTag?: string; // e.g., 'ice_duo'
  auraType?: 'defense_boost' | 'none';
  debuffType?: 'slow' | 'none';
}

export const MONSTER_DATABASE: Record<string, MonsterTemplate> = {
  slime: {
    id: 'slime',
    name: '슬라임',
    description: '어디에나 흔히 보이는 끈적한 생명체입니다.',
    maxHp: 30,
    atk: 1,
    def: 0,
    expValue: 30, //테스트중이므로 절대 건들지 말기
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
    drops: [
      { itemId: 'slime_jelly', chance: 0.9 },
      { itemId: 'red_potion', chance: 0.1 },
      { itemId: 'long_spear', chance: 0.1 },
    ],
  },
  goblin: {
    id: 'goblin',
    name: '고블린',
    description: '탐욕스럽고 비열한 소인족 몬스터입니다.',
    maxHp: 100,
    atk: 8,
    def: 1,
    expValue: 70,
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
    drops: [
      { itemId: 'iron_sword', chance: 0.1 },
      { itemId: 'red_potion', chance: 0.2 },
      { itemId: 'old_armor', chance: 0.05 },
    ],
  },
  bat: {
    id: 'bat',
    name: '박쥐',
    description: '동굴의 어둠 속에 사는 작고 빠른 몬스터입니다.',
    maxHp: 30,
    atk: 5,
    def: 1,
    expValue: 40,
    color: '#4b0082',
    speed: 280,
    attackRange: 30,
    attackCooldown: 1.0,
    spriteUrl: 'assets/Monsters/Bat.png',
    size: { x: 80, y: 70 },
    hitboxSize: { x: 50, y: 40 },
    hitboxOffset: { x: 0, y: 0 },
    hpBarWidth: 60,
    hpBarOffset: { x: 0, y: -25 },
    drops: [
      { itemId: 'red_potion', chance: 0.15 },
      { itemId: 'blue_potion', chance: 0.05 },
      { itemId: 'bat_wing', chance: 0.3 },
    ],
  },
  yeti: {
    id: 'yeti',
    name: '예티',
    description: '설산에 거주하는 거대하고 힘센 설인입니다.',
    maxHp: 800,
    atk: 50,
    def: 20,
    expValue: 250,
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
      { itemId: 'enhance_stone', chance: 0.2 },
      { itemId: 'red_potion', chance: 0.3 },
    ],
    synergyTag: 'ice_duo',
    auraType: 'defense_boost',
  },
  ice_spirit: {
    id: 'ice_spirit',
    name: '얼음 정령',
    description: '냉기로 이루어진 신비로운 정령입니다.',
    maxHp: 500,
    atk: 35,
    def: 10,
    expValue: 180,
    color: '#afeeee',
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
      { itemId: 'blue_potion', chance: 0.3 },
      { itemId: 'enhance_stone', chance: 0.1 },
    ],
    synergyTag: 'ice_duo',
    debuffType: 'slow',
  },
};
