"use client";

import type { Chess, Move } from "chess.js";
import { useSyncExternalStore } from "react";

export type ChessSound = "move" | "capture" | "castle" | "promotion" | "check" | "checkmate" | "illegal";

const SOUND_STORAGE_KEY = "vienna-trainer-sound";
const SOUND_EVENT = "vienna-sound-updated";
let audioContext: AudioContext | null = null;

export function getChessSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(SOUND_STORAGE_KEY) !== "off";
}

export function setChessSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SOUND_STORAGE_KEY, enabled ? "on" : "off");
  window.dispatchEvent(new Event(SOUND_EVENT));
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(SOUND_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SOUND_EVENT, callback);
  };
}

export function useChessSoundEnabled(): boolean {
  return useSyncExternalStore(subscribe, getChessSoundEnabled, () => true);
}

function tone(
  context: AudioContext,
  frequency: number,
  offset: number,
  duration: number,
  type: OscillatorType,
  volume: number,
): void {
  const start = context.currentTime + offset;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(55, frequency * 0.82), start + duration);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

export function playChessSound(sound: ChessSound): void {
  if (!getChessSoundEnabled() || typeof window === "undefined") return;

  try {
    audioContext ??= new AudioContext();
    if (audioContext.state === "suspended") void audioContext.resume();

    const context = audioContext;
    if (sound === "move") {
      tone(context, 185, 0, 0.075, "triangle", 0.045);
      tone(context, 112, 0.035, 0.055, "sine", 0.025);
    } else if (sound === "capture") {
      tone(context, 165, 0, 0.105, "square", 0.045);
      tone(context, 82, 0.045, 0.12, "triangle", 0.055);
    } else if (sound === "castle") {
      tone(context, 180, 0, 0.07, "triangle", 0.04);
      tone(context, 145, 0.1, 0.08, "triangle", 0.04);
    } else if (sound === "promotion") {
      tone(context, 392, 0, 0.14, "sine", 0.035);
      tone(context, 523, 0.08, 0.15, "sine", 0.035);
      tone(context, 784, 0.16, 0.18, "sine", 0.03);
    } else if (sound === "check") {
      tone(context, 587, 0, 0.13, "sine", 0.04);
      tone(context, 880, 0.1, 0.18, "sine", 0.035);
    } else if (sound === "checkmate") {
      tone(context, 440, 0, 0.18, "triangle", 0.045);
      tone(context, 330, 0.13, 0.2, "triangle", 0.05);
      tone(context, 220, 0.27, 0.25, "triangle", 0.055);
      tone(context, 110, 0.42, 0.32, "sine", 0.06);
    } else {
      tone(context, 105, 0, 0.15, "sawtooth", 0.035);
      tone(context, 82, 0.05, 0.13, "square", 0.025);
    }
  } catch {
    // Audio is an enhancement; unsupported or blocked playback should stay silent.
  }
}

export function playMoveSound(game: Chess, move: Move): void {
  if (game.isCheckmate()) return playChessSound("checkmate");
  if (game.isCheck()) return playChessSound("check");
  if (move.isPromotion()) return playChessSound("promotion");
  if (move.isKingsideCastle() || move.isQueensideCastle()) return playChessSound("castle");
  if (move.isCapture()) return playChessSound("capture");
  playChessSound("move");
}
