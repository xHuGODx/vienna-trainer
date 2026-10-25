import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vienna-trainer.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Vienna Game Trainer", template: "%s · Vienna Trainer" },
  description: "Learn and practise the main Vienna Game and Vienna Gambit lines with an interactive chess trainer.",
  applicationName: "Vienna Game Trainer",
  keywords: ["Vienna Game", "Vienna Gambit", "chess", "chess trainer", "chess openings"],
  openGraph: { title: "Vienna Game Trainer", description: "Master the Vienna Game, one position at a time.", locale: "en_US", type: "website", images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#101311" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
