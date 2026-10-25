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
          <div className="hero-copy"><div className="eyebrow"><KnightIcon size={17} /> Repertório para as brancas</div><h1>Domina o Vienna Game, <em>uma posição de cada vez.</em></h1><p>Aprende as ideias, reconhece as respostas das pretas e treina o próximo lance até deixar de ser teoria — e passar a ser instinto.</p><div className="hero-actions"><Link className="button primary" href="/treinar"><TargetIcon size={18} />Começar treino</Link><Link className="button secondary" href="/repertorio"><BookIcon size={18} />Explorar linhas</Link></div><div className="hero-stats"><div><strong>{repertoire.length}</strong><span>linhas explicadas</span></div><div><strong>{trainingPositions.length}</strong><span>posições de treino</span></div><div><strong>1.e4 e5</strong><span>o teu novo território</span></div></div></div>
          <div className="hero-board" aria-hidden="true"><ChessBoard fen={fenAfterMoves(["e4", "e5", "Nc3", "Nf6"])} /><div className="floating-card"><span>Próximo lance</span><strong>3. f4</strong><small>Vienna Gambit</small></div></div>
        </div>
      </section>

      <section className="home-section shell"><div className="section-header"><div><span>Começa por aqui</span><h2>As respostas que vais encontrar</h2></div><Link href="/repertorio">Ver repertório completo <ArrowRightIcon size={17} /></Link></div><div className="feature-grid"><article><span>01</span><h3>Gambito aceite</h3><p>As pretas agarram o peão. Aprende a expulsar o cavalo, ocupar o centro e recuperar o material com iniciativa.</p></article><article><span>02</span><h3>Gambito recusado</h3><p>Prepara a resposta crítica ...d5 e as defesas sólidas ...d6, ...Nc6 e ...Bc5.</p></article><article><span>03</span><h3>Vienna tranquila</h3><p>Quando não queres fogo imediato, domina os planos com Bc4, d3 e o fianchetto em g3.</p></article></div></section>

      <section className="home-section shell"><div className="section-header"><div><span>Linhas essenciais</span><h2>Primeiras lições</h2></div></div><div className="variation-grid">{repertoire.slice(0, 3).map((variation) => <VariationCard key={variation.id} variation={variation} />)}</div></section>

      <section className="cta-section"><div className="shell cta-inner"><div><span>{trainingPositions.length} posições já preparadas</span><h2>Vê a posição. Encontra o lance. Repete.</h2><p>Sem relógio, sem rating e sem distrações. Só as decisões que precisas de reconhecer sobre o tabuleiro.</p></div><Link className="button light" href="/treinar">Treinar agora <ArrowRightIcon size={18} /></Link></div></section>
    </>
  );
}
