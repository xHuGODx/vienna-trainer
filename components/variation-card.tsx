import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { difficultyLabels, familyLabels } from "@/data/repertoire";
import { formatMoveSequence } from "@/lib/chess";
import type { Variation } from "@/types/repertoire";

export function VariationCard({ variation }: { variation: Variation }) {
  return (
    <article className="variation-card">
      <div className="card-meta"><span>{familyLabels[variation.family]}</span><span>{difficultyLabels[variation.difficulty]}</span></div>
      <h2>{variation.title}</h2>
      <p className="variation-subtitle">{variation.subtitle}</p>
      <div className="move-preview">{formatMoveSequence(variation.moves.slice(0, 10))}</div>
      <p className="card-summary">{variation.summary}</p>
      <div className="tag-list">{variation.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
      <Link className="card-link" href={`/repertorio/${variation.id}`}>Study line <ArrowRightIcon size={17} /></Link>
    </article>
  );
}
