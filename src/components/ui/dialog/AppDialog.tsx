"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

type DialogSize = "xs" | "sm" | "md" | "lg" | "xl";

interface DialogProps {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  size?: DialogSize;
  fullscreen?: boolean;
  showHeader?: boolean;
  onClose?: () => void;
}

const sizeClasses: Record<DialogSize, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

export default function AppDialog({
  open,
  title,
  children,
  size = "md",
  fullscreen = false,
  showHeader = true,
  onClose = () => { },
}: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
    >
      <div
        className={clsx(
          "three-dim bg-background  rounded-2xl shadow-xl w-full relative flex flex-col",
          fullscreen ? "h-full max-w-full m-0 bg-background" : sizeClasses[size],

        )}
      >
        {/* Header */}
        {showHeader && (
          <div className="flex items-center justify-between border-b border-primary px-4 py-3">
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-primary-hover transition"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
