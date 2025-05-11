import type { MazeGrid, Point, GameConfig } from './types';
import { CellType } from './types';

// Simple Maze Generation using Recursive Backtracking
export function generateMaze(config: GameConfig): {
  mazeGrid: MazeGrid;
  playerStart: Point;
  childPos: Point;
} {
  const { rows, cols } = config;

  // Initialize the maze with all walls
  const mazeGrid: MazeGrid = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(CellType.WALL));

  // Define the starting point for the maze generation
  const startNode: Point = { x: 1, y: 1 }; // Start from a non-border cell

  // Recursive Backtracking algorithm
  function carvePath(x: number, y: number) {
    const directions = [
      { dx: 0, dy: -2 }, // Up
      { dx: 0, dy: 2 }, // Down
      { dx: -2, dy: 0 }, // Left
      { dx: 2, dy: 0 }, // Right
    ];

    // Shuffle directions randomly
    for (let i = directions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [directions[i], directions[j]] = [directions[j], directions[i]];
    }

    mazeGrid[y][x] = CellType.PATH;

    for (const dir of directions) {
      const nx = x + dir.dx;
      const ny = y + dir.dy;

      // Check if the next cell is within bounds and is a wall
      if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && mazeGrid[ny][nx] === CellType.WALL) {
        // Carve a path through the wall between the current cell and the next cell
        mazeGrid[y + dir.dy / 2][x + dir.dx / 2] = CellType.PATH;
        carvePath(nx, ny);
      }
    }
  }

  // Start carving the path from the start node
  carvePath(startNode.x, startNode.y);

  // Define start and end points, ensure they are paths
  const playerStart: Point = { x: 1, y: 1 };
  const childPos: Point = { x: cols - 2, y: rows - 2 };

  // Ensure start and end points are paths, and create a direct path if needed (simple fix for potential disconnections)
  mazeGrid[playerStart.y][playerStart.x] = CellType.PATH;
  mazeGrid[childPos.y][childPos.x] = CellType.PATH;

  // Simple connection to ensure solvability if recursive backtracking doesn't connect start/end directly
  // This is a basic approach and can create less interesting mazes. A more complex algorithm would handle this better.
  let currentX = playerStart.x;
  let currentY = playerStart.y;

  while (currentX !== childPos.x || currentY !== childPos.y) {
    if (currentX < childPos.x) {
      currentX++;
    } else if (currentX > childPos.x) {
      currentX--;
    } else if (currentY < childPos.y) {
      currentY++;
    } else if (currentY > childPos.y) {
      currentY--;
    }
    mazeGrid[currentY][currentX] = CellType.PATH;
  }

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

