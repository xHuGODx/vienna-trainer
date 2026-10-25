import type { Metadata } from "next";
import { ProgressView } from "@/components/progress-view";
import { trainingPositions } from "@/lib/chess";

export const metadata: Metadata = { title: "Progress", description: "Track your progress through the Vienna repertoire." };

export default function ProgressPage() {
  return <div className="page-shell shell"><header className="page-heading"><span>Your training</span><h1>Progress</h1><p>Your data stays in this browser. Review the patterns that have not become automatic yet.</p></header><ProgressView positions={trainingPositions} /></div>;
}
