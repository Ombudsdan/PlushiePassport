import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/atoms/Button";
import { AppShell } from "@/components/templates/AppShell";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { withAuthenticatedApp } from "../storybook-fixtures";

const meta = {
  title: "Templates/App Shells",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AppWorkspace: Story = {
  render: () => (
    <AppShell
      activePath="/dashboard"
      title="Dashboard"
      description="Use the shared app shell to frame authenticated plushie workflows."
      action={<Button>Primary action</Button>}
    >
      <section className="rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
        <p className="text-sm text-[#716a60]">Drop any authenticated dashboard, profile, notification, or discovery panel into this workspace shell.</p>
      </section>
    </AppShell>
  ),
  decorators: [withAuthenticatedApp],
};

export const AuthLayouts: Story = {
  render: () => (
    <AuthTemplate>
      <div className="mx-auto max-w-[480px] rounded-[32px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#171717]">AuthTemplate</h1>
        <p className="mt-3 text-sm text-[#716a60]">Use this template to center login, signup, or recovery cards on the plushie background.</p>
      </div>
    </AuthTemplate>
  ),
};
