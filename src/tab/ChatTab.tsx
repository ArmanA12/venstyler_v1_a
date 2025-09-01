import { useUserChats } from "@/hooks/useUserChats";
import { MessageCircle, User } from "lucide-react";
import { Link } from "react-router-dom";

interface ChatUser {
  id: number;
  name: string;
  isOnline: boolean;
  lastSeen: string;
}

interface LastMessage {
  id: number;
  chatId: number;
  senderId: number;
  content: string;
  createdAt: string;
  sender: {
    id: number;
    name: string;
  };
}

interface UserChat {
  chatId: number;
  chatUser: ChatUser;
  lastMessage: LastMessage;
}

export function ChatTab() {
  const { data: chats, isLoading, isError } = useUserChats();

  if (isLoading) {
    return (
      <div className="fashion-card p-6">
        <h3 className="text-xl font-playfair font-semibold mb-4">
          Recent Conversations
        </h3>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 bg-muted/30 rounded-lg animate-pulse h-20" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fashion-card p-6">
        <h3 className="text-xl font-playfair font-semibold mb-4">
          Recent Conversations
        </h3>
        <p className="text-sm text-destructive">Failed to load chats. Please try again.</p>
      </div>
    );
  }

  if (!chats?.length) {
    return (
      <div className="fashion-card p-6">
        <h3 className="text-xl font-playfair font-semibold mb-4">
          Recent Conversations
        </h3>
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No conversations yet.</p>
        </div>
      </div>
    );
  }

  const formatTime = (dateString: string) => {
    const now = new Date();
    const messageDate = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return messageDate.toLocaleDateString();
  };

  return (
    <div className="fashion-card p-6">
      <h3 className="text-xl font-playfair font-semibold mb-4">
        Recent Conversations
      </h3>
      <div className="space-y-4">
        {chats.map((chat: UserChat) => (
          <Link
            key={chat.chatId}
            to={`/chatbox?chatId=${chat.chatId}&receiverId=${chat.chatUser.id}`}
            className="block"
          >
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${chat.chatUser.name}`}
                    alt={chat.chatUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {chat.chatUser.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{chat.chatUser.name}</p>
                  {chat.chatUser.isOnline ? (
                    <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                      Online
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                      Offline
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {chat.lastMessage.content}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatTime(chat.lastMessage.createdAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}