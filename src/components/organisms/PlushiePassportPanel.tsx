import { StatTile } from "@/components/molecules/StatTile";
import { NotificationFeedItem } from "@/components/molecules/NotificationFeedItem";
import { PlushiePortrait } from "@/components/atoms/PlushiePortrait";
import { Pill } from "@/components/atoms/Pill";
import type { PlushieRecord } from "@/lib/auth-state";
import type { NotificationFeedEntry } from "@/lib/plushie-insights";
import { formatPassportDate } from "@/lib/plushie-insights";

export function PlushiePassportPanel({
  plushie,
  notifications,
}: {
  plushie: PlushieRecord;
  notifications: NotificationFeedEntry[];
}) {
  const details = [
    ["Hometown", plushie.hometown],
    ["Birthday", formatPassportDate(plushie.birthday)],
    ["Adoption date", formatPassportDate(plushie.adoptionDate)],
    ["Favorite snack", plushie.favoriteSnack],
    ["Favorite activity", plushie.favoriteActivity],
    ["Size", plushie.size],
  ] as const;

  return (
    <div className="grid gap-6">
      <section className="grid gap-6 rounded-[32px] border border-[#e7e0d5] bg-white p-8 shadow-sm xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="grid gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b8479]">Plushie passport</p>
            <h2 className="mt-4 text-4xl font-bold text-[#171717]">{plushie.name}</h2>
            <p className="mt-3 max-w-2xl text-sm text-[#716a60]">{plushie.tagline}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <StatTile label="Passport stamps" value={plushie.passportStamps} helper="Adventures officially logged" />
            <StatTile label="Trips taken" value={plushie.adventures} helper="Journeys captured in the passport" />
            <StatTile label="Status" value={plushie.status} helper="Where this plushie is headed next" />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {details.map(([label, value]) => (
              <div key={label} className="rounded-[24px] bg-[#f7f4ef] px-5 py-4">
                <p className="text-sm text-[#716a60]">{label}</p>
                <p className="mt-2 text-base font-semibold text-[#171717]">{value}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#171717]">Accessories</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {plushie.accessories.map((accessory) => (
                <Pill key={accessory}>{accessory}</Pill>
              ))}
            </div>
          </div>
        </div>
        <PlushiePortrait plushie={plushie} size="hero" />
      </section>
      <section className="grid gap-4 xl:grid-cols-2">
        {notifications.map((item) => (
          <NotificationFeedItem key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
}
