import React from 'react'

function Chat() {
  return (
    <div>Chat</div>
  )
}

export default Chat

// // ChatBox.tsx
// import React, { useEffect, useState, useRef } from "react";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";
// import io from "socket.io-client";
// import { useToast } from "@/hooks/use-toast";
// import { Header } from "@/components/navbar/Header";
// import {
//   ArrowLeft,
//   Send,
//   Paperclip,
//   Image as ImageIcon,
//   Phone,
//   Video,
//   MoreVertical,
//   Smile,
//   Trash,
//   Mic,
// } from "lucide-react";

// const socket = io("http://localhost:5000", { withCredentials: true });

// interface Message {
//   id: number;
//   senderId: number;
//   content: string;
//   sender: {
//     id: number;
//     name: string;
//   };
//   createdAt?: string;
// }

// const ChatBox: React.FC = () => {
//   const [searchParams] = useSearchParams();
//   const chatId = Number(searchParams.get("chatId"));
//   const receiverId = Number(searchParams.get("receiverId"));
//   const { toast } = useToast();

  
  // useEffect(() => {
  //   if (chatId) {
  //     socket.emit("joinRoom", `chat_${chatId}`);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/chat/chats/${chatId}/messages`, {
//           withCredentials: true,
//         });
//         setMessages(res.data.messages);
//         setChatUser(res.data.chatUser);
//         scrollToBottom();
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     if (chatId) {
//       fetchMessages();
//     }
//   }, [chatId]);

//   useEffect(() => {
//     if (chatId) {
//       socket.emit("joinRoom", `chat_${chatId}`);

//       socket.on("newMessage", (newMsg: Message) => {
//         setMessages((prev) => [...prev, newMsg]);
//         toast({
//           title: newMsg.sender.name,
//           description: newMsg.content,
//         });
//         scrollToBottom();
//       });

//       return () => {
//         socket.off("newMessage");
//         socket.emit("leaveRoom", `chat_${chatId}`);
//       };
//     }
//   }, [chatId]);

//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     const tempMessage: Message = {
//       id: Date.now(), // Temporary ID
//       senderId: 0, // Replace with actual sender ID if available
//       content: message,
//       sender: {
//         id: 0,
//         name: "You", // Replace with actual sender name if available
//       },
//     };

//     // Optimistic update
//     setMessages((prev) => [...prev, tempMessage]);
//     scrollToBottom();
//     setMessage("");
//     setIsSending(true);

//     try {
//       await axios.post(
//         `http://localhost:5000/api/chat/send`,
//         {
//           receiverId,
//           content: tempMessage.content,
//         },
//         { withCredentials: true }
//       );
//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setTimeout(() => setIsSending(false), 1000); // Disable button for 1 second
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 flex flex-col">
//       <Header />
//       <div className="border-b bg-background/80 backdrop-blur-sm">
//         <div className="w-full lg:w-4/5 mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <button className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
//                 <ArrowLeft className="w-4 h-4 mr-2" />
//               </button>
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <img
//                     src={`https://api.dicebear.com/7.x/initials/svg?seed=${chatUser?.name || "U"}`}
//                     alt={chatUser?.name}
//                     className="w-10 h-10 rounded-full"
//                   />
//                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
//                 </div>
//                 <div>
//                   <h2 className="font-semibold">{chatUser?.name || "User"}</h2>
//                   <p className="text-xs text-muted-foreground">Active now</p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <button className="hover:bg-muted p-2 rounded-full">
//                 <Video className="w-4 h-4" />
//               </button>
//               <button className="hover:bg-muted p-2 rounded-full">
//                 <Phone className="w-4 h-4" />
//               </button>
//               <button className="hover:bg-muted p-2 rounded-full">
//                 <MoreVertical className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 overflow-hidden">
//         <div className="w-full lg:w-4/5 mx-auto px-4 h-full">
//           <div className="h-full overflow-y-auto py-4 space-y-4">
//             {messages.map((msg) => {
//               const isMe = msg.senderId !== chatUser?.id;
//               return (
//                 <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
//                   <div className={`flex gap-2 max-w-[70%] ${isMe ? "flex-row-reverse" : "flex-row"}`}>
//                     {!isMe && (
//                       <img
//                         src={`https://api.dicebear.com/7.x/initials/svg?seed=${msg.sender.name}`}
//                         alt={msg.sender.name}
//                         className="w-8 h-8 rounded-full mt-auto"
//                       />
//                     )}
//                     <div className="space-y-1 relative">
//                       <div
//                         className={`px-4 py-2 rounded-2xl ${
//                           isMe ? "bg-primary text-primary-foreground" : "bg-muted"
//                         }`}
//                       >
//                         <p className="text-sm">{msg.content}</p>
//                       </div>
//                       <p className={`text-xs text-muted-foreground ${isMe ? "text-right" : "text-left"}`}>
//                         {msg.sender.name}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//             <div ref={messagesEndRef} />
//           </div>
//         </div>
//       </div>

//       <div className="border-t bg-background/80 backdrop-blur-sm">
//         <div className="w-full lg:w-4/5 mx-auto px-2 py-4">
//           <div className="flex items-center gap-3">
//             <button className="hover:bg-muted p-2 rounded-full">
//               <Paperclip className="w-4 h-4" />
//             </button>
//             <button className="hover:bg-muted p-2 rounded-full">
//               <ImageIcon className="w-4 h-4" />
//             </button>
//             <button className="hover:bg-muted p-2 rounded-full">
//               <Mic className="w-4 h-4" />
//             </button>
//             <div className="flex-1 relative">
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 placeholder="Type a message..."
//                 className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring"
//               />
//               <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
//                 <Smile className="w-4 h-4" />
//               </button>
//             </div>
//             <button
//               onClick={sendMessage}
//               disabled={!message.trim() || isSending}
//               className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 disabled:opacity-50"
//             >
//               <Send className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
