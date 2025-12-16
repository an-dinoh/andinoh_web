"use client";

import { useState } from "react";
import { Send, Search, User, Phone, MoreVertical, Paperclip, Smile } from "lucide-react";

interface Chat {
  id: string;
  guestName: string;
  roomNumber: string;
  lastMessage: string;
  time: string;
  unread?: number;
  status: "active" | "checked-out";
}

interface Message {
  id: string;
  text: string;
  time: string;
  isGuest: boolean;
}

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState<string>("1");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const chats: Chat[] = [
    {
      id: "1",
      guestName: "John Doe",
      roomNumber: "101",
      lastMessage: "Thank you! The room service was excellent.",
      time: "Just Now",
      unread: 2,
      status: "active",
    },
    {
      id: "2",
      guestName: "Jane Smith",
      roomNumber: "205",
      lastMessage: "Can I get extra towels please?",
      time: "5 mins ago",
      unread: 1,
      status: "active",
    },
    {
      id: "3",
      guestName: "Mike Johnson",
      roomNumber: "312",
      lastMessage: "What time is breakfast served?",
      time: "15 mins ago",
      status: "active",
    },
    {
      id: "4",
      guestName: "Sarah Williams",
      roomNumber: "108",
      lastMessage: "The Wi-Fi password isn't working",
      time: "1 hour ago",
      status: "active",
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      text: "Hi! I just checked in. The room is lovely, thank you!",
      time: "2:30 PM",
      isGuest: true,
    },
    {
      id: "2",
      text: "Welcome to our hotel! We're delighted to have you. If you need anything, please don't hesitate to ask.",
      time: "2:32 PM",
      isGuest: false,
    },
    {
      id: "3",
      text: "Thank you! Could you send someone to help with the TV remote? It's not working.",
      time: "2:35 PM",
      isGuest: true,
    },
    {
      id: "4",
      text: "Of course! I'll send someone from our technical team right away. They should be there in 5 minutes.",
      time: "2:36 PM",
      isGuest: false,
    },
    {
      id: "5",
      text: "Perfect, thank you so much!",
      time: "2:37 PM",
      isGuest: true,
    },
    {
      id: "6",
      text: "Thank you! The room service was excellent.",
      time: "3:15 PM",
      isGuest: true,
    },
  ];

  const currentChat = chats.find((c) => c.id === selectedChat);
  const filteredChats = chats.filter((chat) =>
    chat.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.roomNumber.includes(searchTerm)
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("");
    }
  };

  return (
    <div className="h-full bg-white flex overflow-hidden">
      {/* Chats List Sidebar */}
      <div className="w-full sm:w-80 lg:w-96 border-r border-[#E5E7EB] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <h1 className="text-2xl font-bold text-[#1A1A1A] mb-4">Messages</h1>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8F8E8D]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search guests or rooms..."
              className="w-full pl-10 pr-3 py-2 border border-[#D3D9DD] rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8E9397] focus:border-transparent placeholder:text-[#8F8E8D] placeholder:text-sm"
            />
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 border-b border-[#E5E7EB] hover:bg-[#FAFAFB] transition-colors text-left ${
                selectedChat === chat.id ? "bg-[#E8F4F8]" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0F75BD] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-lg">
                    {chat.guestName.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[#1A1A1A] text-sm truncate">
                      {chat.guestName}
                    </h3>
                    <span className="text-xs text-[#5C5B59] flex-shrink-0 ml-2">
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-[#5C5B59]">Room {chat.roomNumber}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      chat.status === "active"
                        ? "bg-[#ECFDF5] text-green-700"
                        : "bg-[#F5F5F5] text-[#5C5B59]"
                    }`}>
                      {chat.status === "active" ? "Active" : "Checked Out"}
                    </span>
                  </div>
                  <p className="text-sm text-[#5C5B59] truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread && (
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0F75BD] text-white text-xs flex items-center justify-center font-semibold">
                    {chat.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#0F75BD] flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {currentChat.guestName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold text-[#1A1A1A]">{currentChat.guestName}</h2>
                  <p className="text-sm text-[#5C5B59]">Room {currentChat.roomNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#FAFAFB] rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-[#5C5B59]" />
                </button>
                <button className="p-2 hover:bg-[#FAFAFB] rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-[#5C5B59]" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-6 space-y-4 bg-[#FAFAFB]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isGuest ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      msg.isGuest
                        ? "bg-white text-[#1A1A1A]"
                        : "bg-[#0F75BD] text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.isGuest ? "text-[#5C5B59]" : "text-white/70"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-[#E5E7EB] bg-white">
              <div className="flex items-end gap-3">
                <button className="p-2 hover:bg-[#FAFAFB] rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-[#5C5B59]" />
                </button>
                <div className="flex-1 border border-[#D3D9DD] rounded-xl p-3 focus-within:ring-1 focus-within:ring-[#8E9397] focus-within:border-transparent">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full resize-none focus:outline-none text-sm max-h-32 text-gray-800 placeholder:text-[#8F8E8D]"
                    rows={1}
                  />
                </div>
                <button className="p-2 hover:bg-[#FAFAFB] rounded-lg transition-colors">
                  <Smile className="w-5 h-5 text-[#5C5B59]" />
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-[#0F75BD] hover:bg-[#0050C8] rounded-xl transition-colors"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#FAFAFB]">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#E8F4F8] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-[#0F75BD]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
                No chat selected
              </h3>
              <p className="text-[#5C5B59]">
                Select a guest conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
