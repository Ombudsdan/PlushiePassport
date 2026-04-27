import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BirthdayPlannerPanel } from "@/components/organisms/BirthdayPlannerPanel";
import { PlushieCard } from "@/components/organisms/PlushieCard";
import { PlushieCollectionPanel } from "@/components/organisms/PlushieCollectionPanel";
import { PlushieFormPanel } from "@/components/organisms/PlushieFormPanel";
import { PlushiePassportPanel } from "@/components/organisms/PlushiePassportPanel";
import { PlushiePreviewCard } from "@/components/organisms/PlushiePreviewCard";
import {
  StorySurface,
  emptyPlushieDraft,
  sampleBirthdayEntries,
  sampleNotifications,
  samplePlushie,
  sampleUser,
} from "../storybook-fixtures";

const meta = {
  title: "Organisms/Plushie Workflows",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CollectionViews: Story = {
  render: () => (
    <StorySurface className="grid gap-4 xl:grid-cols-2">
      <PlushieCard plushie={samplePlushie} />
      <PlushieCollectionPanel plushies={sampleUser.plushies.slice(0, 3)} />
      <PlushieCollectionPanel plushies={[]} />
    </StorySurface>
  ),
};

export const FormAndPreview: Story = {
  render: () => {
    function PlushieFormPreview() {
      const [draft, setDraft] = useState(emptyPlushieDraft);

      return (
        <StorySurface className="grid gap-4 xl:grid-cols-2">
          <PlushieFormPanel
            plushie={draft}
            error={null}
            onChange={(field, value) => setDraft((current) => ({ ...current, [field]: value }))}
            onSubmit={() => undefined}
          />
          <PlushiePreviewCard plushie={draft} />
        </StorySurface>
      );
    }

    return <PlushieFormPreview />;
  },
};

export const PassportAndBirthdays: Story = {
  render: () => {
    function BirthdayPreview() {
      const [selectedId, setSelectedId] = useState(sampleBirthdayEntries[0]?.id ?? null);
      const selectedEntry = sampleBirthdayEntries.find((entry) => entry.id === selectedId) ?? sampleBirthdayEntries[0] ?? null;

      return (
        <StorySurface className="grid gap-6">
          <PlushiePassportPanel plushie={samplePlushie} notifications={sampleNotifications.slice(0, 2)} />
          <BirthdayPlannerPanel
            entries={sampleBirthdayEntries}
            selectedEntry={selectedEntry}
            onSelectEntry={setSelectedId}
          />
        </StorySurface>
      );
    }

    return <BirthdayPreview />;
  },
};
