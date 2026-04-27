import { Toggle } from "@/components/atoms/Toggle";
import type { NotificationPreference } from "@/lib/auth-state";

export function NotificationRow({
  preference,
  onToggle,
}: {
  preference: NotificationPreference;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-[#efe7da] py-5 first:border-t-0 first:pt-0 last:pb-0">
      <div>
        <h3 className="text-base font-semibold text-[#171717]">{preference.title}</h3>
        <p className="mt-1 text-sm text-[#716a60]">{preference.description}</p>
      </div>
      <Toggle checked={preference.enabled} onChange={onToggle} label={preference.title} />
    </div>
  );
}
