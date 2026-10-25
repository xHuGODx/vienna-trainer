"use client";

import { useMemo, useState } from "react";
import { Chess, type Color, type PieceSymbol, type Square } from "chess.js";
import { legalTargets } from "@/lib/chess";

const pieces: Record<Color, Record<PieceSymbol, string>> = {
  w: { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" },
  b: { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" },
};

const pieceNames: Record<PieceSymbol, string> = { k: "rei", q: "dama", r: "torre", b: "bispo", n: "cavalo", p: "peão" };

interface ChessBoardProps {
  fen: string;
  interactive?: boolean;
  orientation?: "white" | "black";
  onMove?: (from: Square, to: Square) => boolean;
  lastMove?: { from: Square; to: Square } | null;
}

export function ChessBoard({ fen, interactive = false, orientation = "white", onMove, lastMove = null }: ChessBoardProps) {
  const [selected, setSelected] = useState<Square | null>(null);
  const game = useMemo(() => new Chess(fen), [fen]);
  const board = game.board();
  const ranks = orientation === "white" ? board : [...board].reverse().map((row) => [...row].reverse());
  const targets = selected ? legalTargets(fen, selected) : [];

  const attempt = (from: Square, to: Square) => {
    const accepted = onMove?.(from, to) ?? false;
    setSelected(null);
    return accepted;
  };

  const clickSquare = (square: Square) => {
    if (!interactive) return;
    if (selected) {
      if (selected === square) return setSelected(null);
      if (attempt(selected, square)) return;
    }
    const piece = game.get(square);
    if (piece?.color === "w") setSelected(square);
  };

  return (
    <div className="board-shell">
      <div aria-label={`Tabuleiro de xadrez. ${game.turn() === "w" ? "Brancas" : "Pretas"} a jogar.`} className="chess-board" role="grid">
        {ranks.flatMap((row, rowIndex) => row.map((piece, colIndex) => {
          const visualRank = orientation === "white" ? 8 - rowIndex : rowIndex + 1;
          const visualFileIndex = orientation === "white" ? colIndex : 7 - colIndex;
          const square = `${String.fromCharCode(97 + visualFileIndex)}${visualRank}` as Square;
          const isLight = (visualFileIndex + visualRank) % 2 === 1;
          const isSelected = selected === square;
          const isTarget = targets.includes(square);
          const isLast = lastMove?.from === square || lastMove?.to === square;
          return (
            <button
              aria-label={`${square}${piece ? `, ${piece.color === "w" ? "branco" : "preto"} ${pieceNames[piece.type]}` : ", vazio"}`}
              className={`board-square ${isLight ? "light" : "dark"}${isSelected ? " selected" : ""}${isTarget ? " target" : ""}${isLast ? " last" : ""}`}
              draggable={interactive && piece?.color === "w"}
              key={square}
              onClick={() => clickSquare(square)}
              onDragOver={(event) => interactive && event.preventDefault()}
              onDragStart={(event) => {
                if (!interactive || piece?.color !== "w") return event.preventDefault();
                event.dataTransfer.setData("text/plain", square);
                setSelected(square);
              }}
              onDrop={(event) => {
                event.preventDefault();
                const from = event.dataTransfer.getData("text/plain") as Square;
                if (from) attempt(from, square);
              }}
              role="gridcell"
              type="button"
            >
              {piece && <span className={`chess-piece ${piece.color === "w" ? "white-piece" : "black-piece"}`}>{pieces[piece.color][piece.type]}</span>}
              {isTarget && <span className={piece ? "capture-marker" : "move-marker"} aria-hidden="true" />}
              {colIndex === 0 && <span className="rank-coordinate" aria-hidden="true">{visualRank}</span>}
              {rowIndex === 7 && <span className="file-coordinate" aria-hidden="true">{String.fromCharCode(97 + visualFileIndex)}</span>}
            </button>
          );
        }))}
      </div>
    </div>
  );
}
