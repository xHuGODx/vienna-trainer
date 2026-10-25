import type { Metadata } from "next";
import { ProgressView } from "@/components/progress-view";
import { trainingPositions } from "@/lib/chess";

export const metadata: Metadata = { title: "Progresso", description: "Acompanha a tua evolução no repertório Vienna." };

export default function ProgressPage() {
  return <div className="page-shell shell"><header className="page-heading"><span>O teu treino</span><h1>Progresso</h1><p>Os dados ficam apenas neste navegador. Revê os padrões que ainda não estão automáticos.</p></header><ProgressView positions={trainingPositions} /></div>;
}
