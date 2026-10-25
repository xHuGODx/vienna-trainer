"use client";

import { useEffect, useMemo, useState } from "react";
import { Chess } from "chess.js";
import { ChevronLeftIcon, ChevronRightIcon, RotateIcon, ShareIcon } from "@/components/icons";
import { ChessBoard } from "@/components/chess-board";
import { difficultyLabels, familyLabels } from "@/data/repertoire";
import { fenAfterMoves, moveNumberLabel } from "@/lib/chess";
import type { Variation } from "@/types/repertoire";

export function StudyView({ variation }: { variation: Variation }) {
  const [ply, setPly] = useState(variation.moves.length);
  const [orientation, setOrientation] = useState<"white" | "black">("white");
  const [copied, setCopied] = useState(false);
  const fen = useMemo(() => fenAfterMoves(variation.moves, ply), [variation.moves, ply]);
  const history = useMemo(() => {
    const game = new Chess();
    return variation.moves.map((move) => game.move(move));
  }, [variation.moves]);
  const lastMove = ply > 0 ? { from: history[ply - 1].from, to: history[ply - 1].to } : null;

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") setPly((value) => Math.max(0, value - 1));
      if (event.key === "ArrowRight") setPly((value) => Math.min(variation.moves.length, value + 1));
      if (event.key === "Home") setPly(0);
      if (event.key === "End") setPly(variation.moves.length);
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [variation.moves.length]);

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: variation.title, text: variation.summary, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
    } catch {
      // Cancelling the system share dialog needs no UI error.
    }
  };

  return (
    <div className="study-layout">
      <section className="board-column">
        <ChessBoard fen={fen} lastMove={lastMove} orientation={orientation} />
        <div className="board-controls">
          <button aria-label="Posição inicial" onClick={() => setPly(0)} type="button">Início</button>
          <button aria-label="Lance anterior" disabled={ply === 0} onClick={() => setPly((value) => value - 1)} type="button"><ChevronLeftIcon /></button>
          <span>{ply}/{variation.moves.length}</span>
          <button aria-label="Lance seguinte" disabled={ply === variation.moves.length} onClick={() => setPly((value) => value + 1)} type="button"><ChevronRightIcon /></button>
          <button aria-label="Rodar tabuleiro" onClick={() => setOrientation((value) => value === "white" ? "black" : "white")} type="button"><RotateIcon /></button>
        </div>
        <p className="keyboard-note">Usa ← → para navegar · Home/End para saltar</p>
      </section>

      <section className="study-panel">
        <div className="study-meta"><span>{familyLabels[variation.family]}</span><span>{difficultyLabels[variation.difficulty]}</span></div>
        <h1>{variation.title}</h1>
        <p className="study-opponent">{variation.opponentApproach}</p>
        <button className="share-button" onClick={share} type="button"><ShareIcon size={17} />{copied ? "Link copiado" : "Partilhar"}</button>

        <div className="move-list" aria-label="Lista de lances">
          {variation.moves.map((move, index) => <button className={index + 1 === ply ? "current" : index < ply ? "played" : ""} key={`${move}-${index}`} onClick={() => setPly(index + 1)} type="button"><small>{moveNumberLabel(index)}</small>{move}</button>)}
        </div>

        <div className="study-copy"><h2>O plano</h2><p>{variation.summary}</p><ul>{variation.ideas.map((idea) => <li key={idea}>{idea}</li>)}</ul></div>
        <div className="warning-box"><strong>Atenção</strong><ul>{variation.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul></div>
      </section>
    </div>
  );
}
