import type { GameConfig, Difficulty } from './types';

export const DIFFICULTY_SETTINGS: Record<Difficulty, GameConfig> = {
  easy: {
    rows: 10,
    cols: 10,
    numHunters: 1,
    numPotionsLife: 2,
    numPotionsScore: 2,
  },
  medium: {
    rows: 15,
    cols: 15,
    numHunters: 3,
    numPotionsLife: 3,
    numPotionsScore: 3,
  },
  hard: {
    rows: 20,
    cols: 20,
    numHunters: 5,
    numPotionsLife: 2,
    numPotionsScore: 2,
  },
};

export const INITIAL_LIVES = 3;
export const INITIAL_SCORE = 0;
export const POTION_SCORE_VALUE = 50;

export const MESSAGES = {
  welcome: "La Llorona's Labyrinth",
  gameOver: "Game Over. The spirits claim you...",
  levelComplete: "You found the child! But the Labyrinth shifts...",
  potionLife: "A soothing potion! You feel stronger.",
  potionScore: "Sparkling essence! Your resolve grows.",
  hunterEncounter: "A hunter! You narrowly escape, but feel drained.",
};

export const LA_LLORONA_STORY = `
In the darkest corners of folklore, a chilling tale is whispered - the story of La Llorona, The Weeping Woman. 
Legend says she was a beautiful woman who, in a fit of jealous rage against her unfaithful husband, drowned her own children in a river. 
Consumed by guilt and sorrow, her spirit is now cursed to roam the earth, eternally searching for her lost offspring. 
Her mournful cries, "¡Ay, mis hijos!" ("Oh, my children!"), echo through the night, striking fear into the hearts of those who hear them. 
They say if you hear her weeping, she is near. And if you see her, she might mistake you for one of her own... and drag you to a watery grave.

You, as the spirit of La Llorona, are trapped in an ethereal labyrinth, desperately seeking your lost child. 
But beware, for spectral hunters, remnants of those who sought to banish you, still roam these twisted paths, eager to weaken your already tormented soul. 
Find potions to sustain your spiritual form and navigate the maze to reunite with your child.
`;
