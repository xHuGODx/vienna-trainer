"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Chess, type Square } from "chess.js";
import { ChessBoard } from "@/components/chess-board";
import { CheckIcon, CloseIcon, LightbulbIcon, TargetIcon } from "@/components/icons";
import { difficultyLabels, familyLabels } from "@/data/repertoire";
import { formatMoveSequence } from "@/lib/chess";
import { incrementSessions, recordAttempt, useProgress } from "@/lib/progress";
import { playChessSound, playMoveSound } from "@/lib/sounds";
import type { Difficulty, TrainingAnswer, TrainingPosition, Variation, VariationFamily } from "@/types/repertoire";

type Feedback = "correct" | "incorrect" | "revealed" | "illegal" | null;
type LengthOption = 5 | 10 | 20 | "all" | "infinite";

function shuffled<T>(items: T[]): T[] {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const random = Math.floor(Math.random() * (index + 1));
    [next[index], next[random]] = [next[random], next[index]];
  }
  return next;
}

export function Trainer({ positions, variations, initialFamily = "all" }: { positions: TrainingPosition[]; variations: Variation[]; initialFamily?: VariationFamily | "all" }) {
  const progress = useProgress();
  const [family, setFamily] = useState<VariationFamily | "all">(initialFamily);
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [reviewOnly, setReviewOnly] = useState(false);
  const [length, setLength] = useState<LengthOption>(10);
  const [queue, setQueue] = useState<TrainingPosition[]>([]);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [hints, setHints] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestSessionStreak, setBestSessionStreak] = useState(0);
  const [displayFen, setDisplayFen] = useState("");
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [complete, setComplete] = useState(false);
  const [lineId, setLineId] = useState(variations[0]?.id ?? "");
  const [selectedAnswer, setSelectedAnswer] = useState<TrainingAnswer | null>(null);

  const available = useMemo(() => positions.filter((position) => {
    const hasMatchingAnswer = position.answers.some((answer) =>
      (family === "all" || answer.family === family)
      && (difficulty === "all" || answer.difficulty === difficulty));
    if (!hasMatchingAnswer) return false;
    if (reviewOnly && !(progress.positions[position.id]?.incorrect > 0)) return false;
    return true;
  }), [positions, family, difficulty, reviewOnly, progress.positions]);

  const current = queue[index];
  const currentAnswers = useMemo(() => current?.answers.filter((answer) =>
    (family === "all" || answer.family === family)
    && (difficulty === "all" || answer.difficulty === difficulty)) ?? [], [current, family, difficulty]);
  const answerToShow = selectedAnswer ?? currentAnswers[0];
  const playableAlternatives = answerToShow
    ? Array.from(new Set([...answerToShow.alternatives, ...currentAnswers.filter((answer) => answer.move !== answerToShow.move).map((answer) => answer.move)]))
    : [];

  const begin = () => {
    const random = shuffled(available);
    const selected = length === "infinite" || length === "all" ? random : random.slice(0, length);
    if (!selected.length) return;
    setQueue(selected);
    setIndex(0);
    setFeedback(null);
    setHints(0);
    setScore(0);
    setCorrect(0);
    setIncorrect(0);
    setStreak(0);
    setBestSessionStreak(0);
    setDisplayFen(selected[0].fen);
    setLastMove(null);
    setComplete(false);
    setSelectedAnswer(null);
    incrementSessions();
  };

  const answer = (from: Square, to: Square): boolean => {
    if (!current || (feedback && feedback !== "illegal")) return false;
    const game = new Chess(current.fen);
    let move;
    try {
      move = game.move({ from, to, promotion: "q" });
    } catch {
      setFeedback("illegal");
      playChessSound("illegal");
      return false;
    }
    const matchingAnswer = currentAnswers.find((answer) => {
      const expected = new Chess(current.fen).move(answer.move);
      return move.from === expected.from && move.to === expected.to && move.promotion === expected.promotion;
    });
    const isCorrect = Boolean(matchingAnswer);
    setSelectedAnswer(matchingAnswer ?? currentAnswers[0] ?? null);
    playMoveSound(game, move);
    setDisplayFen(game.fen());
    setLastMove({ from, to });
    if (isCorrect) {
      const nextStreak = streak + 1;
      setFeedback("correct");
      setCorrect((value) => value + 1);
      setStreak(nextStreak);
      setBestSessionStreak((value) => Math.max(value, nextStreak));
      setScore((value) => value + Math.max(40, 100 - hints * 20));
      recordAttempt(current.id, true, hints, nextStreak);
    } else {
      setFeedback("incorrect");
      setIncorrect((value) => value + 1);
      setStreak(0);
      recordAttempt(current.id, false, hints, streak);
    }
    return true;
  };

  const reveal = () => {
    if (!current || (feedback && feedback !== "illegal")) return;
    setFeedback("revealed");
    setIncorrect((value) => value + 1);
    setStreak(0);
    recordAttempt(current.id, false, hints, streak);
    const revealedAnswer = currentAnswers[0];
    if (!revealedAnswer) return;
    setSelectedAnswer(revealedAnswer);
    const game = new Chess(current.fen);
    const move = game.move(revealedAnswer.move);
    playMoveSound(game, move);
    setDisplayFen(game.fen());
    setLastMove({ from: move.from, to: move.to });
  };

  const next = () => {
    if (!current) return;
    if (index + 1 >= queue.length) {
      if (length === "infinite") {
        const additions = shuffled(available);
        setQueue((items) => [...items, ...additions]);
        const nextPosition = additions[0];
        setIndex((value) => value + 1);
        setFeedback(null);
        setHints(0);
        setSelectedAnswer(null);
        setDisplayFen(nextPosition.fen);
        setLastMove(null);
        return;
      } else {
        setComplete(true);
        return;
      }
    }
    const nextPosition = queue[index + 1] ?? shuffled(available)[0];
    setIndex((value) => value + 1);
    setFeedback(null);
    setHints(0);
    setSelectedAnswer(null);
    setDisplayFen(nextPosition.fen);
    setLastMove(null);
  };

  if (!queue.length || complete) {
    return (
      <div className="trainer-setup">
        {complete ? (
          <div className="session-complete">
            <div className="success-ring"><TargetIcon size={34} /></div>
            <span>Session complete</span>
            <h2>{correct} correct out of {correct + incorrect}</h2>
            <p>{score} points · best streak this session: {bestSessionStreak}</p>
          </div>
        ) : (
          <div className="setup-intro"><span>Set up session</span><h2>What do you want to train?</h2><p>Choose a family and train its unique positions with White to move.</p></div>
        )}
        <div className="setup-grid">
          <label><span>Family</span><select value={family} onChange={(event) => setFamily(event.target.value as VariationFamily | "all")}><option value="all">All lines</option>{Object.entries(familyLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          <label><span>Difficulty</span><select value={difficulty} onChange={(event) => setDifficulty(event.target.value as Difficulty | "all")}><option value="all">All</option>{Object.entries(difficultyLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
          <label><span>Length</span><select value={length} onChange={(event) => setLength(event.target.value === "all" || event.target.value === "infinite" ? event.target.value : Number(event.target.value) as 5 | 10 | 20)}><option value={5}>5 positions</option><option value={10}>10 positions</option><option value={20}>20 positions</option><option value="all">All available positions</option><option value="infinite">Endless training</option></select></label>
          <label className="review-toggle"><input checked={reviewOnly} onChange={(event) => setReviewOnly(event.target.checked)} type="checkbox"/><span>Previous mistakes only</span></label>
        </div>
        <div className="setup-footer"><span>{available.length} positions available</span><button className="button primary" disabled={!available.length} onClick={begin} type="button">{complete ? "Train again" : "Start training"}</button></div>
        <div className="line-picker">
          <div><span>Full-line training</span><strong>Play a variation from start to finish</strong><p>You play every move for White while the trainer handles Black&apos;s replies.</p></div>
          <label><span className="sr-only">Choose a line</span><select onChange={(event) => setLineId(event.target.value)} value={lineId}>{variations.map((variation) => <option key={variation.id} value={variation.id}>{variation.title} · {variation.subtitle}</option>)}</select></label>
          <Link className="button secondary" href={`/treinar?line=${lineId}`}>Train full line</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="trainer-layout">
      <section className="trainer-board-column">
        <div className="trainer-scorebar"><div><span>Points</span><strong>{score}</strong></div><div><span>Correct</span><strong>{correct}</strong></div><div><span>Streak</span><strong>{streak}</strong></div><div><span>Position</span><strong>{index + 1}{length !== "infinite" && `/${queue.length}`}</strong></div></div>
        <ChessBoard fen={displayFen || current.fen} interactive={!feedback || feedback === "illegal"} lastMove={lastMove} onMove={answer} />
        <p className="board-help">Drag a piece or select its starting and destination squares.</p>
      </section>

      <section className="trainer-panel">
        <div className="trainer-context"><span>{currentAnswers.length > 1 ? "Multiple lines" : familyLabels[answerToShow?.family ?? current.family]}</span><span>{difficultyLabels[answerToShow?.difficulty ?? current.difficulty]}</span></div>
        <h1>What is the next best move?</h1>
        <p>{currentAnswers.length === 1 ? answerToShow?.opponentApproach : current.opponentApproach}</p>
        <div className="position-sequence"><span>{current.movesToPosition.length ? "Position after" : "Position"}</span><strong>{current.movesToPosition.length ? formatMoveSequence(current.movesToPosition) : "Starting position"}</strong></div>

        {!feedback || feedback === "illegal" ? (
          <div className="hint-area">
            {feedback === "illegal" && <div className="feedback compact error"><CloseIcon size={18} /><span>That move is not legal in this position.</span></div>}
            {hints > 0 && answerToShow && <div className="hint"><LightbulbIcon size={19} /><span>{hints === 1 ? answerToShow.pieceHint : answerToShow.squareHint}</span></div>}
            <div className="trainer-actions">
              <button className="button secondary" disabled={hints >= 2} onClick={() => setHints((value) => Math.min(2, value + 1))} type="button"><LightbulbIcon size={17} />{hints ? "Another hint" : "Get a hint"}</button>
              <button className="text-button" onClick={reveal} type="button">Show answer</button>
            </div>
          </div>
        ) : (
          <div className={`answer-card ${feedback === "correct" ? "success" : "error"}`}>
            <div className="answer-title">{feedback === "correct" ? <CheckIcon /> : <CloseIcon />}<div><span>{feedback === "correct" ? "Correct!" : feedback === "revealed" ? "Answer revealed" : "There is a better idea"}</span><strong>{answerToShow?.move}</strong></div></div>
            <p>{answerToShow?.explanation}</p>
            <div className="idea-box"><span>Idea</span><p>{answerToShow?.idea}</p></div>
            {playableAlternatives.length > 0 && <p className="alternatives">Other repertoire choices: {playableAlternatives.join(", ")}</p>}
            <div className="answer-actions"><Link href={`/repertorio/${answerToShow?.variationId ?? current.variationId}`}>Study full line</Link><button className="button primary" onClick={next} type="button">Next position</button></div>
          </div>
        )}
      </section>
    </div>
  );
}
