import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNotifications } from "@/contexts/NotificationContext";

export function NotificationPopover() {
  const { notifications, unreadCount, markAllRead } = useNotifications();

  return (
    <Popover>
      {/* Trigger */}
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

      {/* Content */}
      <PopoverContent className="w-80 p-2">
        <div className="flex justify-between items-center border-b pb-2 mb-2">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={markAllRead}
            >
              Mark all read
            </button>
          )}
        </div>

        {notifications.length > 0 ? (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {notifications.map((n, idx) => (
              <li
                key={idx}
                className={`p-2 rounded cursor-pointer transition ${
                  !n.read ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-50"
                }`}
              >
                <p className="text-sm font-medium">{n.type}</p>
                <p className="text-xs text-gray-500">{n.message}</p>
                <span className="text-[10px] text-gray-400">
                  {new Date(n.createdAt || "").toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No notifications yet</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
