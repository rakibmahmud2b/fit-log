"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Check, CircleAlert, Info, X } from "lucide-react";
import type { ToastContextValue, ToastKind, ToastNotification } from "@/types/fitlog";

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ToastNotification | null>(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function showToast(message: string, type: ToastKind = "success"): void {
    setToast({ message, type, id: Date.now() });
  }

  const Icon = toast?.type === "error" ? CircleAlert : toast?.type === "info" ? Info : Check;

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          aria-live="polite"
          className={`toast toast--${toast.type}`}
          key={toast.id}
          role="status"
        >
          <Icon aria-hidden="true" size={18} />
          <span>{toast.message}</span>
          <button aria-label="Dismiss notification" onClick={() => setToast(null)} type="button">
            <X aria-hidden="true" size={16} />
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}
