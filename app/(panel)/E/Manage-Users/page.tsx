import { Users2 } from "lucide-react";

import {
  PanelPageShell,
  panelPageIconClass,
} from "../../_components/PanelPageShell";

export default function ManageUsersPage() {
  return (
    <PanelPageShell
      title="مدیریت کاربران"
      icon={<Users2 className={panelPageIconClass} aria-hidden />}
    />
  );
}
