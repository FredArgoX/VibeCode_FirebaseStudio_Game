"use client";

import { useState, useEffect } from 'react';
import { LabyrinthExplorer } from '@/components/LabyrinthExplorer';
import { StoryIntro } from '@/components/LabyrinthExplorer/StoryIntro';
import { GameMenu } from '@/components/LabyrinthExplorer/GameMenu';
import type { Difficulty } from '@/components/LabyrinthExplorer/types';
import SoundPlayer from '@/components/LabyrinthExplorer/SoundPlayer'; // For initial sound

type AppState = 'story' | 'menu' | 'playing';

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>('story');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('facil');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures Tone.js and other client-side logic runs after mount
  }, []);


  const handleProceedFromStory = () => {
    setAppState('menu');
  };

  const handleStartGame = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setAppState('playing');
  };

  const handleReturnToMenu = () => {
    setAppState('menu');
  }

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-foreground">Cargando laberinto...</p>
      </div>
    ); // Or a loading spinner
  }

  return (
    <main className="flex-grow flex flex-col items-center justify-center">
      {/* SoundPlayer can be here for a global sound or within LabyrinthExplorer for game-specific sounds */}
      {/* <SoundPlayer soundUrl="/sounds/llorona_cry.mp3" playOnMount={appState === 'story'} /> */}
      
      {appState === 'story' && (
        <StoryIntro isOpen={true} onClose={handleProceedFromStory} />
      )}
      {appState === 'menu' && (
        <GameMenu onStartGame={handleStartGame} />
      )}
      {appState === 'playing' && (
        <LabyrinthExplorer difficulty={selectedDifficulty} onReturnToMenu={handleReturnToMenu}/>
      )}
    </main>
  );
}
