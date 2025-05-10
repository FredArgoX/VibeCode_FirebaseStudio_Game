// 'use server'
'use server';

/**
 * @fileOverview An AI maze solver.
 *
 * - solveMaze - A function that solves the maze.
 * - SolveMazeInput - The input type for the solveMaze function.
 * - SolveMazeOutput - The return type for the solveMaze function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolveMazeInputSchema = z.object({
  maze: z.string().describe('A string representation of the maze.'),
  start: z.object({
    x: z.number().describe('The x coordinate of the start point.'),
    y: z.number().describe('The y coordinate of the start point.'),
  }).describe('The starting point of the maze.'),
  end: z.object({
    x: z.number().describe('The x coordinate of the end point.'),
    y: z.number().describe('The y coordinate of the end point.'),
  }).describe('The ending point of the maze.'),
});

export type SolveMazeInput = z.infer<typeof SolveMazeInputSchema>;

const SolveMazeOutputSchema = z.object({
  path: z
    .array(z.object({
      x: z.number().describe('The x coordinate of the path point.'),
      y: z.number().describe('The y coordinate of the path point.'),
    }))
    .describe('The optimal path from start to finish.'),
});

export type SolveMazeOutput = z.infer<typeof SolveMazeOutputSchema>;

export async function solveMaze(input: SolveMazeInput): Promise<SolveMazeOutput> {
  return solveMazeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solveMazePrompt',
  input: {schema: SolveMazeInputSchema},
  output: {schema: SolveMazeOutputSchema},
  prompt: `You are an AI maze solver. Given a maze, a start point, and an end point, you will find the optimal path from start to finish.

The maze is represented as a string, where '#' represents a wall and ' ' represents an open space.

Maze:
{{maze}}

Start: {{start.x}}, {{start.y}}
End: {{end.x}}, {{end.y}}

Output the path as an array of x, y coordinates.

Ensure that the path is optimal and does not include any unnecessary steps.
`,
});

const solveMazeFlow = ai.defineFlow(
  {
    name: 'solveMazeFlow',
    inputSchema: SolveMazeInputSchema,
    outputSchema: SolveMazeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
