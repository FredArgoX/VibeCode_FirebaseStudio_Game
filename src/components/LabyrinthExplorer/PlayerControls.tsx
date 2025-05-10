"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Zap } from "lucide-react";

interface PlayerControlsProps {
  onMove: (dx: number, dy: number) => void;
  onSolveMaze: () => void;
  disabled: boolean;
}

export function PlayerControls({ onMove, onSolveMaze, disabled }: PlayerControlsProps) {
  return (
    <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
      <div className="grid grid-cols-3 gap-2 w-48">
        <div></div> {/* Empty cell for layout */}
        <Button onClick={() => onMove(0, -1)} variant="outline" size="icon" disabled={disabled} aria-label="Move Up" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <ArrowUp />
        </Button>
        <div></div> {/* Empty cell for layout */}

        <Button onClick={() => onMove(-1, 0)} variant="outline" size="icon" disabled={disabled} aria-label="Move Left" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <ArrowLeft />
        </Button>
        <div className="flex items-center justify-center"> {/* Placeholder for center, or another button */}
           <Button onClick={() => onMove(0, 1)} variant="outline" size="icon" disabled={disabled} aria-label="Move Down" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
            <ArrowDown />
          </Button>
        </div>
        <Button onClick={() => onMove(1, 0)} variant="outline" size="icon" disabled={disabled} aria-label="Move Right" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
          <ArrowRight />
        </Button>
      </div>
       <Button onClick={onSolveMaze} variant="ghost" disabled={disabled} className="mt-4 text-accent hover:bg-accent/20">
        <Zap className="mr-2 h-4 w-4" /> AI Solve
      </Button>
    </div>
  );
}
