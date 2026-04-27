"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { BirthdayListItem } from "@/components/molecules/BirthdayListItem";
import { NotificationFeedItem } from "@/components/molecules/NotificationFeedItem";
import { StatTile } from "@/components/molecules/StatTile";
import { PlushiePortrait } from "@/components/atoms/PlushiePortrait";
import { PlushieCard } from "@/components/organisms/PlushieCard";
import { ProtectedContent } from "@/components/organisms/ProtectedContent";
import { AppShell } from "@/components/templates/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { buildNotificationFeed, getFeaturedPlushies, getUpcomingBirthdays } from "@/lib/plushie-insights";

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const featuredPlushies = getFeaturedPlushies(currentUser?.plushies ?? [], 3);
  const [leadPlushie] = featuredPlushies;
  const notifications = buildNotificationFeed(currentUser).slice(0, 2);
  const upcomingBirthdays = getUpcomingBirthdays(currentUser?.plushies ?? [], 3);
  const connectedCount = currentUser?.connectedAccounts.filter((account) => account.connected).length ?? 0;
  const favoriteSpecies = featuredPlushies[0]?.species ?? "Plushie";

  return (
    <AppShell
      activePath="/dashboard"
      title="Dashboard"
      description="A quick view of your plushie collection, passport highlights, and reminder inbox."
      action={
        <Link href="/plushies/new">
          <Button icon={<Plus size={16} />}>Add New Plushie</Button>
        </Link>
      }
    >
      <ProtectedContent>
        {currentUser ? (
          <div className="grid gap-6">
            <section className="grid gap-6 rounded-[32px] border border-[#e7e0d5] bg-white p-8 shadow-sm xl:grid-cols-[minmax(0,1fr)_360px]">
              <div>
                <h2 className="text-3xl font-bold text-[#171717]">My Plushie Collection</h2>
                <p className="mt-3 max-w-2xl text-sm text-[#716a60]">
                  Welcome back, {currentUser.displayName}! You have {currentUser.stats.plushies} plushies in your collection.
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <StatTile label="Collection size" value={currentUser.stats.plushies} helper="Passport-ready plushies in your crew" />
                  <StatTile label="Connected friends" value={currentUser.stats.friends} helper="Friends following your plushie adventures" />
                  <StatTile label="Birthday reminders" value={currentUser.stats.birthdaysTracked} helper="Celebrations currently on your radar" />
                </div>
              </div>
              {leadPlushie ? <PlushiePortrait plushie={leadPlushie} size="hero" /> : null}
            </section>

            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_0.85fr]">
              <div className="grid gap-6">
                <div id="search" className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#171717]">Collection highlights</h3>
                    <p className="mt-2 text-sm text-[#716a60]">Your most active passports and adventure-ready plushies.</p>
                  </div>
                  <Link href="/plushies">
                    <Button variant="secondary">Browse all plushies</Button>
                  </Link>
                </div>
                <div className="grid gap-6 xl:grid-cols-2">
                  {featuredPlushies.map((plushie) => (
                    <PlushieCard key={plushie.id} plushie={plushie} />
                  ))}
                </div>
              </div>

              <div className="grid gap-6">
                <section id="calendar" className="rounded-[28px] border border-[#e7e0d5] bg-[#fcfaf6] p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-[#171717]">Upcoming birthdays</h3>
                  <p className="mt-2 text-sm text-[#716a60]">Keep cards, cake, and commemorative stamps ready.</p>
                  <div className="mt-5 grid gap-3">
                    {upcomingBirthdays.map((plushie) => (
                      <BirthdayListItem key={plushie.id} plushie={plushie} />
                    ))}
                  </div>
                </section>

                <section id="friends" className="rounded-[28px] border border-[#e7e0d5] bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-[#171717]">Circle snapshot</h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <StatTile label="Connected accounts" value={connectedCount} helper="Places you can share passport updates" />
                    <StatTile label="Favorite species" value={favoriteSpecies} helper="Most visible across your latest highlights" />
                  </div>
                </section>
              </div>
            </section>

            <section className="grid gap-4 rounded-[28px] border border-[#e7e0d5] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#171717]">Latest notifications</h3>
                  <p className="mt-2 text-sm text-[#716a60]">A quick preview of reminders and account updates.</p>
                </div>
                <Link href="/notifications">
                  <Button variant="secondary">Open notifications</Button>
                </Link>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                {notifications.map((item) => (
                  <NotificationFeedItem key={item.id} item={item} />
                ))}
              </div>
            </section>
          </div>
        ) : null}
      </ProtectedContent>
    </AppShell>
  );
}
