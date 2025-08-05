import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
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
  text: string;
  sender: "me" | "other";
  timestamp: string;
  type: "text" | "image" | "audio";
  imageUrl?: string;
  audioUrl?: string;
}

const emojiList = ["😀", "😍", "😂", "👍", "🎉", "🙏", "❤️", "😎"];

const Chat = () => {
  const { userId } = useParams();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm interested in your Elegant Summer Dress. Is it still available?",
      sender: "me",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: 2,
      text: "Hello! Yes, it's still available. Would you like to know more details about it?",
      sender: "other",
      timestamp: "10:32 AM",
      type: "text",
    },
    {
      id: 3,
      text: "Yes, please! What fabric is it made of and can you customize the size?",
      sender: "me",
      timestamp: "10:35 AM",
      type: "text",
    },
    {
      id: 4,
      text: "It's made of premium cotton with silk lining. Yes, I can definitely customize the size for you. I'll need your measurements.",
      sender: "other",
      timestamp: "10:37 AM",
      type: "text",
    },
    {
      id: 5,
      text: "Here's the size chart for reference",
      sender: "other",
      timestamp: "10:38 AM",
      type: "image",
      imageUrl: "https://picsum.photos/seed/chatimg1/300/200",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  // Mock user data
  const chatUser = {
    name: userId === "me" ? "You" : userId || "Sarah Johnson",
    avatar: "https://picsum.photos/seed/chatavatar/40/40",
    isOnline: true,
    lastSeen: "Active now",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Delete message
  const handleDeleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    toast({ title: "Message deleted" });
  };

  // Send text message
const handleSendMessage = async () => {
  if (!message.trim()) return;

  const payload = {
    chatId: 1,       // Replace with actual state or prop
    receiverId: 9,       // Replace with actual state or prop
    content: message,
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/api/chat/send",
      payload,
      { withCredentials: true }
    );

    const newMessage = res.data.message;

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setShowEmoji(false);
  } catch (error) {
    console.error("Failed to send message:", error.response?.data || error.message);
  }
};


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Image upload logic
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
          text: "Image",
          sender: "me",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "image",
          imageUrl: ev.target?.result as string,
        },
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

  // Voice recording logic
  const handleVoiceRecord = async () => {
    if (recording) {
      mediaRecorder?.stop();
      setRecording(false);
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      toast({ title: "Voice not supported in this browser" });
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);
    setAudioChunks([]);
    recorder.start();
    setRecording(true);

    recorder.ondataavailable = (e) => {
      setAudioChunks((prev) => [...prev, e.data]);
    };
    recorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Voice message",
          sender: "me",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          type: "audio",
          audioUrl,
        },
      ]);
      setAudioChunks([]);
    };
  };

  // Video call using daily.co
  const handleVideoCall = () => {
    window.open(
      "https://your-daily-room.daily.co/room",
      "_blank",
      "width=900,height=600"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 flex flex-col">
      <Header />

      {/* Chat Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm">
        <div className="w-full lg:w-4/5 mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
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
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-2 max-w-[70%] ${msg.sender === "me" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.sender === "other" && (
                    <img
                      src={chatUser.avatar}
                      alt={chatUser.name}
                      className="w-8 h-8 rounded-full mt-auto"
                    />
                  )}

                  <div className="space-y-1 relative">
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        msg.sender === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.type === "text" ? (
                        <p className="text-sm">{msg.text}</p>
                      ) : msg.type === "image" ? (
                        <div className="space-y-2">
                          <p className="text-sm">{msg.text}</p>
                          <img
                            src={msg.imageUrl}
                            alt="Shared image"
                            className="max-w-full rounded-lg"
                          />
                        </div>
                      ) : msg.type === "audio" ? (
                        <div className="space-y-2">
                          <p className="text-sm">{msg.text}</p>
                          <audio
                            controls
                            src={msg.audioUrl}
                            className="w-full"
                          />
                        </div>
                      ) : null}
                    </div>
                    <p
                      className={`text-xs text-muted-foreground ${msg.sender === "me" ? "text-right" : "text-left"}`}
                    >
                      {msg.timestamp}
                    </p>
                    {msg.sender === "me" && (
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
            {/* <Button variant="ghost" size="sm" onClick={handleImageUploadClick}>
              <ImageIcon className="w-4 h-4" />
            </Button> */}
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
              onClick={handleVoiceRecord}
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
