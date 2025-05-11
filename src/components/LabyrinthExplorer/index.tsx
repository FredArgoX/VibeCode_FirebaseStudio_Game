"use client";

import { useEffect } from 'react';
import { useGameLogic } from './useGameLogic';
import { MazeGrid } from './MazeGrid';
import { PlayerControls } from './PlayerControls';
import { HUD } from './HUD';
import type { Difficulty } from './types';
import { Button } from '@/components/ui/button';
import SoundPlayer from './SoundPlayer'; // Import the SoundPlayer

interface LabyrinthExplorerProps {
  difficulty: Difficulty;
  onReturnToMenu: () => void;
}

export function LabyrinthExplorer({ difficulty: initialDifficulty, onReturnToMenu }: LabyrinthExplorerProps) {
  const { state, startGame, movePlayer, solveMaze, resetLevel } = useGameLogic();

  useEffect(() => {
    startGame(initialDifficulty);
  }, [startGame, initialDifficulty]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (state.gameStatus !== 'playing') return;

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
        case 's':
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movePlayer, state.gameStatus]);

  if (state.gameStatus === 'story' || state.gameStatus === 'menu' || !state.mazeGrid || !state.playerPos) {
    // This state should be handled by page.tsx, but as a fallback:
    return <div className="flex items-center justify-center h-screen"><p>Loading Game...</p></div>;
  }
  
  const isGameInteractive = state.gameStatus === 'playing';

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-2 sm:p-4 space-y-4">
      <SoundPlayer soundUrl="/sounds/ambient_maze.mp3" playOnMount={true} /> {/* Example ambient sound */}
      <HUD score={state.score} lives={state.lives} message={state.message} difficulty={state.difficulty} />
      
      <div className="w-full max-w-2xl aspect-square_"> {/* Ensure MazeGrid parent maintains aspect ratio space */}
         <MazeGrid gameState={state} />
      </div>

      {(state.gameStatus === 'gameOver' || state.gameStatus === 'won') && (
        <div className="text-center p-4 bg-card rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-2 text-accent">
            {state.gameStatus === 'won' ? 'Encontraste al niño!' : 'El laberinto te reclama...'}
          </h2>
          <p className="mb-4 text-card-foreground">Puntaje Final: {state.score}</p>
          <div className="space-x-2">
            <Button onClick={resetLevel} className="bg-primary hover:bg-primary/90 text-primary-foreground">Jugar de Nuevo ({state.difficulty})</Button>
            <Button onClick={onReturnToMenu} variant="outline">Regresar al Menu</Button>
          </div>
        </div>
      )}

      {isGameInteractive && (
         <PlayerControls onMove={movePlayer} onSolveMaze={solveMaze} disabled={!isGameInteractive} />
      )}
      {!isGameInteractive && state.gameStatus !== 'gameOver' && state.gameStatus !== 'won' && (
         <p className="text-muted-foreground italic">Game is paused or loading AI solution...</p>
      )}
       <Button onClick={onReturnToMenu} variant="link" className="mt-4 text-muted-foreground">
        Regresar al Menu
      </Button>
    </div>
  );
}
