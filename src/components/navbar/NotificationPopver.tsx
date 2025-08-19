import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNotifications } from "@/contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

export function NotificationPopover() {
  const { notifications, unreadCount, markByDesign } = useNotifications();
  const navigate = useNavigate();

  // Mark ALL unread notifications as read on the server (by design)
  const markAll = async () => {
    // collect unique designIds that exist
    const ids = Array.from(
      new Set(
        notifications
          .map((n) => n.designId)
          .filter((v): v is number => typeof v === "number")
      )
    );
    if (ids.length === 0) return;
    await Promise.all(ids.map((id) => markByDesign(id)));
  };

  // Mark a single notification read, then (optionally) go to its design page
  const onItemClick = async (n: { designId?: number }) => {
    if (n.designId) {
      await markByDesign(n.designId); // server + cache update
      navigate(`/product/${n.designId}`); // optional: deep link
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover-glow">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 text-xs flex items-center justify-center bg-gradient-to-r from-primary to-secondary rounded-full text-white font-medium">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-2">
        <div className="flex justify-between items-center border-b pb-2 mb-2">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <button
              className="text-sm text-primary hover:underline"
              onClick={markAll}
            >
              Mark all read
            </button>
          )}
        </div>

        {notifications.length > 0 ? (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {notifications.map((n, idx) => {
              // This list holds UNREAD notifications only if you query unread from server.
              // Treat them as unread in UI (highlight). After markByDesign they disappear.
              return (
                <li
                  key={n.id ?? idx}
                  className="p-2 relative rounded overflow-clip cursor-pointer transition bg-background  hover:bg-primary/10 shadow-medium border backdrop-blur-lg"
                  onClick={() => onItemClick(n)}
                >
                  <div className=" w-36 h-6 bg-gray-400 absolute top-1 left-[20%]  blur-2xl"></div>
                  <p className="text-sm font-medium">{n.type}</p>
                  <p className="text-xs text-gray-500">{n.message}</p>
                  <span className="text-[10px] text-gray-400">
                    {new Date(n.createdAt || "").toLocaleString()}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No notifications yet</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
