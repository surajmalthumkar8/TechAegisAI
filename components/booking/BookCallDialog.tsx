"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { CalEmbed } from "./CalEmbed";

export function BookCallDialog({
  open,
  onClose,
  prefillEmail,
}: {
  open: boolean;
  onClose: () => void;
  prefillEmail?: string;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Book a working session"
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl border border-border bg-background shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close booking dialog"
              className="absolute right-4 top-4 z-10 inline-flex size-8 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
            >
              <X className="size-4" />
            </button>
            <div className="p-4 md:p-6">
              <CalEmbed prefillEmail={prefillEmail} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
