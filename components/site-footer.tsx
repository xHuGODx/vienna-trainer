import Link from "next/link";
import { KnightIcon } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div className="footer-brand"><KnightIcon size={20} /><strong>Vienna Game Trainer</strong></div>
        <p>Ferramenta pessoal de treino. As sugestões formam um repertório prático e não são os únicos lances jogáveis.</p>
        <div><Link href="/repertorio">Repertório</Link><Link href="/treinar">Treinar</Link></div>
      </div>
    </footer>
  );
}
