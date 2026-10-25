"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookIcon, ChartIcon, KnightIcon, TargetIcon } from "@/components/icons";

const nav = [
  { href: "/repertorio", label: "Repertório", icon: BookIcon },
  { href: "/treinar", label: "Treinar", icon: TargetIcon },
  { href: "/progresso", label: "Progresso", icon: ChartIcon },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Vienna Trainer — início">
          <span className="brand-mark"><KnightIcon size={23} /></span>
          <span><strong>Vienna</strong><small>Trainer</small></span>
        </Link>
        <nav aria-label="Navegação principal">
          {nav.map(({ href, label, icon: NavIcon }) => (
            <Link className={pathname.startsWith(href) ? "active" : ""} href={href} key={href}>
              <NavIcon size={17} /><span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
