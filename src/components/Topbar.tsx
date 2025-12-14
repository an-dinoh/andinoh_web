"use client";

import Image from "next/image";
import { Search, ChevronDown, Bell, Calendar, CheckCircle, AlertCircle, User, DollarSign, Clock, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import NotificationIcon from "@/icons/NotificationIcon";

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "booking",
      title: "New Booking Received",
      message: "John Doe booked a Deluxe Suite for 3 nights",
      time: "5 minutes ago",
      read: false,
      icon: Calendar,
      iconBg: "bg-[#F0F9FF]",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      type: "payment",
      title: "Payment Confirmed",
      message: "₦150,000 received from Sarah Johnson",
      time: "1 hour ago",
      read: false,
      icon: DollarSign,
      iconBg: "bg-[#ECFDF5]",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      type: "checkin",
      title: "Guest Checked In",
      message: "Michael Brown checked into Room 204",
      time: "2 hours ago",
      read: true,
      icon: CheckCircle,
      iconBg: "bg-[#F5F3FF]",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      type: "alert",
      title: "Maintenance Alert",
      message: "Room 305 requires maintenance attention",
      time: "3 hours ago",
      read: true,
      icon: AlertCircle,
      iconBg: "bg-[#FEF3C7]",
      iconColor: "text-orange-600",
    },
    {
      id: 5,
      type: "user",
      title: "New Staff Member",
      message: "Emily Davis added as Receptionist",
      time: "5 hours ago",
      read: true,
      icon: User,
      iconBg: "bg-[#FEE2E2]",
      iconColor: "text-red-600",
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-20 bg-white border-b border-[#E5E7EB] px-8 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C5B59]" />
          <input
            type="text"
            placeholder="Search bookings, rooms, guests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 h-11 border border-[#E5E7EB] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent text-[#1A1A1A] placeholder:text-[#5C5B59]"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-6">
        {/* Verified badge */}
        <div className="flex items-center justify-center border border-[#117C35] rounded-2xl h-10 px-4 bg-[#E7F2EB]">
          <span className="text-[#117C35] text-sm font-semibold">Verified</span>
        </div>

        {/* Notification Icon */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-11 h-11 flex items-center justify-center hover:bg-[#FAFAFB] rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5 text-[#5C5B59]" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-5 h-5 bg-[#0F75BD] text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-96 bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden z-50" style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)' }}>
              {/* Header */}
              <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#FAFAFB]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-[#1A1A1A]">Notifications</h3>
                    <p className="text-xs text-[#5C5B59] mt-0.5">{unreadCount} unread notifications</p>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-[#5C5B59]" />
                  </button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto scrollbar-hide">
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div
                      key={notification.id}
                      className={`px-6 py-4 border-b border-[#E5E7EB] hover:bg-[#FAFAFB] transition-colors cursor-pointer ${
                        !notification.read ? "bg-[#F0F9FF]" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 ${notification.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${notification.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-sm text-[#1A1A1A]">{notification.title}</h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-[#0F75BD] rounded-full flex-shrink-0 mt-1.5"></div>
                            )}
                          </div>
                          <p className="text-xs text-[#5C5B59] mt-1">{notification.message}</p>
                          <div className="flex items-center gap-1 mt-2 text-xs text-[#5C5B59]">
                            <Clock className="w-3 h-3" />
                            <span>{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-[#FAFAFB] border-t border-[#E5E7EB]">
                <button className="w-full text-center text-sm font-semibold text-[#0F75BD] hover:text-[#0050C8] transition-colors">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <button className="flex items-center gap-3 hover:bg-[#FAFAFB] rounded-xl transition-colors h-11 px-3">
          <div className="w-9 h-9 bg-[#0F75BD] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">AP</span>
          </div>
          <span className="text-sm font-semibold text-[#1A1A1A]">Adeyanju</span>
          <ChevronDown className="w-4 h-4 text-[#5C5B59]" />
        </button>
      </div>
    </div>
  );
}
