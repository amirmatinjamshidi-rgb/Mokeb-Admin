import { FilePenLine } from "lucide-react";

import {
  PanelPageShell,
  panelPageIconClass,
} from "../../_components/PanelPageShell";

export default function DashboardPage() {
  return (
    <PanelPageShell
      underCarousel
      title="داشبورد"
      icon={<FilePenLine className={panelPageIconClass} aria-hidden />}
    />
  );
}
