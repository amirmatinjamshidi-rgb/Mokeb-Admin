"use client";

import type { ReactNode } from "react";

import { PanelGate } from "./PanelGate";
import { PanelShell } from "./PanelShell";

export function AdminPanelLayoutClient({ children }: { children: ReactNode }) {
  return (
    <PanelGate>
      <PanelShell>{children}</PanelShell>
    </PanelGate>
  );
}

/** Alias for admin panel layout — same shell/gate wiring. */
export function BossPanelLayoutClient({ children }: { children: ReactNode }) {
  return (
    <PanelGate>
      <PanelShell>{children}</PanelShell>
    </PanelGate>
  );
}
