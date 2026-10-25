import type { Metadata } from "next";
import { Trainer } from "@/components/trainer";
import { trainingPositions } from "@/lib/chess";
import type { VariationFamily } from "@/types/repertoire";

export const metadata: Metadata = { title: "Train", description: "Find the next best move in critical Vienna Game positions." };

const families = new Set<VariationFamily>(["gambit-accepted", "gambit-declined", "quiet-vienna", "black-sideline"]);

export default async function TrainPage({ searchParams }: { searchParams: Promise<{ familia?: string }> }) {
  const family = (await searchParams).familia;
  const initialFamily = family && families.has(family as VariationFamily) ? family as VariationFamily : "all";
  return <div className="page-shell shell train-page"><header className="page-heading compact"><span>Repertoire training</span><h1>What is the next best move?</h1><p>White to move. Find the recommended continuation for the line.</p></header><Trainer initialFamily={initialFamily} positions={trainingPositions} /></div>;
}
