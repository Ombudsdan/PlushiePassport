import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Search } from "lucide-react";
import { BirthdayListItem } from "@/components/molecules/BirthdayListItem";
import { BirthdayTimelineItem } from "@/components/molecules/BirthdayTimelineItem";
import { FilterChip } from "@/components/molecules/FilterChip";
import { SidebarLink } from "@/components/molecules/SidebarLink";
import { StatTile } from "@/components/molecules/StatTile";
import { StorySurface, sampleBirthdayEntries, samplePlushie } from "../storybook-fixtures";

const meta = {
  title: "Molecules/Navigation & Status",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Highlights: Story = {
  render: () => (
    <StorySurface className="grid gap-4 md:grid-cols-3">
      <StatTile label="Collection size" value={8} helper="Passport-ready plushies" />
      <StatTile label="Connected friends" value={12} helper="Collectors in your circle" />
      <StatTile label="Birthday reminders" value={15} helper="Celebrations on your radar" />
    </StorySurface>
  ),
};

export const BirthdayUtilities: Story = {
  render: () => (
    <StorySurface className="grid gap-4 lg:grid-cols-2">
      <BirthdayListItem plushie={samplePlushie} />
      <BirthdayTimelineItem entry={sampleBirthdayEntries[0]} active onSelect={() => undefined} />
    </StorySurface>
  ),
};

export const FilterAndNavigationChips: Story = {
  render: () => (
    <StorySurface className="grid gap-4">
      <div className="flex flex-wrap gap-3">
        <FilterChip active count={24} label="All" onClick={() => undefined} />
        <FilterChip active={false} count={6} label="Birthdays" onClick={() => undefined} />
        <FilterChip active={false} label="Suggested" onClick={() => undefined} />
      </div>
      <div className="max-w-[240px] rounded-[24px] border border-[#e7e0d5] bg-white p-4">
        <SidebarLink href="/search" label="Search" icon={Search} active />
      </div>
    </StorySurface>
  ),
};
