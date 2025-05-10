"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, Gem, MessageCircle } from "lucide-react";

interface HUDProps {
  score: number;
  lives: number;
  message?: string | null;
  difficulty: string;
}

export function HUD({ score, lives, message, difficulty }: HUDProps) {
  return (
    <Card className="w-full max-w-2xl p-3 bg-card/80 backdrop-blur-sm shadow-lg rounded-lg border-border">
      <CardContent className="flex flex-col sm:flex-row justify-between items-center p-0 gap-2 sm:gap-4">
        <div className="flex items-center space-x-2 text-lg">
          <Heart className="text-red-500 w-6 h-6" />
          <span className="font-semibold text-primary-foreground">{lives}</span>
        </div>
        <div className="flex items-center space-x-2 text-lg">
          <Gem className="text-yellow-400 w-6 h-6" />
          <span className="font-semibold text-primary-foreground">{score}</span>
        </div>
        <div className="text-sm text-center sm:text-left text-muted-foreground capitalize">
          Difficulty: {difficulty}
        </div>
        {message && (
          <div className="flex items-center space-x-1 text-xs sm:text-sm text-accent">
            <MessageCircle className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
