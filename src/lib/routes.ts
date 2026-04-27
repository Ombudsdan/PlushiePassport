import {
  Bell,
  CalendarDays,
  Heart,
  LayoutDashboard,
  Package2,
  Search,
  User,
  type LucideIcon,
} from "lucide-react";

export const navItems: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/plushies", label: "My Plushies", icon: Package2 },
  { href: "/dashboard#calendar", label: "Calendar", icon: CalendarDays },
  { href: "/dashboard#friends", label: "Friends", icon: Heart },
  { href: "/dashboard#search", label: "Search", icon: Search },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];
