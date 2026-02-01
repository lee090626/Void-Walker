export const TILE_SIZE = 16;
export const MAP_WIDTH = 80;
export const MAP_HEIGHT = 60;

// Tile IDs
const GRASS = 0;
const PATH = 1;
const WATER = 2;
const WALL = 3;
const FLOOR = 4;
const TREE = 5;
const FLOWER = 6;

// Helper to fill area
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

// Helper to draw hollow rect (walls)
const drawRect = (
  map: number[][],
  x: number,
  y: number,
  w: number,
  h: number,
  tile: number,
) => {
  fill(map, x, y, w, 1, tile); // Top
  fill(map, x, y + h - 1, w, 1, tile); // Bottom
  fill(map, x, y, 1, h, tile); // Left
  fill(map, x + w - 1, y, 1, h, tile); // Right
};

const createTownMap = () => {
  // Initialize with Grass
  const map: number[][] = Array(MAP_HEIGHT)
    .fill(0)
    .map(() => Array(MAP_WIDTH).fill(GRASS));

  // 1. Central Plaza & Paths
  fill(map, 36, 26, 8, 8, PATH); // Central Plaza
  fill(map, 0, 28, 80, 4, PATH); // Horizontal Main Road
  fill(map, 38, 0, 4, 60, PATH); // Vertical Main Road

  // 2. Player's House (Top Left)
  drawRect(map, 10, 10, 20, 16, WALL); // Walls
  fill(map, 12, 12, 16, 12, FLOOR); // Floor
  fill(map, 20, 24, 2, 2, FLOOR); // Doorway (South) - scaled
  fill(map, 20, 26, 2, 4, PATH); // Path to main road

  // Flower Garden (House Front)
  fill(map, 12, 27, 8, 2, FLOWER);
  fill(map, 22, 27, 8, 2, FLOWER);

  // 3. Shop (Top Right)
  drawRect(map, 50, 10, 20, 16, WALL); // Walls
  fill(map, 52, 12, 16, 12, FLOOR); // Floor
  fill(map, 60, 24, 2, 2, FLOOR); // Doorway
  fill(map, 60, 26, 2, 4, PATH); // Path

  // 4. Pond (Bottom Right)
  fill(map, 56, 40, 16, 12, WATER); // Water body

  // Flower Garden (Pond side)
  fill(map, 54, 40, 2, 12, FLOWER); // Left side of pond
  fill(map, 72, 40, 2, 12, FLOWER); // Right side of pond

  // 5. Training Grounds (Bottom Left) - Just a fenced area
  drawRect(map, 10, 40, 20, 16, WALL); // Small fence/wall
  fill(map, 20, 40, 2, 2, PATH); // Entrance

  // 6. Forest Border
  // Top & Bottom
  fill(map, 0, 0, 80, 4, TREE);
  fill(map, 0, 56, 80, 4, TREE);
  // Left & Right
  fill(map, 0, 4, 4, 52, TREE);
  fill(map, 76, 4, 4, 52, TREE);

  // 7. Organic Edges & Smoothing
  // Apply noise first to initial straight edges
  for (let y = 1; y < MAP_HEIGHT - 1; y++) {
    for (let x = 1; x < MAP_WIDTH - 1; x++) {
      const current = map[y][x];
      if (current === GRASS || current === PATH) {
        const neighbors = [
          map[y - 1][x],
          map[y + 1][x],
          map[y][x - 1],
          map[y][x + 1],
        ];
        // Inject initial noise
        if (current === GRASS && neighbors.includes(PATH)) {
          if (Math.random() < 0.4) map[y][x] = PATH;
        } else if (current === PATH && neighbors.includes(GRASS)) {
          if (Math.random() < 0.4) map[y][x] = GRASS;
        }
      }
    }
  }

  // Cellular Automata Smoothing Pass
  // Iterations to clump pixels
  const iterations = 4;

  for (let k = 0; k < iterations; k++) {
    const newMap = map.map((row) => [...row]); // Deep copy

    for (let y = 1; y < MAP_HEIGHT - 1; y++) {
      for (let x = 1; x < MAP_WIDTH - 1; x++) {
        const current = map[y][x];

        // Only smooth Grass/Path boundaries, don't touch Buildings (WALL/FLOOR) or Water yet
        if (current !== GRASS && current !== PATH) continue;

        let pathNeighbors = 0;
        // Check 8 neighbors
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            if (map[y + dy][x + dx] === PATH) pathNeighbors++;
          }
        }

        // Rules
        if (current === GRASS) {
          if (pathNeighbors > 4) newMap[y][x] = PATH;
        } else if (current === PATH) {
          if (pathNeighbors < 4) newMap[y][x] = GRASS;
        }
      }
    }
    // Update map for next iteration
    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        map[y][x] = newMap[y][x];
      }
    }
  }

  return map;
};

export const TOWN_MAP_DATA = createTownMap();
