import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/atoms/Button";
import { SelectInput } from "@/components/atoms/SelectInput";
import { TextArea } from "@/components/atoms/TextArea";
import { TextInput } from "@/components/atoms/TextInput";
import { Toggle } from "@/components/atoms/Toggle";
import { StorySurface } from "../storybook-fixtures";

const meta = {
  title: "Atoms/Actions & Inputs",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Base action and form primitives used throughout the Plushie Passport atomic design system.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Buttons: Story = {
  render: () => (
    <StorySurface className="flex flex-wrap gap-4">
      <Button>Primary action</Button>
      <Button variant="secondary">Secondary action</Button>
      <Button variant="ghost">Ghost action</Button>
    </StorySurface>
  ),
};

export const TextInputs: Story = {
  render: () => (
    <StorySurface className="grid max-w-xl gap-4">
      <TextInput aria-label="Display name" defaultValue="Sarah Johnson" />
      <TextInput aria-label="Search" placeholder="Search plushies, friends, birthdays..." />
    </StorySurface>
  ),
};

export const SelectAndTextArea: Story = {
  render: () => (
    <StorySurface className="grid max-w-xl gap-4">
      <SelectInput aria-label="Size" defaultValue="Medium">
        <option value="Tiny">Tiny</option>
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </SelectInput>
      <TextArea aria-label="Tagline" defaultValue="Snowy explorer with a passport full of cozy cafe stops." />
    </StorySurface>
  ),
};

export const Toggles: Story = {
  render: () => {
    function TogglePreview() {
      const [enabled, setEnabled] = useState(true);
      const [disabled, setDisabled] = useState(false);

      return (
        <StorySurface className="grid max-w-md gap-4">
          <Toggle checked={enabled} onChange={() => setEnabled((current) => !current)} label="Birthday reminders" />
          <Toggle checked={disabled} onChange={() => setDisabled((current) => !current)} label="Travel stamp updates" />
        </StorySurface>
      );
    }

    return <TogglePreview />;
  },
};
