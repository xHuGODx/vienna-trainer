import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";
import { StudyView } from "@/components/study-view";
import { repertoire } from "@/data/repertoire";
import { variationById } from "@/lib/chess";

export function generateStaticParams() { return repertoire.map((variation) => ({ id: variation.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const variation = variationById((await params).id);
  return variation ? { title: variation.title, description: variation.summary } : { title: "Linha não encontrada" };
}

export default async function VariationPage({ params }: { params: Promise<{ id: string }> }) {
  const variation = variationById((await params).id);
  if (!variation) notFound();
  return <div className="page-shell shell detail-shell"><Link className="back-link" href="/repertorio"><ArrowLeftIcon size={18} />Voltar ao repertório</Link><StudyView variation={variation} /></div>;
}
