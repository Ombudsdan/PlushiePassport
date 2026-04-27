import { Button } from "@/components/atoms/Button";
import { ConnectedAccountRow } from "@/components/molecules/ConnectedAccountRow";
import type { ConnectedAccount } from "@/lib/auth-state";

export function ConnectedAccountsPanel({
  accounts,
  onToggle,
}: {
  accounts: ConnectedAccount[];
  onToggle: (id: ConnectedAccount["id"]) => void;
}) {
  const nextAvailable = accounts.find((account) => !account.connected);

  return (
    <section className="rounded-[28px] border border-[#e7e0d5] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">Connected Accounts</h2>
      <p className="mt-2 text-sm text-[#716a60]">
        Manage your linked social and authentication accounts.
      </p>
      <div className="mt-6 space-y-4">
        {accounts.map((account) => (
          <ConnectedAccountRow
            key={account.id}
            account={account}
            onToggle={() => onToggle(account.id)}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Button
          variant="ghost"
          onClick={() => {
            if (nextAvailable) {
              onToggle(nextAvailable.id);
            }
          }}
        >
          Add Account
        </Button>
      </div>
    </section>
  );
}
