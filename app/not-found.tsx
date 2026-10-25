import Link from "next/link";
import { ArrowLeftIcon, KnightIcon } from "@/components/icons";

export default function NotFound() {
  return <div className="not-found shell"><KnightIcon size={48} /><span>404</span><h1>This line has left the board.</h1><p>The address may be incorrect, or this variation may no longer be part of the repertoire.</p><Link className="button primary" href="/repertorio"><ArrowLeftIcon size={18} />Back to repertoire</Link></div>;
}
