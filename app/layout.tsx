import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vienna-trainer.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Vienna Game Trainer", template: "%s · Vienna Trainer" },
  description: "Aprende e pratica as principais linhas do Vienna Game e do Vienna Gambit com um treinador interativo de xadrez.",
  applicationName: "Vienna Game Trainer",
  keywords: ["Vienna Game", "Vienna Gambit", "xadrez", "chess trainer", "aberturas"],
  openGraph: { title: "Vienna Game Trainer", description: "Domina o Vienna Game, uma posição de cada vez.", locale: "pt_PT", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#101311" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-PT"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
