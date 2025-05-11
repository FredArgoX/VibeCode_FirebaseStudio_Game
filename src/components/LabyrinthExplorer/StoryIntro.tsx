"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { LA_LLORONA_STORY } from "./constants";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StoryIntroProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StoryIntro({ isOpen, onClose }: StoryIntroProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card text-card-foreground shadow-xl rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-accent">La Leyenda de La Llorona<br/>By: SamuelFredX Technologies</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full p-1 rounded-md border border-border">
          <DialogDescription className="text-sm whitespace-pre-line p-4 leading-relaxed">
            {LA_LLORONA_STORY}
          </DialogDescription>
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Entra al laberinto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
