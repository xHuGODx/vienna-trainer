import Link from "next/link";
import { KnightIcon } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div className="footer-brand"><KnightIcon size={20} /><strong>Vienna Game Trainer</strong></div>
        <p>A personal training tool. These suggestions form a practical repertoire and are not the only playable moves.</p>
        <div><Link href="/repertorio">Repertoire</Link><Link href="/treinar">Train</Link></div>
      </div>
    </footer>
  );
}
