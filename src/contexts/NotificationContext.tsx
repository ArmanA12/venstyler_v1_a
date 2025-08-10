// contexts/NotificationsContext.tsx
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

export type AppNotification = {
  id?: number;
  type: string; // "LIKE" | "Share" | "Saved" | etc.
  message: string;
  designId?: number;
  senderId?: number;
  recipientId?: number;
  createdAt?: string;
  read?: boolean;
};

type Ctx = {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (n: AppNotification) => void;
  markAllRead: () => void;
  markOneRead: (idx: number) => void;
  clear: () => void;
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

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const addNotification = useCallback((n: AppNotification) => {
    setNotifications((prev) => [{ ...n, read: false }, ...prev]);
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markOneRead = useCallback((idx: number) => {
    setNotifications((prev) =>
      prev.map((n, i) => (i === idx ? { ...n, read: true } : n))
    );
  }, []);

  const clear = useCallback(() => setNotifications([]), []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAllRead,
    markOneRead,
    clear,
  };
  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
