import { Button } from "@/components/atoms/Button";
import { NotificationFeedItem } from "@/components/molecules/NotificationFeedItem";
import type { NotificationFeedEntry } from "@/lib/plushie-insights";

export function NotificationInboxPanel({
  items,
  showUnreadOnly,
  onShowAll,
  onShowUnread,
  onMarkAllRead,
}: {
  items: NotificationFeedEntry[];
  showUnreadOnly: boolean;
  onShowAll: () => void;
  onShowUnread: () => void;
  onMarkAllRead: () => void;
}) {
  return (
    <section className="grid gap-5 rounded-[28px] border border-[#e7e0d5] bg-[#fcfaf6] p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#171717]">Notification inbox</h2>
          <p className="mt-2 text-sm text-[#716a60]">
            Review birthday reminders, passport updates, and account nudges in one place.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant={showUnreadOnly ? "secondary" : "primary"} onClick={onShowAll}>
            All updates
          </Button>
          <Button variant={showUnreadOnly ? "primary" : "secondary"} onClick={onShowUnread}>
            Unread only
          </Button>
          <Button variant="ghost" onClick={onMarkAllRead}>
            Mark all as read
          </Button>
        </div>
      </div>
      {items.length ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {items.map((item) => (
            <NotificationFeedItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-dashed border-[#d7cfbf] bg-white px-6 py-10 text-center">
          <p className="text-lg font-semibold text-[#171717]">All caught up</p>
          <p className="mt-2 text-sm text-[#716a60]">There are no notifications in this view right now.</p>
        </div>
      )}
    </section>
  );
}
