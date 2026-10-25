import type { Metadata } from "next";
import { Trainer } from "@/components/trainer";
import { trainingPositions } from "@/lib/chess";
import type { VariationFamily } from "@/types/repertoire";

export const metadata: Metadata = { title: "Treinar", description: "Descobre o próximo melhor lance nas posições críticas do Vienna Game." };

const families = new Set<VariationFamily>(["gambit-accepted", "gambit-declined", "quiet-vienna", "black-sideline"]);

export default async function TrainPage({ searchParams }: { searchParams: Promise<{ familia?: string }> }) {
  const family = (await searchParams).familia;
  const initialFamily = family && families.has(family as VariationFamily) ? family as VariationFamily : "all";
  return <div className="page-shell shell train-page"><header className="page-heading compact"><span>Treino de repertório</span><h1>Qual é o próximo lance?</h1><p>As brancas jogam. Encontra a continuação recomendada para a linha.</p></header><Trainer initialFamily={initialFamily} positions={trainingPositions} /></div>;
}
