"use client";

import { useMemo, useState } from "react";
import { NotificationInboxPanel } from "@/components/organisms/NotificationInboxPanel";
import { ProtectedContent } from "@/components/organisms/ProtectedContent";
import { AppShell } from "@/components/templates/AppShell";
import { useAuth } from "@/contexts/AuthContext";
import { buildNotificationFeed } from "@/lib/plushie-insights";

export default function NotificationsPage() {
  const { currentUser } = useAuth();
  const baseItems = useMemo(() => buildNotificationFeed(currentUser), [currentUser]);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [readIds, setReadIds] = useState<string[]>([]);

  const items = baseItems
    .map((item) => ({
      ...item,
      unread: item.unread && !readIds.includes(item.id),
    }))
    .filter((item) => (showUnreadOnly ? item.unread : true));

  return (
    <AppShell
      activePath="/notifications"
      title="Notifications"
      description="Review plushie reminders, inbox updates, and account nudges without leaving your passport workspace."
    >
      <ProtectedContent>
        <NotificationInboxPanel
          items={items}
          showUnreadOnly={showUnreadOnly}
          onShowAll={() => setShowUnreadOnly(false)}
          onShowUnread={() => setShowUnreadOnly(true)}
          onMarkAllRead={() => setReadIds(baseItems.map((item) => item.id))}
        />
      </ProtectedContent>
    </AppShell>
  );
}
