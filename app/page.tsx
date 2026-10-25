import Link from "next/link";
import { ChessBoard } from "@/components/chess-board";
import { ArrowRightIcon, BookIcon, KnightIcon, TargetIcon } from "@/components/icons";
import { VariationCard } from "@/components/variation-card";
import { repertoire } from "@/data/repertoire";
import { fenAfterMoves, trainingPositions } from "@/lib/chess";

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="shell hero-grid">
          <div className="hero-copy"><div className="eyebrow"><KnightIcon size={17} /> A repertoire for White</div><h1>Master the Vienna Game, <em>one position at a time.</em></h1><p>Learn the ideas, recognise Black&apos;s responses, and train the next move until theory becomes instinct.</p><div className="hero-actions"><Link className="button primary" href="/treinar"><TargetIcon size={18} />Start training</Link><Link className="button secondary" href="/repertorio"><BookIcon size={18} />Explore lines</Link></div><div className="hero-stats"><div><strong>{repertoire.length}</strong><span>explained lines</span></div><div><strong>{trainingPositions.length}</strong><span>training positions</span></div><div><strong>1.e4 e5</strong><span>your new territory</span></div></div></div>
          <div className="hero-board" aria-hidden="true"><ChessBoard fen={fenAfterMoves(["e4", "e5", "Nc3", "Nf6"])} /><div className="floating-card"><span>Next move</span><strong>3. f4</strong><small>Vienna Gambit</small></div></div>
        </div>
      </section>

      <section className="home-section shell"><div className="section-header"><div><span>Start here</span><h2>The responses you will face</h2></div><Link href="/repertorio">View full repertoire <ArrowRightIcon size={17} /></Link></div><div className="feature-grid"><article><span>01</span><h3>Accepted Gambit</h3><p>Black grabs the pawn. Learn to chase the knight, occupy the centre, and regain the material with initiative.</p></article><article><span>02</span><h3>Declined Gambit</h3><p>Prepare for the critical ...d5 response and the solid ...d6, ...Nc6, and ...Bc5 defences.</p></article><article><span>03</span><h3>Vienna Game</h3><p>Master the classical Bc4 systems, the Frankenstein–Dracula tactics, the Copycat battle, and the g3 fianchetto.</p></article></div></section>

      <section className="home-section shell"><div className="section-header"><div><span>Essential lines</span><h2>First lessons</h2></div></div><div className="variation-grid">{repertoire.slice(0, 3).map((variation) => <VariationCard key={variation.id} variation={variation} />)}</div></section>

      <section className="cta-section"><div className="shell cta-inner"><div><span>{trainingPositions.length} positions ready to train</span><h2>See the position. Find the move. Repeat.</h2><p>No clock, no rating, and no distractions. Just the decisions you need to recognise over the board.</p></div><Link className="button light" href="/treinar">Train now <ArrowRightIcon size={18} /></Link></div></section>
    </>
  );
}
