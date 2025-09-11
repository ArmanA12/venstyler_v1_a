import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/navbar/Header";
import VideoCall from "./VideoCall";
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

// ✅ Connect once globally
const socket = io("https://venstyler.armanshekh.com", { withCredentials: true });

interface Message {
  id: number;
  senderId: number;
  content: string;
  chatId?: number;
  sender: {
    id: number;
    name: string;
  };
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
  const navigate = useNavigate();
  const receiverId = Number(searchParams.get("receiverId"));

  const { toast } = useToast();
  const [chatId, setChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [chatUser, setChatUser] = useState<ChatUser | null>(null);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [callUrl, setCallUrl] = useState<string | null>(null);

// const startCall = async () => {
//   try {
//     const res = await axios.post(
//       "https://venstyler.armanshekh.com/api/chat/videoCall",
//       { chatId },
//       { withCredentials: true } // ✅ must be inside config object
//     );
//     setCallUrl(res.data.url);
//   } catch (error) {
//     console.error("Error starting call:", error);
//   }
// };


  const startCall = async () => {
    try {
      const res = await axios.post(
        "https://venstyler.armanshekh.com/api/chat/videoCall",
        { chatId },
        { withCredentials: true } // ✅ fixed
      );
      setCallUrl(res.data.url);
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Step 1: Resolve chat & user info on mount
  useEffect(() => {
    const initChat = async () => {
      try {
        const res = await axios.get(
          `https://venstyler.armanshekh.com/api/chat/find-or-null/${receiverId}`,
          { withCredentials: true }
        );

        if (res.data.exists) {
          setChatId(res.data.chatId);
        }
        setChatUser(res.data.chatUser);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    if (receiverId) initChat();
  }, [receiverId]);

  // ✅ Step 2: Fetch messages once chatId is known
  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `https://venstyler.armanshekh.com/api/chat/chats/${chatId}/messages`,
          { withCredentials: true }
        );
        setMessages(res.data.messages);
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [chatId]);

  // ✅ Step 3: Socket new message listener
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

  // ✅ Step 4: Online/offline tracking
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

  // ✅ Step 5: Send message (create chat if needed)
  const sendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    try {
      const res = await axios.post(
        `https://venstyler.armanshekh.com/api/chat/send`,
        { receiverId, content: message },
        { withCredentials: true }
      );

      // If chat created first time → update chatId
      if (res.data.createdFirst && res.data.message.chatId) {
        setChatId(res.data.message.chatId);
      }

      setMessage(""); // clear input
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setTimeout(() => setIsSending(false), 1000);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 flex flex-col">
      <Header />
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="w-full lg:w-4/5 mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
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
              <button className="hover:bg-muted p-2 rounded-full">
                <Video className="w-4 h-4" />
                    <div>
      {!callUrl ? (
        <button
          onClick={startCall}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            background: "#ff1a75",
            color: "white",
          }}
        >
          Start Video Call
        </button>
      ) : (
        <VideoCall url={callUrl} onLeave={() => setCallUrl(null)} />
      )}
    </div>

              </button>
              <button className="hover:bg-muted p-2 rounded-full">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="w-full lg:w-4/5 mx-auto px-4 h-full">
          <div className="h-full overflow-y-auto py-4 space-y-4 pb-20 scrollbar-hide">
            {messages.map((msg) => {
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
                    <div className="space-y-1 relative">
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
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Fixed Input at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm">
        <div className="w-full lg:w-4/5 mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button className="hover:bg-muted p-2 rounded-full">
              <ImageIcon className="w-4 h-4" />
            </button>
            <button className="hover:bg-muted p-2 rounded-full">
              <Mic className="w-4 h-4" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full">
                <Smile className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={sendMessage}
              disabled={!message.trim() || isSending}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
