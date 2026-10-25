"use client";

import { useSyncExternalStore } from "react";
import type { ProgressData } from "@/types/repertoire";

const STORAGE_KEY = "vienna-trainer-progress-v1";
const EVENT_NAME = "vienna-progress-updated";

export const EMPTY_PROGRESS: ProgressData = {
  positions: {},
  bestStreak: 0,
  totalSessions: 0,
};

export function parseProgress(value: string | null): ProgressData {
  if (!value) return EMPTY_PROGRESS;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object") return EMPTY_PROGRESS;
    const candidate = parsed as Partial<ProgressData>;
    if (!candidate.positions || typeof candidate.positions !== "object") return EMPTY_PROGRESS;
    const positions = Object.fromEntries(
      Object.entries(candidate.positions).flatMap(([id, record]) => {
        if (!record || typeof record !== "object") return [];
        const item = record as Partial<ProgressData["positions"][string]>;
        if (![item.attempts, item.correct, item.incorrect, item.hints].every((number) => typeof number === "number" && Number.isFinite(number) && number >= 0)) return [];
        return [[id, {
          attempts: item.attempts as number,
          correct: item.correct as number,
          incorrect: item.incorrect as number,
          hints: item.hints as number,
          lastPractised: typeof item.lastPractised === "string" ? item.lastPractised : "",
        }]];
      }),
    );
    return {
      positions,
      bestStreak: typeof candidate.bestStreak === "number" ? candidate.bestStreak : 0,
      totalSessions: typeof candidate.totalSessions === "number" ? candidate.totalSessions : 0,
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

function snapshot(): string {
  return window.localStorage.getItem(STORAGE_KEY) ?? JSON.stringify(EMPTY_PROGRESS);
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT_NAME, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT_NAME, callback);
  };
}

export function useProgress(): ProgressData {
  return parseProgress(useSyncExternalStore(subscribe, snapshot, () => JSON.stringify(EMPTY_PROGRESS)));
}

function writeProgress(progress: ProgressData): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function recordAttempt(positionId: string, correct: boolean, usedHints: number, currentStreak: number): void {
  const progress = parseProgress(snapshot());
  const previous = progress.positions[positionId] ?? { attempts: 0, correct: 0, incorrect: 0, hints: 0, lastPractised: "" };
  writeProgress({
    ...progress,
    bestStreak: Math.max(progress.bestStreak, currentStreak),
    positions: {
      ...progress.positions,
      [positionId]: {
        attempts: previous.attempts + 1,
        correct: previous.correct + Number(correct),
        incorrect: previous.incorrect + Number(!correct),
        hints: previous.hints + usedHints,
        lastPractised: new Date().toISOString(),
      },
    },
  });
}

export function incrementSessions(): void {
  const progress = parseProgress(snapshot());
  writeProgress({ ...progress, totalSessions: progress.totalSessions + 1 });
}

export function resetProgress(): void {
  writeProgress(EMPTY_PROGRESS);
}

export function masteryFor(attempts: number, correct: number): number {
  if (attempts === 0) return 0;
  const accuracy = correct / attempts;
  const confidence = Math.min(1, attempts / 3);
  return Math.round(accuracy * confidence * 100);
}
