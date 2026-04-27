import { NotificationRow } from "@/components/molecules/NotificationRow";
import type { NotificationPreference } from "@/lib/auth-state";

export function NotificationSettingsPanel({
  preferences,
  onToggle,
}: {
  preferences: NotificationPreference[];
  onToggle: (id: NotificationPreference["id"]) => void;
}) {
  return (
    <section className="rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">Notification Preferences</h2>
      <p className="mt-2 text-sm text-[#716a60]">
        Choose what updates you&apos;d like to receive after installing the app.
      </p>
      <div className="mt-6">
        {preferences.map((preference) => (
          <NotificationRow
            key={preference.id}
            preference={preference}
            onToggle={() => onToggle(preference.id)}
          />
        ))}
      </div>
    </section>
  );
}
