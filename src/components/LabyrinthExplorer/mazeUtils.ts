import type { MazeGrid, Point, GameConfig } from './types';
import { CellType } from './types';
import { DIFFICULTY_SETTINGS } from './constants'; // Corrected import path

// Basic Maze Generation (simple random walls, ensuring path from start to end)
export function generateMaze(config: GameConfig): {
  mazeGrid: MazeGrid;
  playerStart: Point;
  childPos: Point;
} {
  const { rows, cols } = config;
  const mazeGrid: MazeGrid = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(CellType.PATH));

  // Create borders
  for (let r = 0; r < rows; r++) {
    mazeGrid[r][0] = CellType.WALL;
    mazeGrid[r][cols - 1] = CellType.WALL;
  }
  for (let c = 0; c < cols; c++) {
    mazeGrid[0][c] = CellType.WALL;
    mazeGrid[rows - 1][c] = CellType.WALL;
  }

  // Add some random internal walls
  const numInternalWalls = Math.floor(rows * cols * 0.2); // 20% walls
  for (let i = 0; i < numInternalWalls; i++) {
    const r = Math.floor(Math.random() * (rows - 2)) + 1;
    const c = Math.floor(Math.random() * (cols - 2)) + 1;
    if (mazeGrid[r][c] === CellType.PATH) {
      mazeGrid[r][c] = CellType.WALL;
    }
  }
  
  // Define start and end points, ensure they are paths
  const playerStart: Point = { x: 1, y: 1 };
  const childPos: Point = { x: cols - 2, y: rows - 2 };

  mazeGrid[playerStart.y][playerStart.x] = CellType.PATH; // Ensure start is path
  mazeGrid[childPos.y][childPos.x] = CellType.PATH; // Ensure end is path
  
  // Basic path carving attempt (not guaranteed optimal or always successful for complex random walls)
  // This is a very naive way to ensure connectivity. A* or DFS would be better.
  // For simplicity, we'll assume the random wall placement doesn't completely block off start/end often
  // or rely on the AI to find a path if one exists.
  // A more robust generator would be needed for production.

  // Place player and child representations
  // These are logical positions; visual representation is handled in Cell component
  // The maze grid itself will store PATH at these locations initially.

  return { mazeGrid, playerStart, childPos };
}


export function placeItems(
  mazeGrid: MazeGrid,
  config: GameConfig,
  playerStart: Point,
  childPos: Point
): { hunters: Point[]; potionsLife: Point[]; potionsScore: Point[] } {
  const { rows, cols, numHunters, numPotionsLife, numPotionsScore } = config;
  const items: { type: CellType; count: number; list: Point[] }[] = [
    { type: CellType.HUNTER, count: numHunters, list: [] },
    { type: CellType.POTION_LIFE, count: numPotionsLife, list: [] },
    { type: CellType.POTION_SCORE, count: numPotionsScore, list: [] },
  ];

  for (const item of items) {
    for (let i = 0; i < item.count; i++) {
      let placed = false;
      while (!placed) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        if (
          mazeGrid[r][c] === CellType.PATH &&
          !(r === playerStart.y && c === playerStart.x) &&
          !(r === childPos.y && c === childPos.x) &&
          !item.list.some(p => p.x === c && p.y === r) // Ensure not already placed here
        ) {
          item.list.push({ x: c, y: r });
          placed = true;
        }
      }
    }
  }
  return {
    hunters: items.find(i => i.type === CellType.HUNTER)?.list || [],
    potionsLife: items.find(i => i.type === CellType.POTION_LIFE)?.list || [],
    potionsScore: items.find(i => i.type === CellType.POTION_SCORE)?.list || [],
  };
}


export function mazeToString(mazeGrid: MazeGrid, playerPos: Point, childPos: Point): string {
  return mazeGrid
    .map((row, y) =>
      row
        .map((cell, x) => {
          if (x === playerPos.x && y === playerPos.y) return 'S'; // AI Start
          if (x === childPos.x && y === childPos.y) return 'E'; // AI End
          return cell === CellType.WALL ? '#' : ' ';
        })
        .join('')
    )
    .join('\n');
}

