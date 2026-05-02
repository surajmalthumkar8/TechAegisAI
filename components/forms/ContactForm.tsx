"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle" };

export function ContactForm({ defaultEmail }: { defaultEmail?: string }) {
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
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-red-soft">
          Message received
        </p>
        <h3
          className="mt-3 font-serif text-2xl font-normal italic tracking-tight"
          style={{ fontFamily: "var(--font-instrument-serif), serif" }}
        >
          We&apos;ll reply within one business day.
        </h3>
        <p className="mt-3 text-white/60">
          In the meantime, the booking panel on the right is the fastest path to
          a real conversation.
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
          className="w-full rounded-md border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-red-soft"
        />
      </Field>

      <Field label="Email" id="email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={defaultEmail}
          className="w-full rounded-md border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-red-soft"
        />
      </Field>

      <Field label="Company" id="company" hint="Optional" error={errors.company}>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          className="w-full rounded-md border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-red-soft"
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

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black shadow-2xl shadow-brand-red-soft/30 transition-transform hover:scale-[1.01] disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <ArrowRight className="size-4" />
        )}
        {pending ? "Sending" : "Send"}
      </button>
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
