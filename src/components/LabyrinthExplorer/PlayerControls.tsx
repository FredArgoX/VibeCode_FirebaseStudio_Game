"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap } from "lucide-react";

interface PlayerControlsProps {
  onMove: (dx: number, dy: number) => void;
  onSolveMaze: () => void;
  disabled: boolean;
}

export function PlayerControls({ onMove, onSolveMaze, disabled }: PlayerControlsProps) {
  // Using a grid for the D-pad layout and flex for centering
  return (
 <div className="flex flex-col items-center p-4 rounded-lg">
      <div className="grid grid-cols-3 gap-1 w-40">
 {/* Up button */ }
 <div className="col-start-2 flex justify-center">
 <Button onClick={() => onMove(0, -1)} variant="outline" size="icon" disabled={disabled} aria-label="Move Up" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground w-12 h-12">
          <ArrowUp />
        </Button>
 </div>
 {/* Second row: Left, Down, Right buttons */ }
 <Button onClick={() => onMove(-1, 0)} variant="outline" size="icon" disabled={disabled} aria-label="Move Left" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground w-12 h-12">
          <ArrowLeft />
        </Button>
        <Button onClick={() => onMove(0, 1)} variant="outline" size="icon" disabled={disabled} aria-label="Move Down" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground w-12 h-12 ">
          <ArrowDown />
        </Button>
 <Button onClick={() => onMove(1, 0)} variant="outline" size="icon" disabled={disabled} aria-label="Move Right" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground w-12 h-12">
          <ArrowRight />
        </Button>
 </div>
      <Button onClick={onSolveMaze} variant="ghost" disabled={disabled} className="mt-6 text-accent hover:bg-accent/20">
        <Zap className="mr-2 h-4 w-4" /> AI Solve
      </Button>
    </div>
  );
}
