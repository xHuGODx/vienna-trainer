import { Chess, type Move, type Square } from "chess.js";
import { repertoire } from "@/data/repertoire";
import type { TrainingAnswer, TrainingPosition, Variation } from "@/types/repertoire";

const pieceNames = { k: "king", q: "queen", r: "rook", b: "bishop", n: "knight", p: "pawn" } as const;

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
    for (let afterPly = 0; afterPly < variation.moves.length; afterPly += 2) {
      const game = gameFromMoves(variation.moves, afterPly);
      const recommendedMove = variation.moves[afterPly];
      if (!recommendedMove) continue;
      const fen = game.fen();
      const key = positionKey(fen);
      const keyPosition = variation.keyPositions.find((position) => position.afterPly === afterPly);
      const move = new Chess(fen).move(recommendedMove);
      const answer: TrainingAnswer = {
        move: recommendedMove,
        variationId: variation.id,
        variationTitle: variation.title,
        family: variation.family,
        difficulty: variation.difficulty,
        opponentApproach: variation.opponentApproach,
        explanation: keyPosition?.explanation ?? `${recommendedMove} continues ${variation.title} and keeps the repertoire on course.`,
        idea: keyPosition?.idea ?? variation.ideas[Math.min(Math.floor(afterPly / 2), variation.ideas.length - 1)],
        pieceHint: keyPosition?.pieceHint ?? `Move the ${pieceNames[move.piece]} on ${move.from}.`,
        squareHint: keyPosition?.squareHint ?? `The destination is ${move.to}.`,
        alternatives: keyPosition?.alternatives ?? [],
      };
      const existing = byPosition.get(key);

      if (existing) {
        const answerIndex = existing.answers.findIndex((candidate) => candidate.move === recommendedMove && candidate.variationId === variation.id);
        if (answerIndex === -1) existing.answers.push(answer);
        else if (keyPosition) existing.answers[answerIndex] = answer;
        if (!existing.families.includes(variation.family)) existing.families.push(variation.family);
        if (!existing.difficulties.includes(variation.difficulty)) existing.difficulties.push(variation.difficulty);
        if (!existing.variationIds.includes(variation.id)) existing.variationIds.push(variation.id);
        continue;
      }

      byPosition.set(key, {
        id: `${variation.id}-${afterPly}`,
        variationId: variation.id,
        variationTitle: variation.title,
        family: variation.family,
        difficulty: variation.difficulty,
        opponentApproach: variation.opponentApproach,
        fen,
        movesToPosition: variation.moves.slice(0, afterPly),
        recommendedMove,
        explanation: answer.explanation,
        idea: answer.idea,
        pieceHint: answer.pieceHint,
        squareHint: answer.squareHint,
        alternatives: answer.alternatives,
        families: [variation.family],
        difficulties: [variation.difficulty],
        variationIds: [variation.id],
        answers: [answer],
      });
    }
  }

  return Array.from(byPosition.values()).map((position) => {
    const primary = position.answers[0];
    const repertoireAlternatives = position.answers.slice(1).map((answer) => answer.move).filter((move) => move !== primary.move);
    return {
      ...position,
      variationId: primary.variationId,
      variationTitle: primary.variationTitle,
      family: primary.family,
      difficulty: primary.difficulty,
      opponentApproach: position.variationIds.length > 1
        ? `This position is shared by ${position.variationIds.length} repertoire lines.`
        : primary.opponentApproach,
      recommendedMove: primary.move,
      explanation: primary.explanation,
      idea: primary.idea,
      pieceHint: primary.pieceHint,
      squareHint: primary.squareHint,
      alternatives: Array.from(new Set([...primary.alternatives, ...repertoireAlternatives])),
    };
  });
}

export const trainingPositions = createTrainingPositions();

export function variationById(id: string): Variation | undefined {
  return repertoire.find((variation) => variation.id === id);
}
