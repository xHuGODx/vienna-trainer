"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/icons";
import { VariationCard } from "@/components/variation-card";
import { difficultyLabels, familyLabels } from "@/data/repertoire";
import type { Difficulty, Variation, VariationFamily } from "@/types/repertoire";

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("en-US");
}

export function RepertoireExplorer({ variations }: { variations: Variation[] }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<VariationFamily | "all">("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const results = useMemo(() => variations.filter((variation) => {
    if (family !== "all" && variation.family !== family) return false;
    if (difficulty !== "all" && variation.difficulty !== difficulty) return false;
    if (!query) return true;
    return normalize([variation.title, variation.subtitle, variation.summary, variation.opponentApproach, ...variation.tags, ...variation.moves].join(" ")).includes(normalize(query));
  }), [variations, query, family, difficulty]);

  return (
    <>
      <div className="explorer-controls">
        <label className="search-control"><SearchIcon size={20} /><span className="sr-only">Search lines</span><input onChange={(event) => setQuery(event.target.value)} placeholder="Search by line, move, or idea..." value={query} /></label>
        <label><span>Family</span><select onChange={(event) => setFamily(event.target.value as VariationFamily | "all")} value={family}><option value="all">All</option>{Object.entries(familyLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label><span>Difficulty</span><select onChange={(event) => setDifficulty(event.target.value as Difficulty | "all")} value={difficulty}><option value="all">All</option>{Object.entries(difficultyLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      </div>
      <div className="result-heading"><span>Library</span><strong>{results.length} {results.length === 1 ? "line" : "lines"}</strong></div>
      {results.length ? <div className="variation-grid">{results.map((variation) => <VariationCard key={variation.id} variation={variation} />)}</div> : <div className="empty-state"><SearchIcon size={28} /><h2>No matching lines</h2><p>Try another search term or clear the filters.</p><button className="button secondary" onClick={() => { setQuery(""); setFamily("all"); setDifficulty("all"); }} type="button">Clear filters</button></div>}
    </>
  );
}
