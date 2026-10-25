export type VariationFamily =
  | "gambit-accepted"
  | "gambit-declined"
  | "quiet-vienna"
  | "black-sideline";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface KeyPosition {
  afterPly: number;
  explanation: string;
  idea: string;
  pieceHint: string;
  squareHint: string;
  alternatives?: string[];
}

export interface Variation {
  id: string;
  title: string;
  subtitle: string;
  family: VariationFamily;
  difficulty: Difficulty;
  opponentApproach: string;
  moves: string[];
  summary: string;
  ideas: string[];
  warnings: string[];
  tags: string[];
  keyPositions: KeyPosition[];
  sourceNotes: string;
}

export interface TrainingPosition {
  id: string;
  variationId: string;
  variationTitle: string;
  family: VariationFamily;
  difficulty: Difficulty;
  opponentApproach: string;
  fen: string;
  movesToPosition: string[];
  recommendedMove: string;
  explanation: string;
  idea: string;
  pieceHint: string;
  squareHint: string;
  alternatives: string[];
  families: VariationFamily[];
  difficulties: Difficulty[];
  variationIds: string[];
  answers: TrainingAnswer[];
}

export interface TrainingAnswer {
  move: string;
  variationId: string;
  variationTitle: string;
  family: VariationFamily;
  difficulty: Difficulty;
  opponentApproach: string;
  explanation: string;
  idea: string;
  pieceHint: string;
  squareHint: string;
  alternatives: string[];
}

export interface PositionProgress {
  attempts: number;
  correct: number;
  incorrect: number;
  hints: number;
  lastPractised: string;
}

export interface ProgressData {
  positions: Record<string, PositionProgress>;
  bestStreak: number;
  totalSessions: number;
}
