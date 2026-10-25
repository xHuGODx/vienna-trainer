import type { Metadata } from "next";
import { LineTrainer } from "@/components/line-trainer";
import { Trainer } from "@/components/trainer";
import { repertoire } from "@/data/repertoire";
import { trainingPositions, variationById } from "@/lib/chess";
import type { VariationFamily } from "@/types/repertoire";

export const metadata: Metadata = { title: "Train", description: "Find the next best move in critical Vienna Game positions." };

const families = new Set<VariationFamily>(["gambit-accepted", "gambit-declined", "quiet-vienna", "black-sideline"]);

export default async function TrainPage({ searchParams }: { searchParams: Promise<{ familia?: string; line?: string }> }) {
  const { familia: family, line } = await searchParams;
  const initialFamily = family && families.has(family as VariationFamily) ? family as VariationFamily : "all";
  const variation = line ? variationById(line) : undefined;

  if (variation) {
    return <div className="page-shell shell train-page"><header className="page-heading compact"><span>Full-line training</span><h1>{variation.title}</h1><p>Play every move for White from the starting position to the end of the variation.</p></header><LineTrainer variation={variation} /></div>;
  }

  return <div className="page-shell shell train-page"><header className="page-heading compact"><span>Repertoire training</span><h1>What is the next best move?</h1><p>White to move. Find the recommended continuation for the line.</p></header><Trainer initialFamily={initialFamily} positions={trainingPositions} variations={repertoire} /></div>;
}
