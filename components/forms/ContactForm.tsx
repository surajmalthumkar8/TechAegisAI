"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Got it. We'll reply within one business day.");
    } else if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const errors = state.status === "error" ? state.errors : {};

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-border bg-surface/40 p-8">
        <p className="text-xs uppercase tracking-widest text-accent-cyan">
          Message received
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
          We&apos;ll reply within one business day.
        </h3>
        <p className="mt-3 text-muted-foreground">
          In the meantime, the booking panel on the right is the fastest path to a
          real conversation.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <Field label="Name" id="name" error={errors.name}>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          className="w-full rounded-md border border-border bg-surface/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent-cyan"
        />
      </Field>

      <Field label="Email" id="email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-md border border-border bg-surface/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent-cyan"
        />
      </Field>

      <Field label="Company" id="company" hint="Optional" error={errors.company}>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          className="w-full rounded-md border border-border bg-surface/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent-cyan"
        />
      </Field>

      <Field
        label="What are you trying to ship?"
        id="message"
        error={errors.message}
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          className="w-full resize-y rounded-md border border-border bg-surface/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent-cyan"
        />
      </Field>

      <Button type="submit" variant="gradient" size="lg" disabled={pending}>
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <ArrowRight className="size-4" />
        )}
        {pending ? "Sending" : "Send"}
      </Button>
    </form>
  );
}

function Field({
  label,
  id,
  hint,
  error,
  children,
}: {
  label: string;
  id: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {hint && !error && (
          <span className="text-xs text-muted-foreground">{hint}</span>
        )}
        {error && <span className="text-xs text-red-400">{error}</span>}
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
