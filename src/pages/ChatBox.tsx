// ChatBox.tsx
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast";


const socket = io('http://localhost:5000', { withCredentials: true }); // Ensure correct backend URL

interface Message {
  id: number;
  senderId: number;
  content: string;
  sender: {
    id: number;
    name: string;
  };
  createdAt?: string;
}

const ChatBox: React.FC = () => {
  const [searchParams] = useSearchParams();
  const chatId = Number(searchParams.get('chatId'));
  const receiverId = Number(searchParams.get('receiverId'));
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [chatUser, setChatUser] = useState<{ id: number; name: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch messages on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/chats/${chatId}/messages`, { withCredentials: true });
        setMessages(res.data.messages);
        setChatUser(res.data.chatUser);
        console.log(res, "chatUser")
        scrollToBottom();
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  // Join socket room and listen to new messages
useEffect(() => {
  if (chatId) {
    socket.emit('joinRoom', `chat_${chatId}`);

    socket.on('newMessage', (newMsg: Message) => {
      setMessages((prev) => [...prev, newMsg]);

      toast({
        title: newMsg.sender.name,
        description: newMsg.content,
      });

      scrollToBottom();
    });

    return () => {
      socket.off('newMessage');
      socket.emit('leaveRoom', `chat_${chatId}`);
    };
  }
}, [chatId]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/chat/send`,
        {
          receiverId,
          content: message,
        },
        { withCredentials: true }
      );
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-50">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Chat with {chatUser?.name || 'User'}</h2>
      <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 my-2 max-w-xs rounded-lg ${
              msg.senderId === chatUser?.id ? 'bg-gray-200 text-left' : 'bg-blue-500 text-white self-end text-right ml-auto'
            }`}
          >
            <p className="text-sm">{msg.content}</p>
            <p className="text-[10px] opacity-70 mt-1">{msg.sender.name}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
