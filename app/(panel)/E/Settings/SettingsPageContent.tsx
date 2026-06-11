"use client";

import { useState } from "react";

import {
  KarvanInformationSection,
  RepresentativeSection,
  SettingsSections,
  UserInfo,
  type SettingsSectionId,
} from "@admin-kit/index";

export function SettingsPageContent() {
  const [section, setSection] = useState<SettingsSectionId>("caravan");

  return (
    <>
      <SettingsSections value={section} onValueChange={setSection} />

      {section === "caravan" ? (
        <div className="flex flex-col gap-4">
          <KarvanInformationSection />
          <RepresentativeSection />
        </div>
      ) : null}

      {section === "user" ? <UserInfo phone="09120000000" /> : null}

      {section === "documents" ? (
        <p className="text-sm text-[#61756F]">
          بخش مستندات — محتوای ادمین را اینجا اضافه کنید.
        </p>
      ) : null}
    </>
  );
}
