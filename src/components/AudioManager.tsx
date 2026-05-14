"use client";
import { useEffect, useRef } from "react";

interface AudioManagerProps {
  isVideoActive: boolean;
  soundOn: boolean;
}

export default function AudioManager({ isVideoActive, soundOn }: AudioManagerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio on first soundOn toggle
    if (soundOn && !audioRef.current) {
      // Relaxing, calming background music from a royalty-free source
      audioRef.current = new Audio("https://assets.mixkit.co/active_storage/musics/929-8b72c700-b9df-4a84-93f0-1a3f8c7e6b2d/929-preview.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.25; // Quieter for focus
      audioRef.current.playbackRate = 0.95; // Slightly slower for more relaxing effect
    }

    if (audioRef.current) {
      if (soundOn && !isVideoActive) {
        // Fade in effect
        const fadeIn = setInterval(() => {
          if (audioRef.current && audioRef.current.volume < 0.25) {
            audioRef.current.volume = Math.min(audioRef.current.volume + 0.05, 0.25);
          } else {
            clearInterval(fadeIn);
          }
        }, 100);
        audioRef.current.play().catch(e => console.log("Audio play blocked:", e));
      } else if (audioRef.current) {
        // Fade out effect
        const fadeOut = setInterval(() => {
          if (audioRef.current && audioRef.current.volume > 0) {
            audioRef.current.volume = Math.max(audioRef.current.volume - 0.05, 0);
          } else {
            audioRef.current?.pause();
            clearInterval(fadeOut);
          }
        }, 100);
      }
    }
  }, [soundOn, isVideoActive]);

  return null; // This component doesn't render any UI
}
