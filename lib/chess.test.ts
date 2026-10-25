import { describe, expect, it } from "vitest";
import { Chess } from "chess.js";
import { repertoire } from "@/data/repertoire";
import { createTrainingPositions, fenAfterMoves, positionKey } from "@/lib/chess";
import { masteryFor, parseProgress } from "@/lib/progress";

describe("repertório", () => {
  it("contém apenas sequências legais", () => {
    for (const variation of repertoire) {
      expect(() => fenAfterMoves(variation.moves), variation.id).not.toThrow();
    }
  });

  it("gera posições únicas com respostas legais", () => {
    const positions = createTrainingPositions();
    expect(new Set(positions.map((position) => positionKey(position.fen))).size).toBe(positions.length);
    for (const position of positions) {
      const game = new Chess(position.fen);
      expect(() => game.move(position.recommendedMove), position.id).not.toThrow();
    }
  });
});

describe("progresso", () => {
  it("recupera de armazenamento inválido", () => {
    expect(parseProgress("not-json").positions).toEqual({});
    expect(parseProgress(null).bestStreak).toBe(0);
  });

  it("calcula domínio com precisão e confiança", () => {
    expect(masteryFor(0, 0)).toBe(0);
    expect(masteryFor(1, 1)).toBe(33);
    expect(masteryFor(3, 3)).toBe(100);
    expect(masteryFor(4, 2)).toBe(50);
  });
});
