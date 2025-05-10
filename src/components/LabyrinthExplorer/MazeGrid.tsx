"use client";

import type { GameState } from "./types";
import { CellType } from "./types";
import { Cell } from "./Cell";

interface MazeGridProps {
  gameState: GameState;
}

export function MazeGrid({ gameState }: MazeGridProps) {
  const { mazeGrid, playerPos, childPos, hunters, potionsLife, potionsScore, playerPath, aiSolutionPath } = gameState;

  if (!mazeGrid || !playerPos) {
    return <div className="text-center p-4">Loading Maze...</div>;
  }

  return (
    <div
      className="grid gap-0.5 bg-neutral-800 p-1 shadow-lg rounded-md"
      style={{
        gridTemplateColumns: `repeat(${mazeGrid[0].length}, minmax(0, 1fr))`,
        width: '100%',
        maxWidth: 'calc(100vh - 200px)', // Attempt to make it fit screen height
        aspectRatio: `${mazeGrid[0].length} / ${mazeGrid.length}`
      }}
    >
      {mazeGrid.map((row, y) =>
        row.map((cellType, x) => (
          <Cell
            key={`${x}-${y}`}
            type={cellType}
            position={{ x, y }}
            isPlayerPos={playerPos.x === x && playerPos.y === y}
            isChildPos={childPos ? childPos.x === x && childPos.y === y : false}
            isHunter={hunters.some(h => h.x === x && h.y === y)}
            isPotionLife={potionsLife.some(p => p.x === x && p.y === y)}
            isPotionScore={potionsScore.some(p => p.x === x && p.y === y)}
            isPlayerVisited={playerPath.some(p => p.x === x && p.y === y)}
            isAiPath={aiSolutionPath ? aiSolutionPath.some(p => p.x === x && p.y === y) : false}
          />
        ))
      )}
    </div>
  );
}
