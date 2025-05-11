"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Difficulty } from "./types";
import { Flame } from "lucide-react";

interface GameMenuProps {
  onStartGame: (difficulty: Difficulty) => void;
}

export function GameMenu({ onStartGame }: GameMenuProps) {
  const difficulties: Difficulty[] = ['facil', 'medio', 'dificil'];
  //const difficulties: Difficulty[] = ['facil', 'medio', 'dificil'];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md bg-card text-card-foreground shadow-2xl rounded-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Flame className="w-16 h-16 text-accent" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary-foreground">Laberinto de la Llorona</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            La Llorona busca a sus hijos. Guiala a traves del laberinto.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-lg font-medio">Elije la dificultad:</p>
          {difficulties.map((level) => (
            <Button
              key={level}
              onClick={() => onStartGame(level)}
              variant="outline"
              className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 ease-in-out transform hover:scale-105"
              size="lg"
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            Teclas de flecha o botones en pantalla para moverte.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
