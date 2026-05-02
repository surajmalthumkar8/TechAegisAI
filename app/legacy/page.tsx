import Link from "next/link";
import { Hero } from "./_components/Hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "v1 archive",
  description: "Archived v1 hero. The current site lives at /.",
  path: "/legacy",
});

export default function LegacyPage() {
  return (
    <>
      <div className="border-b border-border bg-surface/40 px-4 py-2 text-center text-xs text-muted-foreground">
        v1 archive · the current site is at{" "}
        <Link href="/" className="underline">
          /
        </Link>
      </div>
      <Hero />
    </>
  );
}
