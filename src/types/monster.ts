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
}

export const MONSTER_DATABASE: Record<string, MonsterTemplate> = {
  slime: {
    id: 'slime',
    name: '슬라임',
    description: '어디에나 흔히 보이는 끈적한 생명체입니다.',
    maxHp: 30,
    atk: 5,
    def: 0,
    expValue: 30**300, //테스트중이므로 절대 건들지 말기
    color: '#00ff00',
    speed: 80,
    attackRange: 40,
    attackCooldown: 1.5,
    spriteUrl: '/assets/Slime.png',
    size: { x: 140, y: 70 },
    hitboxSize: { x: 50, y: 40 },
    hitboxOffset: { x: 5, y: 0 },
    hpBarWidth: 80,
    hpBarOffset: { x: 0, y: -45 },
    drops: [
      { itemId: 'slime_jelly', chance: 0.5 },
      { itemId: 'red_potion', chance: 0.1 },
    ],
  },
  goblin: {
    id: 'goblin',
    name: '고블린',
    description: '탐욕스럽고 비열한 소인족 몬스터입니다.',
    maxHp: 60,
    atk: 12,
    def: 2,
    expValue: 70,
    color: '#3cb371',
    speed: 120,
    attackRange: 50,
    attackCooldown: 1.2,
    spriteUrl: '/assets/Goblin.png',
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
    maxHp: 20,
    atk: 8,
    def: 1,
    expValue: 40,
    color: '#4b0082',
    speed: 280,
    attackRange: 30,
    attackCooldown: 1.0,
    spriteUrl: '/assets/Bat.png',
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
  // yeti: {
  //   id: 'yeti',
  //   name: '예티',
  //   description: '설산에 거주하는 거대하고 힘센 설인입니다.',
  //   maxHp: 200,
  //   atk: 35,
  //   def: 10,
  //   expValue: 250,
  //   color: '#f0f8ff',
  //   speed: 100,
  //   attackRange: 60,
  //   attackCooldown: 2.0,
  //   spriteUrl: '/assets/Yeti.png',
  //   size: { x: 250, y: 200 },
  //   hpBarWidth: 150,
  //   hpBarOffset: { x: 0, y: 20 },
  //   drops: [
  //     { itemId: 'enhance_stone', chance: 0.2 },
  //     { itemId: 'red_potion', chance: 0.3 },
  //   ],
  // },
  // ice_spirit: {
  //   id: 'ice_spirit',
  //   name: '얼음 정령',
  //   description: '냉기로 이루어진 신비로운 정령입니다.',
  //   maxHp: 120,
  //   atk: 25,
  //   def: 5,
  //   expValue: 180,
  //   color: '#afeeee',
  //   speed: 150,
  //   attackRange: 100,
  //   attackCooldown: 1.5,
  //   spriteUrl: '/assets/IceSpirit.png',
  //   size: { x: 150, y: 150 },
  //   hpBarWidth: 100,
  //   hpBarOffset: { x: 0, y: 10 },
  //   drops: [
  //     { itemId: 'blue_potion', chance: 0.3 },
  //     { itemId: 'enhance_stone', chance: 0.1 },
  //   ],
  // },
  // burning_slime: {
  //   id: 'burning_slime',
  //   name: '불타는 슬라임',
  //   description: '용암에서 태어난 뜨거운 슬라임입니다.',
  //   maxHp: 150,
  //   atk: 30,
  //   def: 8,
  //   expValue: 200,
  //   color: '#ff4500',
  //   speed: 110,
  //   attackRange: 45,
  //   attackCooldown: 1.4,
  //   spriteUrl: '/assets/BurningSlime.png',
  //   size: { x: 180, y: 120 },
  //   hpBarWidth: 80,
  //   hpBarOffset: { x: 0, y: -5 },
  //   drops: [
  //     { itemId: 'enhance_stone', chance: 0.15 },
  //     { itemId: 'red_potion', chance: 0.2 },
  //   ],
  // },
  // ifrit: {
  //   id: 'ifrit',
  //   name: '이프리트',
  //   description: '불의 차원에서 건너온 고위 정령입니다.',
  //   maxHp: 400,
  //   atk: 60,
  //   def: 20,
  //   expValue: 600,
  //   color: '#b22222',
  //   speed: 130,
  //   attackRange: 120,
  //   attackCooldown: 1.8,
  //   spriteUrl: '/assets/Ifrit.png',
  //   size: { x: 300, y: 300 },
  //   hpBarWidth: 200,
  //   hpBarOffset: { x: 0, y: 30 },
  //   drops: [
  //     { itemId: 'enhance_stone', chance: 0.4 },
  //     { itemId: 'blue_potion', chance: 0.4 },
  //   ],
  // },
};
