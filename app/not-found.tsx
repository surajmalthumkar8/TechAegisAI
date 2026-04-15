import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">404</p>
      <h1 className="mt-4 text-display">
        <span className="gradient-text">Lost in the graph.</span>
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for isn&apos;t here — yet. Head home and we&apos;ll
        route you to something that ships.
      </p>
      <Button asChild variant="gradient" size="lg" className="mt-10">
        <Link href="/">Take me home</Link>
      </Button>
    </section>
  );
}
