"use client";

import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

interface SoundPlayerProps {
  soundUrl?: string; // e.g., "/sounds/llorona_cry.mp3"
  playOnMount?: boolean;
}

let globalPlayer: Tone.Player | null = null;
let isToneStarted = false;

const SoundPlayer: React.FC<SoundPlayerProps> = ({ soundUrl, playOnMount }) => {
  const playerRef = useRef<Tone.Player | null>(null);

  useEffect(() => {
    const initializeTone = async () => {
      if (!isToneStarted) {
        await Tone.start();
        isToneStarted = true;
        console.log("AudioContext started");
      }
    };
    
    initializeTone();

    if (soundUrl) {
      if (!globalPlayer) {
        globalPlayer = new Tone.Player(soundUrl, () => {
          console.log(`Sound loaded: ${soundUrl}`);
          if (playOnMount) {
            globalPlayer?.start();
          }
        }).toDestination();
        playerRef.current = globalPlayer;
      } else {
         // If globalPlayer exists, assume it's loaded with a default sound or we manage it externally
         playerRef.current = globalPlayer;
         if (playOnMount && playerRef.current?.loaded) {
            playerRef.current.start();
         }
      }
    }

    return () => {
      // Don't dispose the global player here, it might be used by other instances or managed externally.
      // playerRef.current?.dispose();
    };
  }, [soundUrl, playOnMount]);

  return null; // This component doesn't render anything
};

export const playLloronaSound = async (url: string = "/sounds/llorona_cry.mp3") => {
  if (!isToneStarted) {
    await Tone.start();
    isToneStarted = true;
  }
  
  if (!globalPlayer || globalPlayer.buffer.url !== url) {
    globalPlayer?.dispose(); // Dispose old player if URL is different
    globalPlayer = new Tone.Player(url, () => {
      globalPlayer?.start();
    }).toDestination();
  } else if (globalPlayer.loaded) {
    globalPlayer.start();
  }
};


export default SoundPlayer;
