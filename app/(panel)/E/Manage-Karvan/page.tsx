import { Users } from "lucide-react";

import {
  PanelPageShell,
  panelPageIconClass,
} from "../../_components/PanelPageShell";

export default function ManageKarvanPage() {
  return (
    <PanelPageShell
      title="مدیریت کاروان‌ها"
      icon={<Users className={panelPageIconClass} aria-hidden />}
    />
  );
}
