import type { Metadata } from "next";
import { RepertoireExplorer } from "@/components/repertoire-explorer";
import { repertoire } from "@/data/repertoire";

export const metadata: Metadata = { title: "Repertoire", description: "Explore the essential Vienna Game and Vienna Gambit lines." };

export default function RepertoirePage() {
  return <div className="page-shell shell"><header className="page-heading"><span>Opening library</span><h1>Vienna repertoire</h1><p>From ambitious gambit acceptance to the most solid defences. Every line includes moves, plans, and practical warnings.</p></header><RepertoireExplorer variations={repertoire} /></div>;
}
