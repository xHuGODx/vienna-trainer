import { Chess } from "chess.js";
import { repertoire } from "../data/repertoire";
import { createTrainingPositions, positionKey } from "../lib/chess";

const errors: string[] = [];
const ids = new Set<string>();

for (const variation of repertoire) {
  if (ids.has(variation.id)) errors.push(`Duplicate ID: ${variation.id}`);
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
      errors.push(`${variation.id}: afterPly ${position.afterPly} is outside the line`);
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
      errors.push(`${variation.id}: illegal recommended move at ${position.afterPly}: ${move}`);
    }
  }
}

const trainingPositions = createTrainingPositions(repertoire);
const positionsByKey = new Map(trainingPositions.map((position) => [positionKey(position.fen), position]));

for (const variation of repertoire) {
  for (let afterPly = 0; afterPly < variation.moves.length; afterPly += 2) {
    const game = new Chess();
    variation.moves.slice(0, afterPly).forEach((move) => game.move(move));
    const position = positionsByKey.get(positionKey(game.fen()));
    const expectedMove = variation.moves[afterPly];
    if (!position) {
      errors.push(`${variation.id}: missing training position at ${afterPly}`);
      continue;
    }
    if (!position.answers.some((answer) => answer.move === expectedMove && answer.variationId === variation.id)) {
      errors.push(`${variation.id}: missing ${expectedMove} as an accepted answer at ${afterPly}`);
    }
  }
}

for (const position of trainingPositions) {
  if (!position.fen.includes(" w ")) errors.push(`${position.id}: training position is not White to move`);
  for (const answer of position.answers) {
    try {
      new Chess(position.fen).move(answer.move);
    } catch {
      errors.push(`${position.id}: illegal accepted answer ${answer.move}`);
    }
  }
}

if (errors.length) {
  console.error(`Invalid repertoire (${errors.length} problems):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`✓ ${repertoire.length} legal variations`);
console.log(`✓ ${trainingPositions.length} unique, valid training positions covering every line`);
