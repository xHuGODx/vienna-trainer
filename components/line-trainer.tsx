"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Chess, type PieceSymbol, type Square } from "chess.js";
import { ChessBoard } from "@/components/chess-board";
import { CheckIcon, CloseIcon, LightbulbIcon, TargetIcon } from "@/components/icons";
import { difficultyLabels, familyLabels } from "@/data/repertoire";
import { fenAfterMoves, formatMoveSequence } from "@/lib/chess";
import { incrementSessions, recordAttempt } from "@/lib/progress";
import { playChessSound, playMoveSound } from "@/lib/sounds";
import type { Variation } from "@/types/repertoire";

type Feedback = "correct" | "incorrect" | "revealed" | "illegal" | null;

const pieceNames: Record<PieceSymbol, string> = {
  k: "king",
  q: "queen",
  r: "rook",
  b: "bishop",
  n: "knight",
  p: "pawn",
};

export function LineTrainer({ variation }: { variation: Variation }) {
  const [expectedPly, setExpectedPly] = useState(0);
  const [displayFen, setDisplayFen] = useState(() => fenAfterMoves([], 0));
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [hints, setHints] = useState(0);
  const [mistakesOnMove, setMistakesOnMove] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [complete, setComplete] = useState(false);
  const sessionStarted = useRef(false);

  useEffect(() => {
    if (sessionStarted.current) return;
    sessionStarted.current = true;
    incrementSessions();
  }, []);

  const expectedSan = variation.moves[expectedPly];
  const totalWhiteMoves = Math.ceil(variation.moves.length / 2);
  const moveNumber = Math.floor(expectedPly / 2) + 1;
  const keyPosition = variation.keyPositions.find((position) => position.afterPly === expectedPly);
  const expectedMove = useMemo(() => {
    const game = new Chess(fenAfterMoves(variation.moves, expectedPly));
    return game.move(expectedSan);
  }, [expectedPly, expectedSan, variation.moves]);
  const pieceHint = keyPosition?.pieceHint ?? `Move the ${pieceNames[expectedMove.piece]} on ${expectedMove.from}.`;
  const squareHint = keyPosition?.squareHint ?? `The destination is ${expectedMove.to}.`;

  const saveKeyPositionResult = (successful: boolean, usedHints: number, currentStreak: number) => {
    if (!keyPosition) return;
    recordAttempt(`${variation.id}-${expectedPly}`, successful, usedHints, currentStreak);
  };

  const answer = (from: Square, to: Square): boolean => {
    if (feedback === "correct" || feedback === "revealed") return false;
    const game = new Chess(fenAfterMoves(variation.moves, expectedPly));
    let move;
    try {
      move = game.move({ from, to, promotion: "q" });
    } catch {
      setFeedback("illegal");
      playChessSound("illegal");
      return false;
    }

    const isCorrect = move.from === expectedMove.from
      && move.to === expectedMove.to
      && move.promotion === expectedMove.promotion;

    if (!isCorrect) {
      setFeedback("incorrect");
      setMistakesOnMove((value) => value + 1);
      setStreak(0);
      playChessSound("illegal");
      return false;
    }

    const flawless = mistakesOnMove === 0 && hints === 0;
    const nextStreak = flawless ? streak + 1 : 0;
    setDisplayFen(game.fen());
    setLastMove({ from, to });
    playMoveSound(game, move);
    setFeedback("correct");
    setCorrect((value) => value + 1);
    setStreak(nextStreak);
    setBestStreak((value) => Math.max(value, nextStreak));
    setScore((value) => value + Math.max(25, 100 - hints * 20 - mistakesOnMove * 25));
    saveKeyPositionResult(flawless, hints, nextStreak);
    return true;
  };

  const reveal = () => {
    if (feedback === "correct" || feedback === "revealed") return;
    const game = new Chess(fenAfterMoves(variation.moves, expectedPly));
    const move = game.move(expectedSan);
    playMoveSound(game, move);
    setDisplayFen(game.fen());
    setLastMove({ from: move.from, to: move.to });
    setFeedback("revealed");
    setStreak(0);
    saveKeyPositionResult(false, hints, streak);
  };

  const advance = useCallback(() => {
    const blackPly = expectedPly + 1;
    const nextWhitePly = expectedPly + 2;

    if (blackPly < variation.moves.length) {
      const game = new Chess(fenAfterMoves(variation.moves, expectedPly + 1));
      const reply = game.move(variation.moves[blackPly]);
      playMoveSound(game, reply);
      setDisplayFen(game.fen());
      setLastMove({ from: reply.from, to: reply.to });
    }

    if (nextWhitePly >= variation.moves.length) {
      setComplete(true);
      return;
    }

    setExpectedPly(nextWhitePly);
    setFeedback(null);
    setHints(0);
    setMistakesOnMove(0);
  }, [expectedPly, variation.moves]);

  useEffect(() => {
    if (feedback !== "correct" && feedback !== "revealed") return;
    const timer = window.setTimeout(advance, 1200);
    return () => window.clearTimeout(timer);
  }, [advance, feedback]);

  const restart = () => {
    setExpectedPly(0);
    setDisplayFen(fenAfterMoves([], 0));
    setLastMove(null);
    setFeedback(null);
    setHints(0);
    setMistakesOnMove(0);
    setCorrect(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setComplete(false);
    incrementSessions();
  };

  if (complete) {
    return (
      <div className="trainer-setup">
        <div className="session-complete">
          <div className="success-ring"><TargetIcon size={34} /></div>
          <span>Line complete</span>
          <h2>You reached the final position</h2>
          <p>{correct}/{totalWhiteMoves} moves found · {score} points · best streak: {bestStreak}</p>
        </div>
        <div className="line-complete-actions">
          <button className="button primary" onClick={restart} type="button">Train this line again</button>
          <Link className="button secondary" href={`/repertorio/${variation.id}`}>Review the line</Link>
          <Link className="text-button" href="/treinar">Choose another line</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="trainer-layout line-trainer">
      <section className="trainer-board-column">
        <div className="trainer-scorebar">
          <div><span>Points</span><strong>{score}</strong></div>
          <div><span>Found</span><strong>{correct}</strong></div>
          <div><span>Streak</span><strong>{streak}</strong></div>
          <div><span>Move</span><strong>{moveNumber}/{totalWhiteMoves}</strong></div>
        </div>
        <ChessBoard
          fen={displayFen}
          interactive={feedback !== "correct" && feedback !== "revealed"}
          lastMove={lastMove}
          onMove={answer}
        />
        <p className="board-help">You play White. Black&apos;s reply is played when you continue.</p>
      </section>

      <section className="trainer-panel">
        <div className="trainer-context"><span>{familyLabels[variation.family]}</span><span>{difficultyLabels[variation.difficulty]}</span></div>
        <h1>Play the next move</h1>
        <p>{variation.title}</p>
        <div className="position-sequence">
          <span>Line so far</span>
          <strong>{expectedPly ? formatMoveSequence(variation.moves.slice(0, expectedPly)) : "Starting position"}</strong>
        </div>

        {feedback !== "correct" && feedback !== "revealed" ? (
          <div className="hint-area">
            {feedback === "illegal" && <div className="feedback compact error"><CloseIcon size={18} /><span>That move is not legal in this position.</span></div>}
            {feedback === "incorrect" && <div className="feedback compact error"><CloseIcon size={18} /><span>That is legal, but it is not the repertoire move. Try again.</span></div>}
            {hints > 0 && <div className="hint"><LightbulbIcon size={19} /><span>{hints === 1 ? pieceHint : squareHint}</span></div>}
            <div className="trainer-actions">
              <button className="button secondary" disabled={hints >= 2} onClick={() => setHints((value) => Math.min(2, value + 1))} type="button"><LightbulbIcon size={17} />{hints ? "Another hint" : "Get a hint"}</button>
              <button className="text-button" onClick={reveal} type="button">Show answer</button>
            </div>
          </div>
        ) : (
          <div className={`answer-card ${feedback === "correct" ? "success" : "error"}`}>
            <div className="answer-title">{feedback === "correct" ? <CheckIcon /> : <CloseIcon />}<div><span>{feedback === "correct" ? "Correct!" : "Answer revealed"}</span><strong>{expectedSan}</strong></div></div>
            <p>{keyPosition?.explanation ?? "This is the repertoire move. Keep following the plan to reach the target position."}</p>
            <div className="idea-box"><span>Idea</span><p>{keyPosition?.idea ?? variation.ideas[Math.min(Math.floor(expectedPly / 2), variation.ideas.length - 1)]}</p></div>
            <div className="answer-actions"><Link href={`/repertorio/${variation.id}`}>Review line</Link><span className="auto-reply" aria-live="polite">{expectedPly + 1 < variation.moves.length ? "Black replies automatically…" : "Completing line…"}</span></div>
          </div>
        )}
      </section>
    </div>
  );
}
