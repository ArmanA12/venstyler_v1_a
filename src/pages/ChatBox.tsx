import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/navbar/Header";
import {
  ArrowLeft,
  Send,
  Paperclip,
  Image as ImageIcon,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Mic,
} from "lucide-react";

// ✅ Socket connection
const socket = io("http://localhost:5000", { withCredentials: true });

interface Message {
  id: number;
  senderId: number;
  content: string;
  sender: { id: number; name: string };
  createdAt?: string;
}

interface ChatUser {
  id: number;
  name: string;
  isOnline?: boolean;
  lastSeen?: string;
}

const ChatBox: React.FC = () => {
  const [searchParams] = useSearchParams();
  const receiverId = Number(searchParams.get("receiverId")); // ✅ only receiverId from URL
  console.log(receiverId, "receiver ID in front end")

  const { toast } = useToast();
  const [chatId, setChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(false); // for first-time UI

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Step 1: Check if chat exists
  useEffect(() => {
    const checkChatExists = async () => {
      try {
const res = await axios.get(
  `http://localhost:5000/api/chat/find-or-null/${receiverId}`,
  { withCredentials: true }
);

        if (res.data.exists) {
          setChatId(res.data.chatId);
          setChatUser(res.data.chatUser);
          fetchMessages(res.data.chatId);
          setIsFirstMessage(false);
        } else {
          setChatUser(res.data.chatUser); // still set receiver's info
          setIsFirstMessage(true);
          
        }
      } catch (error) {
        console.error("Error checking chat:", error);
      }
    };

    if (receiverId) checkChatExists();
  }, [receiverId]);

  // ✅ Fetch messages
  const fetchMessages = async (id: number) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/chat/chats/${id}/messages`,
        { withCredentials: true }
      );

      setMessages(res.data.messages);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // ✅ Socket listener for new messages
  useEffect(() => {
    if (!chatId) return;
    socket.emit("joinRoom", `chat_${chatId}`);

    socket.off("newMessage").on("newMessage", (newMsg: Message) => {
      setMessages((prev) => [...prev, newMsg]);
      toast({
        title: newMsg.sender.name,
        description: newMsg.content,
      });
      scrollToBottom();
    });

    return () => {
      socket.emit("leaveRoom", `chat_${chatId}`);
      socket.off("newMessage");
    };
  }, [chatId, toast]);

  // ✅ Online/offline tracking
  useEffect(() => {
    socket.off("userOnline").on("userOnline", (id: number) => {
      if (chatUser?.id === id) {
        setChatUser((prev) => prev && { ...prev, isOnline: true });
      }
    });

    socket.off("userOffline").on("userOffline", (id: number) => {
      if (chatUser?.id === id) {
        setChatUser(
          (prev) =>
            prev && { ...prev, isOnline: false, lastSeen: new Date().toISOString() }
        );
      }
    });

    return () => {
      socket.off("userOnline");
      socket.off("userOffline");
    };
  }, [chatUser]);

  // ✅ Send message (handles first message creation)
  const sendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/chat/send`,
        { receiverId, content: message },
        { withCredentials: true }
      );
       console.log(res, "from send ")
       if(res.data.createdFirst){
                navigate(0); // Refresh current route in React Router
       }
      if (isFirstMessage && res.data.chatId) {
        setChatId(res.data.chatId);
        setIsFirstMessage(false);
      }

      setMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setTimeout(() => setIsSending(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/95 to-muted/20">
      <Header />

      {/* Chat Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="w-full lg:w-4/5 mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${chatUser?.name || "U"}`}
                  alt={chatUser?.name}
                  className="w-10 h-10 rounded-full"
                />
                {chatUser?.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold">{chatUser?.name || "User"}</h2>
                <p className="text-xs text-muted-foreground">
                  {chatUser?.isOnline
                    ? "Active now"
                    : chatUser?.lastSeen
                    ? `Last seen ${new Date(chatUser.lastSeen).toLocaleString()}`
                    : "Offline"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            <Phone className="w-4 h-4" />
            <MoreVertical className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="w-full lg:w-4/5 mx-auto px-4 h-full">
          <div className="h-full overflow-y-auto py-4 space-y-4">
            {isFirstMessage && messages.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Send first message from your side
              </p>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId !== chatUser?.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-2 max-w-[70%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                      {!isMe && (
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${msg.sender.name}`}
                          alt={msg.sender.name}
                          className="w-8 h-8 rounded-full mt-auto"
                        />
                      )}
                      <div>
                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p className={`text-xs text-muted-foreground ${isMe ? "text-right" : "text-left"}`}>
                          {msg.sender.name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t bg-background/80 backdrop-blur-sm">
        <div className="w-full lg:w-4/5 mx-auto px-2 py-4 flex items-center gap-3">
          <Paperclip className="w-4 h-4" />
          <ImageIcon className="w-4 h-4" />
          <Mic className="w-4 h-4" />
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border rounded-full"
            />
            <Smile className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
          <button
            onClick={sendMessage}
            disabled={!message.trim() || isSending}
            className="bg-primary text-white px-4 py-2 rounded-full disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
