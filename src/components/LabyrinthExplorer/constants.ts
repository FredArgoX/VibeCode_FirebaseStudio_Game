import type { GameConfig, Difficulty } from './types';

export const DIFFICULTY_SETTINGS: Record<Difficulty, GameConfig> = {
  facil: {
    rows: 10,
    cols: 10,
    numHunters: 1,
    numPotionsLife: 2,
    numPotionsScore: 2,
  },
  medio: {
    rows: 15,
    cols: 15,
    numHunters: 3,
    numPotionsLife: 3,
    numPotionsScore: 3,
  },
  dificil: {
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
  welcome: "Laberinto de La Llorona",
  gameOver: "Juego terminado. Los espíritus te reclaman...",
  levelComplete: "¡Encontraste al niño! Pero el laberinto cambia...",
  potionLife: "¡Una poción reconfortante! Te sientes más fuerte.",
  potionScore: "¡Esencia resplandeciente! Tu determinación aumenta.",
  hunterEncounter: "¡Un cazador! Escapas por poco.",
};

export const LA_LLORONA_STORY = `
Hace muchos años, vivía una mujer hermosa de origen humilde, llamada María. Su belleza era tan grande que todos los hombres del pueblo la admiraban. Un día, un hombre rico —a veces descrito como un noble español o un caballero criollo— quedó encantado con ella. 
A pesar de pertenecer a clases sociales distintas, él la cortejó, y finalmente ella aceptó casarse con él. 

Tuvieron dos o tres hijos (según la versión), y durante un tiempo fueron felices. Sin embargo, con el paso de los años, el hombre comenzó a distanciarse. Volvía tarde a casa, se interesaba poco por sus hijos y finalmente la abandonó por una mujer de su mismo nivel social. 

Desesperada, devastada por el dolor y la traición, María perdió la razón. En un momento de locura, llevó a sus hijos al río y los ahogó. Al darse cuenta de lo que había hecho, fue consumida por el remordimiento. Algunas versiones dicen que se dejó morir en el río, otras que fue ejecutada, y otras que vivió en desgracia hasta su muerte. 

Después de su muerte, comenzó a aparecerse por las noches, cerca de los ríos o lagunas, vestida de blanco, llorando desconsoladamente y gritando: 
“¡Ay, mis hijos!” 

Desde entonces, su alma vaga como un espíritu atormentado. Se dice que busca a sus hijos entre los vivos, y que si escucha el llanto de un niño o ve a uno solo, intenta llevárselo, confundiéndolo con los suyos. 
`;
