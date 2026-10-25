import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { repertoire } from "@/data/repertoire";
import { createTrainingPositions, fenAfterMoves, positionKey } from "@/lib/chess";
import { masteryFor, parseProgress } from "@/lib/progress";

describe("repertoire", () => {
  it("contains only legal sequences", () => {
    for (const variation of repertoire) {
      expect(() => fenAfterMoves(variation.moves), variation.id).not.toThrow();
    }
  });

  it("generates unique positions with legal answers", () => {
    const positions = createTrainingPositions();
    expect(new Set(positions.map((position) => positionKey(position.fen))).size).toBe(positions.length);
    for (const position of positions) {
      const game = new Chess(position.fen);
      expect(() => game.move(position.recommendedMove), position.id).not.toThrow();
    }
  });
});

describe("progresso", () => {
  it("recovers from invalid storage", () => {
    expect(parseProgress("not-json").positions).toEqual({});
    expect(parseProgress(null).bestStreak).toBe(0);
  });

  it("calculates mastery from accuracy and confidence", () => {
    expect(masteryFor(0, 0)).toBe(0);
    expect(masteryFor(1, 1)).toBe(33);
    expect(masteryFor(3, 3)).toBe(100);
    expect(masteryFor(4, 2)).toBe(50);
  });
});
