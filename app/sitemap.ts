import type { MetadataRoute } from "next";
import { repertoire } from "@/data/repertoire";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vienna-trainer.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap { return ["", "/repertorio", "/treinar", "/progresso", ...repertoire.map((item) => `/repertorio/${item.id}`)].map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly" as const })); }
