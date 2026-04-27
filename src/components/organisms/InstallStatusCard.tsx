"use client";

import { useMemo } from "react";
import { getInstallSupport, getNotificationSupport } from "@/lib/pwa";

export function InstallStatusCard() {
  const installStatus = useMemo(() => getInstallSupport(), []);
  const notificationStatus = useMemo(() => getNotificationSupport(), []);

  return (
    <section className="rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">Install & Notification Readiness</h2>
      <p className="mt-2 text-sm text-[#716a60]">
        This app ships with a manifest, service worker, and profile-level notification controls.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-[#f7f4ef] p-5">
          <h3 className="text-base font-semibold">Install status</h3>
          <p className="mt-2 text-sm text-[#716a60]">{installStatus}</p>
        </div>
        <div className="rounded-2xl bg-[#f7f4ef] p-5">
          <h3 className="text-base font-semibold">Notification status</h3>
          <p className="mt-2 text-sm text-[#716a60]">{notificationStatus}</p>
        </div>
      </div>
    </section>
  );
}
