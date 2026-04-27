"use client";

import { Avatar } from "@/components/atoms/Avatar";
import { SidebarLink } from "@/components/molecules/SidebarLink";
import { useAuth } from "@/contexts/AuthContext";
import { navItems } from "@/lib/routes";

export function AppSidebar({ activePath }: { activePath: string }) {
  const { currentUser, isHydrated } = useAuth();
  const displayName = isHydrated ? currentUser?.displayName ?? "Sarah J." : "Sarah J.";
  const plan = isHydrated ? currentUser?.plan ?? "Free Plan" : "Free Plan";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="flex w-full max-w-[240px] flex-col justify-between border-r border-[#e7e0d5] bg-white px-6 py-8">
      <div>
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">
            PP
          </div>
          <div>
            <p className="text-lg font-bold">Plushie Passport</p>
            <p className="text-sm text-[#716a60]">Passport for every plushie</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <SidebarLink
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={activePath === item.href || activePath.startsWith(`${item.href}/`)}
            />
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3 border-t border-[#efe7da] pt-6">
        <Avatar initials={initials} size="sm" />
        <div>
          <p className="text-sm font-semibold">{displayName}</p>
          <p className="text-xs text-[#716a60]">{plan}</p>
        </div>
      </div>
    </aside>
  );
}
