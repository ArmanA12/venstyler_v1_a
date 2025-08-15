// contexts/NotificationContext.tsx
import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export type AppNotification = {
  id: number;
  type: string;
  message: string;
  designId?: number;
  senderId?: number;
  recipientId?: number;
  createdAt: string;
  read?: boolean; // client helper (server uses isRead)
};

type Ctx = {
  notifications: AppNotification[]; // unread from server
  unreadCount: number; // derived from array length
  addNotification: (n: AppNotification) => void; // push from socket
  markByDesign: (designId: number) => Promise<void>; // server + cache update
  clearLocal: () => void; // clear cache locally (optional)
};

const NotificationsContext = createContext<Ctx | null>(null);
export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx)
    throw new Error(
      "useNotifications must be used within NotificationsProvider"
    );
  return ctx;
};

// --- API helpers ---
async function fetchUnreadNotifications() {
  const { data } = await api.get<{
    success: boolean;
    notifications: Array<{
      id: number;
      type: string;
      message: string;
      designId?: number;
      senderId?: number;
      recipientId?: number;
      createdAt: string;
      isRead: boolean;
    }>;
  }>("/api/users/getUnreadNotifications", { withCredentials: true });

  // server returns only unread (isRead=false), map to AppNotification
  return data.notifications.map((n) => ({
    id: n.id,
    type: n.type,
    message: n.message,
    designId: n.designId,
    senderId: n.senderId,
    recipientId: n.recipientId,
    createdAt: n.createdAt,
    read: n.isRead, // false from server
  })) as AppNotification[];
}

async function markNotificationAsReadByDesign(designId: number) {
  await api.post(
    `/api/users/markNotificationAsReadByDesign/${designId}`,
    {},
    { withCredentials: true }
  );
}

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const qc = useQueryClient();

  // 1) Load unread from server
  const unreadQ = useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: fetchUnreadNotifications,
    refetchOnWindowFocus: true,
    staleTime: 15_000,
  });

  // 2) Push new items (from socket) into the cache
  const addNotification = useCallback(
    (n: AppNotification) => {
      qc.setQueryData<AppNotification[]>(
        ["notifications", "unread"],
        (old = []) => {
          // Prepend only if it's actually unread (server will later flip to read)
          return [
            {
              ...n,
              read: false,
              createdAt: n.createdAt ?? new Date().toISOString(),
            },
            ...old,
          ];
        }
      );
    },
    [qc]
  );

  // 3) Mark read by design: call server then update cache
  const markMut = useMutation({
    mutationFn: (designId: number) => markNotificationAsReadByDesign(designId),
    onSuccess: (_res, designId) => {
      qc.setQueryData<AppNotification[]>(
        ["notifications", "unread"],
        (old = []) => {
          // turn matching design notifications "read" or remove them from the unread list
          // since this query stores only UNREAD, we can remove them:
          return old.filter((n) => n.designId !== designId);
        }
      );
    },
  });

  const markByDesign = useCallback(
    async (designId: number) => {
      await markMut.mutateAsync(designId);
    },
    [markMut]
  );

  // 4) Optional: clear local cache (no server call)
  const clearLocal = useCallback(() => {
    qc.setQueryData(["notifications", "unread"], []);
  }, [qc]);

  const notifications = unreadQ.data ?? [];
  const unreadCount = notifications.length;

  const value: Ctx = {
    notifications,
    unreadCount,
    addNotification,
    markByDesign,
    clearLocal,
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
