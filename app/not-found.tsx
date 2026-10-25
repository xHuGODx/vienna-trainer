import Link from "next/link";
import { ArrowLeftIcon, KnightIcon } from "@/components/icons";

export default function NotFound() {
  return <div className="not-found shell"><KnightIcon size={48} /><span>404</span><h1>Esta linha saiu do tabuleiro.</h1><p>O endereço pode estar incorreto ou a variação já não fazer parte do repertório.</p><Link className="button primary" href="/repertorio"><ArrowLeftIcon size={18} />Voltar ao repertório</Link></div>;
}
