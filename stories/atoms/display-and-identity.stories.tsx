import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "@/components/atoms/Avatar";
import { Pill } from "@/components/atoms/Pill";
import { PlushiePortrait } from "@/components/atoms/PlushiePortrait";
import { StorySurface, samplePlushie, secondaryPlushie } from "../storybook-fixtures";

const meta = {
  title: "Atoms/Display & Identity",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvatarsAndPills: Story = {
  render: () => (
    <StorySurface className="flex flex-wrap items-center gap-4">
      <Avatar initials="PP" />
      <Avatar initials="SJ" size="sm" />
      <Pill>Neutral</Pill>
      <Pill tone="success">Connected</Pill>
    </StorySurface>
  ),
};

export const PlushiePortraits: Story = {
  render: () => (
    <StorySurface className="grid gap-6 md:grid-cols-2">
      <PlushiePortrait plushie={samplePlushie} />
      <PlushiePortrait plushie={secondaryPlushie} size="hero" />
    </StorySurface>
  ),
};
