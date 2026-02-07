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

const createStellarStationMap = () => {
  mapSeed = 101; // Specific seed for Stellar Station
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

  // 1. Central Sky Platform (Main Hub)
  const cx = Math.floor(MAP_WIDTH / 2);
  const cy = Math.floor(MAP_HEIGHT / 2);
  fill(map, cx - 15, cy - 10, 30, 20, GRASS); // Central platform
  fill(map, cx - 12, cy - 7, 24, 14, FLOOR); // Inner courtyard

  // 2. Floating Islands (Multiple levels)
  // Upper left island
  fill(map, 15, 8, 25, 18, GRASS);
  fill(map, 18, 11, 19, 12, PATH);

  // Upper right island
  fill(map, MAP_WIDTH - 40, 12, 28, 20, GRASS);
  fill(map, MAP_WIDTH - 37, 15, 22, 14, PATH);

  // Lower left island
  fill(map, 8, MAP_HEIGHT - 35, 30, 22, GRASS);
  fill(map, 11, MAP_HEIGHT - 32, 24, 16, PATH);

  // Lower right island
  fill(map, MAP_WIDTH - 35, MAP_HEIGHT - 28, 26, 20, GRASS);
  fill(map, MAP_WIDTH - 32, MAP_HEIGHT - 25, 20, 14, PATH);

  // 3. Sky Bridges (Connecting platforms)
  // Bridge to upper left
  fill(map, cx - 15, cy - 5, -(cx - 40), 3, PATH);
  fill(map, 40, cy - 5, cx - 55, 3, PATH);

  // Bridge to upper right
  fill(map, cx + 15, cy - 2, MAP_WIDTH - cx - 55, 3, PATH);

  // Bridge to lower left
  fill(map, cx - 8, cy + 10, -(cx - 38), 3, PATH);
  fill(map, 38, cy + 10, cx - 53, 3, PATH);

  // Bridge to lower right
  fill(map, cx + 8, cy + 7, MAP_WIDTH - cx - 43, 3, PATH);

  // 4. Decorative Elements
  // Magical gardens on platforms
  scatter(map, FLOWER, 300); // Lots of magical flowers
  scatter(map, TREE, 80); // Floating trees

  // 5. Crystal formations (using STAR_CLUSTER for sparkle effect)
  for (let i = 0; i < 15; i++) {
    const rx = Math.floor(seededRandom() * MAP_WIDTH);
    const ry = Math.floor(seededRandom() * MAP_HEIGHT);
    if (map[ry] && map[ry][rx] === GRASS) {
      map[ry][rx] = STAR_CLUSTER; // Crystal formations
    }
  }

  // 6. Wind currents (using NEBULA for misty effect)
  for (let i = 0; i < MAP_HEIGHT; i++) {
    for (let j = 0; j < MAP_WIDTH; j++) {
      if (map[i][j] === WATER) {
        // Sky areas
        const windNoise = Math.sin(j * 0.1) * Math.cos(i * 0.1);
        if (windNoise > 0.6 && seededRandom() < 0.3) {
          map[i][j] = NEBULA; // Wind currents/clouds
        }
      }
    }
  }

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

const createAetheriaUpperMap = () => {
  mapSeed = 506;
  const map = makeEmpty(NEBULA); // Misty upper atmosphere

  const cx = Math.floor(MAP_WIDTH / 2);
  const cy = Math.floor(MAP_HEIGHT / 2);

  // 1. Larger central platform for storm activities
  fill(map, cx - 20, cy - 15, 40, 30, GRASS);
  fill(map, cx - 15, cy - 10, 30, 20, FLOOR);

  // 2. Storm platforms (smaller, more dangerous)
  fill(map, 20, 20, 18, 15, GRASS);
  fill(map, MAP_WIDTH - 38, 25, 20, 18, GRASS);
  fill(map, 25, MAP_HEIGHT - 40, 22, 20, GRASS);
  fill(map, MAP_WIDTH - 45, MAP_HEIGHT - 35, 25, 18, GRASS);

  // 3. Lightning rod structures (using STAR_CLUSTER)
  for (let i = 0; i < 8; i++) {
    const rx = Math.floor(seededRandom() * MAP_WIDTH);
    const ry = Math.floor(seededRandom() * MAP_HEIGHT);
    if (map[ry] && map[ry][rx] === GRASS) {
      fill(map, rx, ry, 2, 2, STAR_CLUSTER);
    }
  }

  // 4. Connecting bridges (more precarious)
  fill(map, cx - 5, cy - 25, 10, 10, PATH); // North bridge
  fill(map, cx - 5, cy + 15, 10, 10, PATH); // South bridge

  // 5. Storm clouds (WATER for electrical activity)
  for (let i = 0; i < MAP_HEIGHT; i++) {
    for (let j = 0; j < MAP_WIDTH; j++) {
      if (map[i][j] === NEBULA) {
        const stormNoise = Math.sin(j * 0.08) * Math.cos(i * 0.12);
        if (stormNoise > 0.7) {
          map[i][j] = WATER; // Storm clouds
        }
      }
    }
  }

  scatter(map, TREE, 40); // Fewer trees, more hostile environment
  scatter(map, FLOWER, 100); // Magical storm flowers

  return map;
};

const createCelestialSanctumMap = () => {
  mapSeed = 507;
  const map = makeEmpty(STAR_CLUSTER); // Starry void background

  const cx = Math.floor(MAP_WIDTH / 2);
  const cy = Math.floor(MAP_HEIGHT / 2);

  // 1. Sacred central chamber
  for (let i = cy - 12; i <= cy + 12; i++) {
    for (let j = cx - 12; j <= cx + 12; j++) {
      const dx = Math.abs(j - cx);
      const dy = Math.abs(i - cy);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 12) {
        map[i][j] = FLOOR; // Sacred floor
      }
      if (dist < 8) {
        map[i][j] = WATER; // Inner sanctum (glowing pool)
      }
    }
  }

  // 2. Approach platforms
  fill(map, cx - 25, cy - 3, 10, 6, GRASS);
  fill(map, cx + 15, cy - 3, 10, 6, GRASS);
  fill(map, cx - 3, cy - 25, 6, 10, GRASS);
  fill(map, cx - 3, cy + 15, 6, 10, GRASS);

  // 3. Connecting paths to center
  fill(map, cx - 15, cy - 1, 15, 2, PATH);
  fill(map, cx, cy - 1, 15, 2, PATH);
  fill(map, cx - 1, cy - 15, 2, 15, PATH);
  fill(map, cx - 1, cy, 2, 15, PATH);

  // 4. Celestial decorations
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * 2 * Math.PI;
    const radius = 18;
    const x = cx + Math.floor(Math.cos(angle) * radius);
    const y = cy + Math.floor(Math.sin(angle) * radius);
    if (x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT) {
      map[y][x] = NEBULA; // Celestial aura
    }
  }

  return map;
};

const createSkyGardensMap = () => {
  mapSeed = 508;
  const map = makeEmpty(GRASS); // Lush garden base

  const cx = Math.floor(MAP_WIDTH / 2);
  const cy = Math.floor(MAP_HEIGHT / 2);

  // 1. Garden paths
  fill(map, 0, cy - 2, MAP_WIDTH, 4, PATH);
  fill(map, cx - 2, 0, 4, MAP_HEIGHT, PATH);

  // 2. Flower beds (using FLOWER)
  for (let i = 0; i < 8; i++) {
    const x = Math.floor(seededRandom() * (MAP_WIDTH - 20)) + 10;
    const y = Math.floor(seededRandom() * (MAP_HEIGHT - 20)) + 10;
    fill(map, x, y, 8, 8, FLOWER);
  }

  // 3. Magical ponds
  fill(map, 20, 20, 12, 8, WATER);
  fill(map, MAP_WIDTH - 32, MAP_HEIGHT - 28, 12, 8, WATER);

  // 4. Tree groves
  scatter(map, TREE, 150);

  // 5. Crystal formations
  scatter(map, STAR_CLUSTER, 30);

  return map;
};

const createWindWorkshopMap = () => {
  mapSeed = 509;
  const map = makeEmpty(FLOOR); // Workshop floor base

  const cx = Math.floor(MAP_WIDTH / 2);
  const cy = Math.floor(MAP_HEIGHT / 2);

  // 1. Workshop areas
  fill(map, 10, 10, 30, 25, WALL); // Workshop building
  fill(map, 12, 12, 26, 21, FLOOR); // Interior

  fill(map, MAP_WIDTH - 40, 15, 30, 25, WALL); // Storage
  fill(map, MAP_WIDTH - 38, 17, 26, 21, FLOOR);

  // 2. Central courtyard
  fill(map, cx - 15, cy - 10, 30, 20, PATH);

  // 3. Wind channels (using WATER for air flow)
  fill(map, 0, cy - 1, MAP_WIDTH, 2, WATER);
  fill(map, cx - 1, 0, 2, MAP_HEIGHT, WATER);

  // 4. Equipment stations
  scatter(map, STAR_CLUSTER, 20); // Magical equipment

  return map;
};

const createMysticGroveMap = () => {
  mapSeed = 510;
  const map = makeEmpty(GRASS); // Forest floor

  // 1. Dense forest
  scatter(map, TREE, 300); // Very dense trees

  // 2. Ancient tree clearing (center)
  const cx = Math.floor(MAP_WIDTH / 2);
  const cy = Math.floor(MAP_HEIGHT / 2);
  fill(map, cx - 8, cy - 8, 16, 16, PATH);

  // 3. Mystical streams
  fill(map, 15, 0, 3, MAP_HEIGHT, WATER);
  fill(map, MAP_WIDTH - 18, 0, 3, MAP_HEIGHT, WATER);

  // 4. Magical clearings
  for (let i = 0; i < 5; i++) {
    const x = Math.floor(seededRandom() * (MAP_WIDTH - 15)) + 7;
    const y = Math.floor(seededRandom() * (MAP_HEIGHT - 15)) + 7;
    fill(map, x, y, 8, 8, FLOWER);
  }

  // 5. Ancient runes (star clusters)
  scatter(map, STAR_CLUSTER, 25);

  return map;
};

const createCrystalForgeMap = () => {
  mapSeed = 511;
  const map = makeEmpty(WALL); // Stone base

  const cx = Math.floor(MAP_WIDTH / 2);
  const cy = Math.floor(MAP_HEIGHT / 2);

  // 1. Main forge chamber
  fill(map, cx - 20, cy - 15, 40, 30, FLOOR);

  // 2. Forge areas
  fill(map, 15, 15, 25, 20, FLOOR);
  fill(map, MAP_WIDTH - 40, 20, 25, 20, FLOOR);

  // 3. Crystal formations (using STAR_CLUSTER)
  for (let i = 0; i < 15; i++) {
    const x = Math.floor(seededRandom() * MAP_WIDTH);
    const y = Math.floor(seededRandom() * MAP_HEIGHT);
    if (map[y] && map[y][x] === FLOOR) {
      fill(map, x, y, 2, 2, STAR_CLUSTER);
    }
  }

  // 4. Lava channels for forging
  fill(map, cx - 2, 0, 4, MAP_HEIGHT, WATER); // Magical energy flow

  // 5. Connecting paths
  fill(map, 0, cy - 2, MAP_WIDTH, 4, PATH);

  return map;
};

const createCrystalCavesMap = () => {
  mapSeed = 512;
  const map = makeEmpty(WALL); // Cave walls

  const cx = Math.floor(MAP_WIDTH / 2);
  const cy = Math.floor(MAP_HEIGHT / 2);

  // 1. Main cavern
  fill(map, cx - 25, cy - 20, 50, 40, FLOOR);

  // 2. Side chambers
  fill(map, 10, 10, 20, 15, FLOOR);
  fill(map, MAP_WIDTH - 30, 15, 20, 15, FLOOR);
  fill(map, 15, MAP_HEIGHT - 25, 20, 15, FLOOR);
  fill(map, MAP_WIDTH - 35, MAP_HEIGHT - 25, 20, 15, FLOOR);

  // 3. Connecting tunnels
  fill(map, 30, cy - 2, cx - 55, 4, FLOOR);
  fill(map, cx + 25, cy - 2, MAP_WIDTH - cx - 55, 4, FLOOR);
  fill(map, cx - 2, 25, 4, cy - 45, FLOOR);
  fill(map, cx - 2, cy + 20, 4, MAP_HEIGHT - cy - 45, FLOOR);

  // 4. Crystal formations everywhere
  for (let i = 0; i < 40; i++) {
    const x = Math.floor(seededRandom() * MAP_WIDTH);
    const y = Math.floor(seededRandom() * MAP_HEIGHT);
    if (map[y] && map[y][x] === FLOOR) {
      map[y][x] = STAR_CLUSTER;
    }
  }

  // 5. Underground pools
  fill(map, cx - 8, cy - 5, 16, 10, WATER);

  return map;
};

const createStarObservatoryMap = () => {
  mapSeed = 513;
  const map = makeEmpty(DEEP_SPACE); // Space background

  const cx = Math.floor(MAP_WIDTH / 2);
  const cy = Math.floor(MAP_HEIGHT / 2);

  // 1. Observatory platform
  for (let i = cy - 15; i <= cy + 15; i++) {
    for (let j = cx - 15; j <= cx + 15; j++) {
      const dx = Math.abs(j - cx);
      const dy = Math.abs(i - cy);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 15) {
        map[i][j] = FLOOR;
      }
    }
  }

  // 2. Telescope areas
  fill(map, 20, 20, 15, 15, FLOOR);
  fill(map, MAP_WIDTH - 35, 25, 15, 15, FLOOR);

  // 3. Connecting bridges
  fill(map, 35, cy - 1, cx - 50, 2, PATH);
  fill(map, cx + 15, cy - 1, MAP_WIDTH - cx - 50, 2, PATH);

  // 4. Star field effects
  for (let i = 0; i < MAP_HEIGHT; i++) {
    for (let j = 0; j < MAP_WIDTH; j++) {
      if (map[i][j] === DEEP_SPACE) {
        if (seededRandom() < 0.1) {
          map[i][j] = STAR_CLUSTER;
        } else if (seededRandom() < 0.05) {
          map[i][j] = NEBULA;
        }
      }
    }
  }

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
      return createStellarStationMap();
    case 'proxima_station':
    case 'proxima_plains':
    case 'proxima_ruins':
    case 'proxima_void':
    case 'proxima_core':
      return createLunaMap();
    case 'aetheria':
      return createAetheriaMap();
    case 'sky_gardens':
      return createSkyGardensMap();
    case 'wind_workshop':
      return createWindWorkshopMap();
    case 'mystic_grove':
      return createMysticGroveMap();
    case 'crystal_forge':
      return createCrystalForgeMap();
    case 'crystal_caves':
      return createCrystalCavesMap();
    case 'aetheria_upper':
      return createAetheriaUpperMap();
    case 'star_observatory':
      return createStarObservatoryMap();
    case 'celestial_sanctum':
      return createCelestialSanctumMap();
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
