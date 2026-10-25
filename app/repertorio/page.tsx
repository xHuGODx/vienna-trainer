import type { Metadata } from "next";
import { RepertoireExplorer } from "@/components/repertoire-explorer";
import { repertoire } from "@/data/repertoire";

export const metadata: Metadata = { title: "Repertório", description: "Explora as linhas essenciais do Vienna Game e do Vienna Gambit." };

export default function RepertoirePage() {
  return <div className="page-shell shell"><header className="page-heading"><span>Biblioteca de abertura</span><h1>Repertório Vienna</h1><p>Da aceitação ambiciosa às defesas mais sólidas. Cada linha inclui lances, planos e alertas práticos.</p></header><RepertoireExplorer variations={repertoire} /></div>;
}
