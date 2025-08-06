import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import socket from "@/lib/socket";
import {
  ArrowLeft,
  Send,
  Paperclip,
  Image as ImageIcon,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Trash,
  Mic,
} from "lucide-react";

interface Message {
  id: number;
  content: string;
  senderId: number;
  createdAt: string;
  type: "text" | "image" | "audio";
  sender: { id: number; name: string };
}

interface ChatUser {
  id: number;
  name: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

const emojiList = ["😀", "😍", "😂", "👍", "🎉", "🙏", "❤️", "😎"];

const Chat = () => {
  const { chatId, receiverId } = useParams();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recording, setRecording] = useState(false);
  const currentUserId = 1; // Replace with actual current user ID from auth context

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages and chat details
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/chat/chats/${chatId}/messages`,
          { withCredentials: true }
        );
        
        setMessages(response.data.messages);
        setChatUser({
          ...response.data.chatUser,
          avatar: "https://picsum.photos/seed/chatavatar/40/40",
          isOnline: true,
          lastSeen: "Active now"
        });
      } catch (error) {
        toast({
          title: "Error loading messages",
          description: error.response?.data?.message || "Server error",
        });
      } finally {
        setLoading(false);
      }
    };

    if (chatId) {
      fetchMessages();
      socket.emit("joinChat", { chatId: parseInt(chatId) });
    }
  }, [chatId, toast]);

  // Socket.IO real-time messaging
  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send text message
  const handleSendMessage = async () => {
    if (!message.trim() || !chatUser) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/chat/send",
        {
          receiverId:parseInt(receiverId),
          content: message,
          type: "text",
        },
        { withCredentials: true }
      );

      setMessage("");
      setShowEmoji(false);
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: error.response?.data?.message || "Network error",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Delete message (frontend-only for now)
  const handleDeleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    toast({ title: "Message deleted" });
  };

  // Image upload logic (frontend-only for now)
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "Image",
          senderId: currentUserId,
          createdAt: new Date().toISOString(),
          type: "image",
          sender: { id: currentUserId, name: "You" },
          imageUrl: ev.target?.result as string,
        } as Message,
      ]);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Emoji picker logic
  const handleEmojiClick = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmoji(false);
  };

  // Video call using daily.co
  const handleVideoCall = () => {
    window.open(
      "https://your-daily-room.daily.co/room",
      "_blank",
      "width=900,height=600"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading messages...</div>
        </div>
      </div>
    );
  }

  if (!chatUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">Chat not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 flex flex-col">
      <Header />

      {/* Chat Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="w-full lg:w-4/5 mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/messages"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Link>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={chatUser.avatar}
                    alt={chatUser.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {chatUser.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold">{chatUser.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {chatUser.lastSeen}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleVideoCall}>
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <div className="w-full lg:w-4/5 mx-auto px-4 h-full">
          <div className="h-full overflow-y-auto py-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderId === currentUserId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[70%] ${
                    msg.senderId === currentUserId ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {msg.senderId !== currentUserId && (
                    <img
                      src={chatUser.avatar}
                      alt={chatUser.name}
                      className="w-8 h-8 rounded-full mt-auto"
                    />
                  )}

                  <div className="space-y-1 relative">
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        msg.senderId === currentUserId
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.type === "text" ? (
                        <p className="text-sm">{msg.content}</p>
                      ) : msg.type === "image" ? (
                        <div className="space-y-2">
                          <p className="text-sm">{msg.content}</p>
                          <img
                            src={(msg as any).imageUrl}
                            alt="Shared image"
                            className="max-w-full rounded-lg"
                          />
                        </div>
                      ) : msg.type === "audio" ? (
                        <div className="space-y-2">
                          <p className="text-sm">{msg.content}</p>
                          <audio
                            controls
                            src={(msg as any).audioUrl}
                            className="w-full"
                          />
                        </div>
                      ) : null}
                    </div>
                    <p
                      className={`text-xs text-muted-foreground ${
                        msg.senderId === currentUserId ? "text-right" : "text-left"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    {msg.senderId === currentUserId && (
                      <button
                        className="absolute -top-2 -right-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDeleteMessage(msg.id)}
                        title="Delete"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[70%]">
                  <img
                    src={chatUser.avatar}
                    alt={chatUser.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="bg-muted px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t bg-background/80 backdrop-blur-sm">
        <div className="w-full lg:w-4/5 mx-auto px-2 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleImageUploadClick}>
              <Paperclip className="w-4 h-4" />
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {/* Voice recording button */}
            <Button
              variant={recording ? "destructive" : "ghost"}
              size="sm"
              onClick={() => setRecording(!recording)}
              title={recording ? "Stop Recording" : "Record Voice"}
            >
              <Mic className="w-4 h-4" />
            </Button>

            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="fashion-input pr-12"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                type="button"
                onClick={() => setShowEmoji((v) => !v)}
              >
                <Smile className="w-4 h-4" />
              </Button>
              {showEmoji && (
                <div className="absolute bottom-10 right-0 bg-white border rounded shadow p-2 flex flex-wrap gap-1 z-10">
                  {emojiList.map((emoji) => (
                    <button
                      key={emoji}
                      className="text-xl hover:bg-muted rounded"
                      type="button"
                      onClick={() => handleEmojiClick(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="fashion-button"
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;