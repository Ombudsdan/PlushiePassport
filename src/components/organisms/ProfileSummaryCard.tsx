import { Sparkles } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { Pill } from "@/components/atoms/Pill";
import type { UserAccount } from "@/lib/auth-state";

export function ProfileSummaryCard({ user }: { user: UserAccount }) {
  const initials = user.displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <Avatar initials={initials} />
        <h2 className="mt-5 text-3xl font-bold">{user.displayName}</h2>
        <p className="mt-1 text-base text-[#716a60]">{user.username}</p>
        <div className="mt-3">
          <Pill>{user.plan}</Pill>
        </div>
        <p className="mt-5 text-sm text-[#716a60]">{user.bio}</p>
        <p className="text-sm text-[#716a60]">{user.location}</p>
      </div>

      <dl className="mt-8 space-y-3 border-y border-[#efe7da] py-5 text-sm">
        <div className="flex justify-between">
          <dt className="text-[#716a60]">Plushies</dt>
          <dd className="font-semibold">{user.stats.plushies}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[#716a60]">Friends</dt>
          <dd className="font-semibold">{user.stats.friends}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-[#716a60]">Birthdays Tracked</dt>
          <dd className="font-semibold">{user.stats.birthdaysTracked}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <Button fullWidth icon={<Sparkles size={16} />}>
          Upgrade to Pro
        </Button>
        <p className="mt-3 text-center text-sm text-[#716a60]">
          Unlock unlimited plushies & more
        </p>
      </div>
    </section>
  );
}
