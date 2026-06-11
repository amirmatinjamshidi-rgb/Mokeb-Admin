import { Receipt } from "lucide-react";

import {
  PanelPageShell,
  panelPageIconClass,
} from "../../_components/PanelPageShell";

export default function KarvanReservationsPage() {
  return (
    <PanelPageShell
      underCarousel
      title="مدیریت رزرو ها"
      icon={<Receipt className={panelPageIconClass} aria-hidden />}
    />
  );
}
