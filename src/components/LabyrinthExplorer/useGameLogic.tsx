"use client";

import { useReducer, useCallback, useEffect } from 'react';
import type { GameState, Difficulty, Point, MazeGrid } from './types';
import { CellType } from './types';
import { DIFFICULTY_SETTINGS, INITIAL_LIVES, INITIAL_SCORE, MESSAGES, POTION_SCORE_VALUE } from './constants';
import { generateMaze, placeItems, mazeToString } from './mazeUtils';
import { solveMaze as solveMazeAI, type SolveMazeInput } from '@/ai/flows/maze-solver';
import { useToast } from "@/hooks/use-toast";
import { playLloronaSound } from './SoundPlayer';

type Action =
  | { type: 'START_GAME'; difficulty: Difficulty }
  | { type: 'MOVE_PLAYER'; dx: number; dy: number }
  | { type: 'SET_AI_PATH'; path: Point[] | null }
  | { type: 'SET_GAME_STATUS'; status: GameState['gameStatus'] }
  | { type: 'SET_MESSAGE'; message: string | null }
  | { type: 'RESET_LEVEL' };

const initialState: GameState = {
  mazeGrid: null,
  playerPos: null,
  childPos: null,
  hunters: [],
  potionsLife: [],
  potionsScore: [],
  score: INITIAL_SCORE,
  lives: INITIAL_LIVES,
  difficulty: 'easy',
  gameStatus: 'story',
  playerPath: [],
  aiSolutionPath: null,
  message: null,
};

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const config = DIFFICULTY_SETTINGS[action.difficulty];
      const { mazeGrid, playerStart, childPos } = generateMaze(config);
      const { hunters, potionsLife, potionsScore } = placeItems(mazeGrid, config, playerStart, childPos);
      playLloronaSound("/sounds/start_game.mp3").catch(console.error); // Example sound

      return {
        ...initialState,
        difficulty: action.difficulty,
        mazeGrid,
        playerPos: playerStart,
        childPos,
        hunters,
        potionsLife,
        potionsScore,
        gameStatus: 'playing',
        playerPath: [playerStart],
        message: "Find the child!",
      };
    }
    case 'MOVE_PLAYER': {
      if (!state.mazeGrid || !state.playerPos || state.gameStatus !== 'playing') return state;

      const newPos = { x: state.playerPos.x + action.dx, y: state.playerPos.y + action.dy };
      let newScore = state.score;
      let newLives = state.lives;
      let newGameStatus = state.gameStatus;
      let newMessage = state.message;
      let newPotionsLife = [...state.potionsLife];
      let newPotionsScore = [...state.potionsScore];

      const cell = state.mazeGrid[newPos.y]?.[newPos.x];

      if (cell === undefined || cell === CellType.WALL) {
        return state; // Invalid move
      }
      
      // Check for child
      if (state.childPos && newPos.x === state.childPos.x && newPos.y === state.childPos.y) {
        newGameStatus = 'won';
        newMessage = MESSAGES.levelComplete;
        newScore += 100; // Bonus for finding child
        playLloronaSound("/sounds/level_complete.mp3").catch(console.error);
      }

      // Check for hunters
      if (state.hunters.some(h => h.x === newPos.x && h.y === newPos.y)) {
        newLives -= 1;
        newMessage = MESSAGES.hunterEncounter;
        playLloronaSound("/sounds/hunter_hit.mp3").catch(console.error);
        if (newLives <= 0) {
          newGameStatus = 'gameOver';
          newMessage = MESSAGES.gameOver;
        }
      }

      // Check for potions
      const lifePotionIndex = state.potionsLife.findIndex(p => p.x === newPos.x && p.y === newPos.y);
      if (lifePotionIndex > -1) {
        newLives += 1;
        newMessage = MESSAGES.potionLife;
        newPotionsLife.splice(lifePotionIndex, 1);
        playLloronaSound("/sounds/potion_pickup.mp3").catch(console.error);
      }

      const scorePotionIndex = state.potionsScore.findIndex(p => p.x === newPos.x && p.y === newPos.y);
      if (scorePotionIndex > -1) {
        newScore += POTION_SCORE_VALUE;
        newMessage = MESSAGES.potionScore;
        newPotionsScore.splice(scorePotionIndex, 1);
        playLloronaSound("/sounds/potion_pickup.mp3").catch(console.error);
      }
      
      const newPlayerPath = [...state.playerPath, newPos];

      return {
        ...state,
        playerPos: newPos,
        score: newScore,
        lives: newLives,
        gameStatus: newGameStatus,
        message: newMessage,
        potionsLife: newPotionsLife,
        potionsScore: newPotionsScore,
        playerPath: newPlayerPath,
      };
    }
    case 'SET_AI_PATH':
      return { ...state, aiSolutionPath: action.path, message: action.path ? "AI path calculated." : "Could not find AI path." };
    case 'SET_GAME_STATUS':
      return { ...state, gameStatus: action.status };
    case 'SET_MESSAGE':
      return { ...state, message: action.message };
    case 'RESET_LEVEL': // Could be used for "Play Again" or advancing levels
        const config = DIFFICULTY_SETTINGS[state.difficulty];
        const { mazeGrid, playerStart, childPos } = generateMaze(config);
        const { hunters, potionsLife, potionsScore } = placeItems(mazeGrid, config, playerStart, childPos);
        return {
            ...state,
            mazeGrid,
            playerPos: playerStart,
            childPos,
            hunters,
            potionsLife,
            potionsScore,
            score: state.gameStatus === 'won' ? state.score : INITIAL_SCORE, // Keep score if won, else reset
            lives: INITIAL_LIVES, 
            gameStatus: 'playing',
            playerPath: [playerStart],
            aiSolutionPath: null,
            message: "New level started!",
        };
    default:
      return state;
  }
}

export function useGameLogic() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({ title: state.message });
      // Clear message after showing to prevent re-toasting on re-renders
      // dispatch({ type: 'SET_MESSAGE', message: null }); // This might be too aggressive
    }
  }, [state.message, toast]);

  const startGame = useCallback((difficulty: Difficulty) => {
    dispatch({ type: 'START_GAME', difficulty });
  }, []);

  const movePlayer = useCallback((dx: number, dy: number) => {
    dispatch({ type: 'MOVE_PLAYER', dx, dy });
  }, []);
  
  const setGameStatus = useCallback((status: GameState['gameStatus']) => {
    dispatch({ type: 'SET_GAME_STATUS', status });
  }, []);

  const resetLevel = useCallback(() => {
    dispatch({ type: 'RESET_LEVEL' });
  }, []);

  const solveMaze = useCallback(async () => {
    if (!state.mazeGrid || !state.playerPos || !state.childPos) return;
    dispatch({ type: 'SET_MESSAGE', message: "AI is thinking..." });
    try {
      const mazeString = mazeToString(state.mazeGrid, state.playerPos, state.childPos);
      const input: SolveMazeInput = {
        maze: mazeString,
        start: { x: state.playerPos.x, y: state.playerPos.y },
        end: { x: state.childPos.x, y: state.childPos.y },
      };
      const result = await solveMazeAI(input);
      if (result && result.path) {
        dispatch({ type: 'SET_AI_PATH', path: result.path });
      } else {
        dispatch({ type: 'SET_AI_PATH', path: null });
      }
    } catch (error) {
      console.error("AI Maze Solver Error:", error);
      dispatch({ type: 'SET_AI_PATH', path: null });
      dispatch({ type: 'SET_MESSAGE', message: "AI failed to solve." });
    }
  }, [state.mazeGrid, state.playerPos, state.childPos]);

  return { state, startGame, movePlayer, solveMaze, setGameStatus, resetLevel };
}
