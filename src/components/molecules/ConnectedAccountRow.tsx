import { Button } from "@/components/atoms/Button";
import { Pill } from "@/components/atoms/Pill";
import type { ConnectedAccount } from "@/lib/auth-state";

export function ConnectedAccountRow({
  account,
  onToggle,
}: {
  account: ConnectedAccount;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#efe7da] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-base font-semibold text-[#171717]">{account.title}</h3>
        <p className="text-sm text-[#716a60]">{account.handle}</p>
      </div>
      <div className="flex items-center gap-3">
        <Pill tone={account.connected ? "success" : "neutral"}>
          {account.connected ? "Connected" : "Available"}
        </Pill>
        <Button variant="ghost" onClick={onToggle}>
          {account.connected ? "Disconnect" : "Connect"}
        </Button>
      </div>
    </div>
  );
}
