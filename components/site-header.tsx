"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookIcon, ChartIcon, KnightIcon, SoundIcon, TargetIcon } from "@/components/icons";
import { playChessSound, setChessSoundEnabled, useChessSoundEnabled } from "@/lib/sounds";

const nav = [
  { href: "/repertorio", label: "Repertoire", icon: BookIcon },
  { href: "/treinar", label: "Train", icon: TargetIcon },
  { href: "/progresso", label: "Progress", icon: ChartIcon },
];

export function SiteHeader() {
  const pathname = usePathname();
  const soundEnabled = useChessSoundEnabled();

  const toggleSound = () => {
    const enabled = !soundEnabled;
    setChessSoundEnabled(enabled);
    if (enabled) playChessSound("move");
  };

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Vienna Trainer — home">
          <span className="brand-mark"><KnightIcon size={23} /></span>
          <span><strong>Vienna</strong><small>Trainer</small></span>
        </Link>
        <nav aria-label="Main navigation">
          {nav.map(({ href, label, icon: NavIcon }) => (
            <Link className={pathname.startsWith(href) ? "active" : ""} href={href} key={href}>
              <NavIcon size={17} /><span>{label}</span>
            </Link>
          ))}
          <button className="sound-toggle" aria-label={soundEnabled ? "Mute chess sounds" : "Enable chess sounds"} aria-pressed={soundEnabled} onClick={toggleSound} title={soundEnabled ? "Mute sounds" : "Enable sounds"} type="button"><SoundIcon muted={!soundEnabled} size={18} /></button>
        </nav>
      </div>
    </header>
  );
}
