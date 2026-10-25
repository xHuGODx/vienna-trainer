import { Chess, type Move, type Square } from "chess.js";
import { repertoire } from "@/data/repertoire";
import type { TrainingPosition, Variation } from "@/types/repertoire";

export function gameFromMoves(moves: string[], count = moves.length): Chess {
  const game = new Chess();
  for (const san of moves.slice(0, count)) {
    game.move(san);
  }
  return game;
}

export function fenAfterMoves(moves: string[], count = moves.length): string {
  return gameFromMoves(moves, count).fen();
}

export function positionKey(fen: string): string {
  return fen.split(" ").slice(0, 4).join(" ");
}

export function moveNumberLabel(ply: number): string {
  const move = Math.floor(ply / 2) + 1;
  return ply % 2 === 0 ? `${move}.` : `${move}...`;
}

export function formatMoveSequence(moves: string[]): string {
  const parts: string[] = [];
  for (let index = 0; index < moves.length; index += 2) {
    const white = moves[index];
    const black = moves[index + 1];
    parts.push(`${index / 2 + 1}. ${white}${black ? ` ${black}` : ""}`);
  }
  return parts.join(" ");
}

export function resolveMove(fen: string, from: Square, to: Square): Move | null {
  const game = new Chess(fen);
  try {
    return game.move({ from, to, promotion: "q" });
  } catch {
    return null;
  }
}

export function legalTargets(fen: string, from: Square): Square[] {
  const game = new Chess(fen);
  return game.moves({ square: from, verbose: true }).map((move) => move.to);
}

export function createTrainingPositions(variations: Variation[] = repertoire): TrainingPosition[] {
  const byPosition = new Map<string, TrainingPosition>();

  for (const variation of variations) {
    for (const keyPosition of variation.keyPositions) {
      const game = gameFromMoves(variation.moves, keyPosition.afterPly);
      const recommendedMove = variation.moves[keyPosition.afterPly];
      if (!recommendedMove) continue;
      const fen = game.fen();
      const key = positionKey(fen);
      const existing = byPosition.get(key);
      if (existing && existing.recommendedMove !== recommendedMove) continue;
      if (existing) continue;

      byPosition.set(key, {
        id: `${variation.id}-${keyPosition.afterPly}`,
        variationId: variation.id,
        variationTitle: variation.title,
        family: variation.family,
        difficulty: variation.difficulty,
        opponentApproach: variation.opponentApproach,
        fen,
        movesToPosition: variation.moves.slice(0, keyPosition.afterPly),
        recommendedMove,
        explanation: keyPosition.explanation,
        idea: keyPosition.idea,
        pieceHint: keyPosition.pieceHint,
        squareHint: keyPosition.squareHint,
        alternatives: keyPosition.alternatives ?? [],
      });
    }
  }

  return Array.from(byPosition.values());
}

export const trainingPositions = createTrainingPositions();

export function variationById(id: string): Variation | undefined {
  return repertoire.find((variation) => variation.id === id);
}
