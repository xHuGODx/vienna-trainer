import { Chess } from "chess.js";
import { repertoire } from "../data/repertoire";
import { positionKey } from "../lib/chess";

const errors: string[] = [];
const ids = new Set<string>();
const positions = new Map<string, string>();

for (const variation of repertoire) {
  if (ids.has(variation.id)) errors.push(`ID duplicado: ${variation.id}`);
  ids.add(variation.id);

  const game = new Chess();
  const fens = [game.fen()];
  variation.moves.forEach((san, index) => {
    try {
      game.move(san);
      fens.push(game.fen());
    } catch (error) {
      errors.push(`${variation.id}: illegal move ${index + 1} (${san}): ${String(error)}`);
    }
  });

  for (const position of variation.keyPositions) {
    if (position.afterPly < 4 || position.afterPly >= variation.moves.length) {
      errors.push(`${variation.id}: afterPly ${position.afterPly} fora da linha`);
      continue;
    }
    if (position.afterPly % 2 !== 0) {
      errors.push(`${variation.id}: training position ${position.afterPly} is not White to move`);
      continue;
    }
    const fen = fens[position.afterPly];
    if (!fen) continue;
    const trainingGame = new Chess(fen);
    const move = variation.moves[position.afterPly];
    try {
      trainingGame.move(move);
    } catch {
      errors.push(`${variation.id}: resposta recomendada ilegal em ${position.afterPly}: ${move}`);
    }
    const key = positionKey(fen);
    const previous = positions.get(key);
    if (previous && previous !== move) {
      errors.push(`${variation.id}: duplicate position with incompatible answers (${previous}/${move})`);
    } else {
      positions.set(key, move);
    }
  }
}

if (errors.length) {
  console.error(`Invalid repertoire (${errors.length} problems):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`✓ ${repertoire.length} legal variations`);
console.log(`✓ ${positions.size} unique, valid training positions`);
