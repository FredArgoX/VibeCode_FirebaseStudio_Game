"use client";

import { cn } from "@/lib/utils";
import { CellType, type Point } from "./types";
import { User, Skull, Baby, FlaskConical, ShieldAlert, পথ } from "lucide-react"; // Corrected Path import

interface CellProps {
  type: CellType;
  isPlayerPos: boolean;
  isChildPos: boolean;
  isHunter: boolean;
  isPotionLife: boolean;
  isPotionScore: boolean;
  isPlayerVisited: boolean;
  isAiPath: boolean;
  position: Point;
}

// Placeholder icons for items if specific cell types are not directly player/child
const itemIcons: Partial<Record<CellType, React.ReactNode>> = {
  [CellType.PLAYER]: <User className="w-full h-full text-accent" />,
  [CellType.CHILD]: <Baby className="w-full h-full text-blue-400" />,
  [CellType.HUNTER]: <ShieldAlert className="w-full h-full text-red-500" />, // Changed from Skull for "hunter"
  [CellType.POTION_LIFE]: <FlaskConical className="w-full h-full text-green-500" />,
  [CellType.POTION_SCORE]: <FlaskConical className="w-full h-full text-yellow-500" />,
};


export function Cell({ 
  type, 
  isPlayerPos, 
  isChildPos, 
  isHunter, 
  isPotionLife, 
  isPotionScore, 
  isPlayerVisited, 
  isAiPath 
}: CellProps) {
  let content: React.ReactNode = null;
  let bgColor = "bg-background"; // Default path color (matches overall background)

  if (type === CellType.WALL) {
    bgColor = "bg-neutral-700"; // Dark brown for walls
  } else {
    // Path-like cells
    bgColor = "bg-yellow-900/30"; // Earthy path color, slightly lighter than background
    if (isPlayerVisited) bgColor = "bg-orange-800/40"; // Highlight player's path
    if (isAiPath) bgColor = "bg-blue-600/50"; // Highlight AI solution path
  }

  // Overlay icons based on occupants
  if (isPlayerPos) {
    content = itemIcons[CellType.PLAYER];
    bgColor = "bg-accent/30"; // Player current location distinct
  } else if (isChildPos) {
    content = itemIcons[CellType.CHILD];
  } else if (isHunter) {
    content = itemIcons[CellType.HUNTER];
  } else if (isPotionLife) {
    content = itemIcons[CellType.POTION_LIFE];
  } else if (isPotionScore) {
    content = itemIcons[CellType.POTION_SCORE];
  }
  

  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center border border-neutral-600/50 transition-colors duration-300",
        bgColor,
        "aspect-square" // Ensure cells are square
      )}
      aria-label={`Cell type: ${type}`}
    >
      <div className="w-3/4 h-3/4">{content}</div>
    </div>
  );
}
