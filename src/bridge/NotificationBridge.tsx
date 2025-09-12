// NotificationsSocketBridge.tsx (unchanged usage)
import { useNotifications } from "@/contexts/NotificationContext";
import { useToast } from "@/hooks/use-toast";
import socket from "@/lib/socket";
import { useEffect, useCallback } from "react";

export function NotificationsSocketBridge({
  userId,
}: {
  userId: number | null;
}) {
  const { addNotification } = useNotifications();
  const { toast } = useToast();

  const handleNewNotification = useCallback(
    (data: any) => {
      addNotification({
        id: data.id,
        type: data.type,
        message: data.message,
        designId: data.designId,
        senderId: data.senderId,
        recipientId: data.recipientId,
        createdAt: data.createdAt ?? new Date().toISOString(),
        read: false,
      });
      toast({ title: data.type, description: data.message });
    },
    [addNotification, toast]
  );

  useEffect(() => {
    if (!userId) return;
    socket.emit("join-room", userId);
    socket.on("new-notification", handleNewNotification);
    return () => {
      socket.off("new-notification", handleNewNotification);
    };
  }, [userId, handleNewNotification]);

  return null;
}
