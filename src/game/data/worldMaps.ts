import { MAP_HEIGHT, MAP_WIDTH, TOWN_MAP_DATA } from './townMap';

const GRASS = 0;
const PATH = 1;
const WATER = 2;
const WALL = 3;
const FLOOR = 4;
const TREE = 5;
const FLOWER = 6;
const DEEP_SPACE = 7;
const NEBULA = 8;
const STAR_CLUSTER = 9;
const ICE_FLOOR = 10;
const ICE_WALL = 11;
const SNOW = 12;
const FROZEN_TREE = 13;

// Seeded random for deterministic map generation across sessions/loads
let mapSeed = 42;
const seededRandom = () => {
  const x = Math.sin(mapSeed++) * 10000;
  return x - Math.floor(x);
};

const makeEmpty = (tile: number) =>
  Array(MAP_HEIGHT)
    .fill(0)
    .map(() => Array(MAP_WIDTH).fill(tile));

const fill = (
  map: number[][],
  x: number,
  y: number,
  w: number,
  h: number,
  tile: number,
) => {
  for (let i = y; i < y + h; i++) {
    for (let j = x; j < x + w; j++) {
      if (i >= 0 && i < MAP_HEIGHT && j >= 0 && j < MAP_WIDTH) {
        map[i][j] = tile;
      }
    }
  }
};

const scatter = (map: number[][], tile: number, count: number) => {
  for (let i = 0; i < count; i++) {
    const x = Math.floor(seededRandom() * MAP_WIDTH);
    const y = Math.floor(seededRandom() * MAP_HEIGHT);
    map[y][x] = tile;
  }
};

const createStarStationMap = () => {
  mapSeed = 101; // Specific seed for Star Station
  const map = makeEmpty(DEEP_SPACE); // Use Deep Space as base

  // 1. Dynamic Galaxy Background (Nebulae & Stars)
  for (let i = 0; i < MAP_HEIGHT; i++) {
    for (let j = 0; j < MAP_WIDTH; j++) {
      // Use Deep Space as default

      // Vertical gradient starfield (Dense at top)
      const gradient = Math.max(0, 0.2 - (i / MAP_HEIGHT) * 0.15);
      if (seededRandom() < gradient) map[i][j] = STAR_CLUSTER;

      // Nebula patches (Clusters)
      const noise = Math.sin(j * 0.15) * Math.cos(i * 0.15);
      // Use simplex-like noise approximation for organic cloud shapes
      if (noise > 0.7 || (noise > 0.5 && seededRandom() < 0.5)) {
        map[i][j] = NEBULA;
      }
    }
  }

  const cx = Math.floor(MAP_WIDTH / 2);
  const cy = Math.floor(MAP_HEIGHT / 2);

  // 2. Central Octagonal Core
  const size = 10;
  for (let i = cy - size; i <= cy + size; i++) {
    for (let j = cx - size; j <= cx + size; j++) {
      const dx = Math.abs(j - cx);
      const dy = Math.abs(i - cy);
      // Octagon math: x + y < size * 1.4
      if (dx + dy < size * 1.5 && dx < size && dy < size) {
        map[i][j] = FLOOR;
      }
    }
  }

  // 3. Primary Walkways (Cross)
  fill(map, cx - 2, 0, 4, MAP_HEIGHT, PATH);
  fill(map, 0, cy - 2, MAP_WIDTH, 4, PATH);

  // 4. Corner Docking Pads (Circles)
  const pads = [
    { x: cx - 18, y: cy - 14 },
    { x: cx + 18, y: cy - 14 },
    { x: cx - 18, y: cy + 14 },
    { x: cx + 18, y: cy + 14 },
  ];

  pads.forEach((p) => {
    for (let i = p.y - 5; i <= p.y + 5; i++) {
      for (let j = p.x - 5; j <= p.x + 5; j++) {
        const d = Math.sqrt((j - p.x) ** 2 + (i - p.y) ** 2);
        if (d < 5) map[i][j] = FLOOR;
        if (d >= 5 && d < 6.5) map[i][j] = PATH;
      }
    }
    // Connect to core
    const startX = Math.min(p.x, cx);
    const endX = Math.max(p.x, cx);
    const startY = Math.min(p.y, cy);
    const endY = Math.max(p.y, cy);

    fill(map, startX, p.y - 1, endX - startX, 2, PATH);
    fill(map, cx - 1, startY, 2, endY - startY, PATH);
  });

  // 5. Center Decor
  fill(map, cx - 3, cy - 3, 6, 6, WATER);
  map[cy][cx] = STAR_CLUSTER; // Center point (Bright)

  return map;
};

const createMeadowMap = () => {
  mapSeed = 202; // Specific seed for Meadow
  const map = makeEmpty(GRASS);
  // light paths
  fill(map, 0, 28, MAP_WIDTH, 4, PATH);
  fill(map, 38, 0, 4, MAP_HEIGHT, PATH);
  // pond
  fill(map, 58, 40, 12, 8, WATER);
  // decorations
  scatter(map, FLOWER, 120);
  scatter(map, TREE, 35);
  return map;
};

const createForestMap = () => {
  mapSeed = 303; // Specific seed
  const map = makeEmpty(GRASS);
  // denser trees
  scatter(map, TREE, 220);
  // a path through
  fill(map, 0, 28, MAP_WIDTH, 4, PATH);
  fill(map, 38, 0, 4, MAP_HEIGHT, PATH);
  // small clearing
  fill(map, 30, 22, 20, 16, PATH);
  return map;
};

const createCaveMap = () => {
  const map = makeEmpty(WALL);
  // carve floor rooms
  fill(map, 6, 6, MAP_WIDTH - 12, MAP_HEIGHT - 12, FLOOR);
  fill(map, 16, 14, 18, 14, FLOOR);
  fill(map, 46, 28, 20, 16, FLOOR);
  // tunnel
  fill(map, 34, 18, 8, 24, FLOOR);
  // underground water
  fill(map, 20, 40, 14, 8, WATER);
  return map;
};

const createLunaMap = () => {
  mapSeed = 404;
  const map = makeEmpty(WALL); // Space void
  // Lunar surface (Floor but with craters using Wall/Water)
  fill(map, 0, 0, MAP_WIDTH, MAP_HEIGHT, FLOOR);
  scatter(map, WALL, 100); // Rocks
  scatter(map, WATER, 30); // Ice patches?
  return map;
};

const createAetheriaMap = () => {
  mapSeed = 505;
  const map = makeEmpty(WATER); // Use water as "sky/cloud base"
  // Floating islands
  fill(map, 10, 10, 20, 20, GRASS);
  fill(map, 40, 15, 25, 25, GRASS);
  fill(map, 15, 40, 30, 15, PATH);
  scatter(map, FLOWER, 200);
  scatter(map, TREE, 50);
  return map;
};

const createIgnisMap = () => {
  mapSeed = 606;
  const map = makeEmpty(WALL); // Hardened lava
  // Lava flows
  fill(map, 0, 20, MAP_WIDTH, 10, WATER); // Lava river
  fill(map, 30, 0, 10, MAP_HEIGHT, WATER);
  // Safe islands
  fill(map, 10, 10, 15, 15, FLOOR);
  fill(map, 45, 35, 20, 20, FLOOR);
  scatter(map, WALL, 150);
  return map;
};

const createXylosMap = () => {
  mapSeed = 707;
  const map = makeEmpty(GRASS); // Mossy floor
  // Toxic pools
  scatter(map, WATER, 50); // Small pools
  fill(map, 20, 20, 40, 20, WATER); // Large swamp
  // Overgrown trees
  scatter(map, TREE, 300);
  scatter(map, FLOWER, 100);
  return map;
};

const createFrozenCliffMap = () => {
  mapSeed = 808;
  const map = makeEmpty(SNOW);

  // 1. Central Pass (Ice Floor)
  fill(map, 0, 28, MAP_WIDTH, 4, ICE_FLOOR);
  fill(map, 38, 0, 4, MAP_HEIGHT, ICE_FLOOR);

  // 2. Cliff Edges (Ice Wall)
  for (let i = 0; i < MAP_HEIGHT; i++) {
    for (let j = 0; j < MAP_WIDTH; j++) {
      if (j < 10 || j > MAP_WIDTH - 10) {
        if (seededRandom() < 0.7) map[i][j] = ICE_WALL;
      }
    }
  }

  // 3. Decorations
  scatter(map, FROZEN_TREE, 80);
  scatter(map, ICE_WALL, 40); // Scattered boulders of ice

  return map;
};

const createIceCaveMap = () => {
  mapSeed = 909;
  const map = makeEmpty(ICE_WALL);

  // 1. Carve main cavern
  fill(map, 10, 10, MAP_WIDTH - 20, MAP_HEIGHT - 20, ICE_FLOOR);

  // 2. Add snow patches
  for (let i = 0; i < 6; i++) {
    const rx = Math.floor(seededRandom() * (MAP_WIDTH - 10)) + 5;
    const ry = Math.floor(seededRandom() * (MAP_HEIGHT - 10)) + 5;
    fill(map, rx, ry, 6, 6, SNOW);
  }

  // 3. Frozen Lake in center
  fill(map, MAP_WIDTH / 2 - 8, MAP_HEIGHT / 2 - 5, 16, 10, WATER);

  return map;
};

export const getMapTileData = (mapId: string): number[][] => {
  switch (mapId) {
    case 'town':
      return TOWN_MAP_DATA;
    case 'meadow':
      return createMeadowMap();
    case 'forest':
      return createForestMap();
    case 'cave':
      return createCaveMap();
    case 'star_station':
      return createStarStationMap();
    case 'proxima_luna':
      return createLunaMap();
    case 'aetheria':
      return createAetheriaMap();
    case 'ignis_prime':
      return createIgnisMap();
    case 'xylos':
      return createXylosMap();
    case 'frozen_cliff':
      return createFrozenCliffMap();
    case 'ice_cave':
      return createIceCaveMap();
    default:
      return createMeadowMap();
  }
};
