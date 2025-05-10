export enum CellType {
  WALL = '#',
  PATH = ' ',
  PLAYER = 'P',
  CHILD = 'C',
  HUNTER = 'H',
  POTION_LIFE = 'L',
  POTION_SCORE = 'S',
  PLAYER_VISITED = '.',
  AI_PATH = '*',
}

export interface Point {
  x: number;
  y: number;
}

export type MazeGrid = CellType[][];

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameConfig {
  rows: number;
  cols: number;
  numHunters: number;
  numPotionsLife: number;
  numPotionsScore: number;
}

export interface GameState {
  mazeGrid: MazeGrid | null;
  playerPos: Point | null;
  childPos: Point | null;
  hunters: Point[];
  potionsLife: Point[];
  potionsScore: Point[];
  score: number;
  lives: number;
  difficulty: Difficulty;
  gameStatus: 'story' | 'menu' | 'playing' | 'gameOver' | 'won';
  playerPath: Point[];
  aiSolutionPath: Point[] | null;
  message: string | null;
}
