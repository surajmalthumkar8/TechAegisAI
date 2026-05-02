"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { BookCallDialog } from "./BookCallDialog";

type OpenOpts = { email?: string };

type BookingContextValue = {
  open: (opts?: OpenOpts) => void;
  close: () => void;
  isOpen: boolean;
};

const BookingDialogContext = createContext<BookingContextValue | null>(null);

export function BookingDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState<string | undefined>(undefined);

  const open = useCallback((opts?: OpenOpts) => {
    setPrefillEmail(opts?.email);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <BookingDialogContext.Provider value={{ open, close, isOpen }}>
      {children}
      <BookCallDialog
        open={isOpen}
        onClose={close}
        prefillEmail={prefillEmail}
      />
    </BookingDialogContext.Provider>
  );
}

export function useBookingDialog(): BookingContextValue {
  const ctx = useContext(BookingDialogContext);
  if (!ctx) {
    throw new Error(
      "useBookingDialog must be used inside <BookingDialogProvider>",
    );
  }
  return ctx;
}
