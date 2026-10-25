"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChartIcon, TargetIcon } from "@/components/icons";
import { familyLabels } from "@/data/repertoire";
import { masteryFor, resetProgress, useProgress } from "@/lib/progress";
import type { TrainingPosition, VariationFamily } from "@/types/repertoire";

export function ProgressView({ positions }: { positions: TrainingPosition[] }) {
  const progress = useProgress();
  const [confirming, setConfirming] = useState(false);
  const stats = useMemo(() => {
    const values = Object.values(progress.positions);
    const attempts = values.reduce((sum, item) => sum + item.attempts, 0);
    const correct = values.reduce((sum, item) => sum + item.correct, 0);
    const mastered = values.filter((item) => masteryFor(item.attempts, item.correct) >= 70).length;
    const review = values.filter((item) => item.incorrect > 0 && masteryFor(item.attempts, item.correct) < 70).length;
    return { attempts, correct, mastered, review, accuracy: attempts ? Math.round(correct / attempts * 100) : 0 };
  }, [progress.positions]);

  const families = Object.keys(familyLabels).map((family) => {
    const ids = positions.filter((position) => position.family === family).map((position) => position.id);
    const records = ids.map((id) => progress.positions[id]).filter(Boolean);
    const attempts = records.reduce((sum, item) => sum + item.attempts, 0);
    const correct = records.reduce((sum, item) => sum + item.correct, 0);
    return { family: family as VariationFamily, attempts, accuracy: attempts ? Math.round(correct / attempts * 100) : 0 };
  });

  const difficult = positions
    .map((position) => ({ position, data: progress.positions[position.id] }))
    .filter((item) => item.data?.incorrect > 0)
    .sort((a, b) => b.data.incorrect - a.data.incorrect)
    .slice(0, 5);

  return (
    <div className="progress-content">
      <div className="progress-stats">
        <div><span>Accuracy</span><strong>{stats.accuracy}%</strong><small>{stats.attempts} attempts</small></div>
        <div><span>Mastered</span><strong>{stats.mastered}</strong><small>out of {positions.length} positions</small></div>
        <div><span>To review</span><strong>{stats.review}</strong><small>with recent mistakes</small></div>
        <div><span>Best streak</span><strong>{progress.bestStreak}</strong><small>{progress.totalSessions} sessions</small></div>
      </div>

      {stats.attempts === 0 ? (
        <div className="empty-state large"><TargetIcon size={32} /><h2>No training recorded yet</h2><p>Complete your first session to start tracking your progress.</p><Link className="button primary" href="/treinar">Start training</Link></div>
      ) : (
        <div className="progress-grid">
          <section className="progress-card"><div className="section-title"><ChartIcon /><div><span>By repertoire</span><h2>Accuracy by family</h2></div></div><div className="family-progress">{families.map((item) => <div key={item.family}><div><span>{familyLabels[item.family]}</span><strong>{item.attempts ? `${item.accuracy}%` : "—"}</strong></div><div className="progress-track"><span style={{ width: `${item.accuracy}%` }} /></div></div>)}</div></section>
          <section className="progress-card"><div className="section-title"><TargetIcon /><div><span>Review</span><h2>Most difficult positions</h2></div></div>{difficult.length ? <div className="difficult-list">{difficult.map(({ position, data }) => <Link href={`/treinar?familia=${position.family}`} key={position.id}><div><strong>{position.variationTitle}</strong><span>{position.recommendedMove} · {data.incorrect} mistakes</span></div><span>{masteryFor(data.attempts, data.correct)}%</span></Link>)}</div> : <p className="all-good">You do not have any positions marked for review yet.</p>}</section>
        </div>
      )}

      <div className="reset-row">{confirming ? <><span>Delete all local progress?</span><button className="text-button danger" onClick={() => { resetProgress(); setConfirming(false); }} type="button">Yes, delete</button><button className="text-button" onClick={() => setConfirming(false)} type="button">Cancel</button></> : <button className="text-button danger" onClick={() => setConfirming(true)} type="button">Reset progress</button>}</div>
    </div>
  );
}
