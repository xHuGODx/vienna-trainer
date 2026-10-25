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
        <div><span>Precisão</span><strong>{stats.accuracy}%</strong><small>{stats.attempts} tentativas</small></div>
        <div><span>Dominadas</span><strong>{stats.mastered}</strong><small>de {positions.length} posições</small></div>
        <div><span>A rever</span><strong>{stats.review}</strong><small>com erros recentes</small></div>
        <div><span>Melhor sequência</span><strong>{progress.bestStreak}</strong><small>{progress.totalSessions} sessões</small></div>
      </div>

      {stats.attempts === 0 ? (
        <div className="empty-state large"><TargetIcon size={32} /><h2>Ainda não há treino registado</h2><p>Completa a primeira sessão para começares a acompanhar a evolução.</p><Link className="button primary" href="/treinar">Começar treino</Link></div>
      ) : (
        <div className="progress-grid">
          <section className="progress-card"><div className="section-title"><ChartIcon /><div><span>Por repertório</span><h2>Precisão por família</h2></div></div><div className="family-progress">{families.map((item) => <div key={item.family}><div><span>{familyLabels[item.family]}</span><strong>{item.attempts ? `${item.accuracy}%` : "—"}</strong></div><div className="progress-track"><span style={{ width: `${item.accuracy}%` }} /></div></div>)}</div></section>
          <section className="progress-card"><div className="section-title"><TargetIcon /><div><span>Revisão</span><h2>Posições mais difíceis</h2></div></div>{difficult.length ? <div className="difficult-list">{difficult.map(({ position, data }) => <Link href={`/treinar?familia=${position.family}`} key={position.id}><div><strong>{position.variationTitle}</strong><span>{position.recommendedMove} · {data.incorrect} erros</span></div><span>{masteryFor(data.attempts, data.correct)}%</span></Link>)}</div> : <p className="all-good">Ainda não tens posições marcadas para revisão.</p>}</section>
        </div>
      )}

      <div className="reset-row">{confirming ? <><span>Apagar todo o progresso local?</span><button className="text-button danger" onClick={() => { resetProgress(); setConfirming(false); }} type="button">Sim, apagar</button><button className="text-button" onClick={() => setConfirming(false)} type="button">Cancelar</button></> : <button className="text-button danger" onClick={() => setConfirming(true)} type="button">Repor progresso</button>}</div>
    </div>
  );
}
