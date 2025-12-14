"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Filter, Edit, Trash2, Eye, ChevronDown, Bookmark, MapPin, Star, Bed, Users, Maximize2, Sparkles } from "lucide-react";
import Loading from "@/components/ui/Loading";
import { Room, RoomType } from "@/types/hotel.types";

export default function RoomsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<RoomType | "all">("all");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortBy, setSortBy] = useState("newly_added");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    fetchRooms();
  }, [filterType]);

  const fetchRooms = async () => {
    try {
      setLoading(true);

      // Mock data for UI development
      const mockRooms: Room[] = [
        {
          id: "1",
          title: "Deluxe Ocean View",
          description: "Spacious room with stunning ocean views, king-size bed, and modern amenities. Perfect for couples seeking luxury and comfort.",
          room_type: "deluxe",
          bed_type: "king",
          room_size: 450,
          max_occupancy: 2,
          max_adults: 2,
          max_children: 0,
          base_price: "500",
          is_available: true,
          has_balcony: true,
          has_sea_view: true,
          has_city_view: false,
          total_rooms: 5,
          hotel: "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Presidential Suite",
          description: "Ultimate luxury suite with panoramic views, separate living area, and premium amenities for the discerning traveler.",
          room_type: "presidential",
          bed_type: "king",
          room_size: 800,
          max_occupancy: 4,
          max_adults: 3,
          max_children: 1,
          base_price: "1200",
          is_available: true,
          has_balcony: true,
          has_sea_view: true,
          has_city_view: true,
          total_rooms: 2,
          hotel: "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Standard Room",
          description: "Comfortable and affordable accommodation perfect for business or leisure travelers. Features modern amenities and cozy atmosphere.",
          room_type: "standard",
          bed_type: "queen",
          room_size: 300,
          max_occupancy: 2,
          max_adults: 2,
          max_children: 0,
          base_price: "200",
          is_available: false,
          has_balcony: false,
          has_sea_view: false,
          has_city_view: true,
          total_rooms: 10,
          hotel: "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      setRooms(mockRooms);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || room.room_type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading size="lg" text="Loading rooms..." />
      </div>
    );
  }

  if (selectedRoom) {
    const roomIndex = rooms.findIndex(r => r.id === selectedRoom.id);
    const roomNumber = `10${roomIndex + 1}`;

    return (
      <div className="h-full bg-white overflow-y-auto scrollbar-hide pt-8 pb-8">
        <div className="space-y-6">
          {/* Back Button */}
          <button
            onClick={() => setSelectedRoom(null)}
            className="flex items-center gap-2 text-[#0F75BD] hover:text-[#0050C8] font-medium"
          >
            <ChevronDown className="w-5 h-5 rotate-90" />
            Back to Rooms
          </button>

          {/* Room Hero Section */}
          <div className="bg-gradient-to-br from-[#0F75BD] to-[#02A5E6] rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-6xl">🏨</span>
                    <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl">
                      <span className="text-2xl font-bold text-white">Room {roomNumber}</span>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-3">{selectedRoom.title}</h1>
                  <p className="text-white/90 text-lg max-w-3xl">{selectedRoom.description}</p>
                </div>
                <div className={`px-4 py-2 rounded-xl font-bold ${
                  selectedRoom.is_available
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}>
                  {selectedRoom.is_available ? "Available" : "Occupied"}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-xl">
                  <Sparkles className="w-4 h-4" />
                  {selectedRoom.room_type.toUpperCase()}
                </span>
                <div className="text-white">
                  <span className="text-3xl font-bold">₦{selectedRoom.base_price}</span>
                  <span className="text-white/80 ml-2">/night</span>
                </div>
              </div>
            </div>
          </div>

          {/* Room Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Info */}
            <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-6">
              <h3 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <Bed className="w-5 h-5 text-[#0F75BD]" />
                Room Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#5C5B59] text-sm">Bed Type</span>
                  <span className="font-semibold text-[#1A1A1A] capitalize">{selectedRoom.bed_type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5C5B59] text-sm">Room Size</span>
                  <span className="font-semibold text-[#1A1A1A]">{selectedRoom.room_size} ft²</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5C5B59] text-sm">Max Occupancy</span>
                  <span className="font-semibold text-[#1A1A1A]">{selectedRoom.max_occupancy} guests</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5C5B59] text-sm">Max Adults</span>
                  <span className="font-semibold text-[#1A1A1A]">{selectedRoom.max_adults}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5C5B59] text-sm">Max Children</span>
                  <span className="font-semibold text-[#1A1A1A]">{selectedRoom.max_children}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-6">
              <h3 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0F75BD]" />
                Features & Amenities
              </h3>
              <div className="space-y-2">
                {selectedRoom.has_sea_view && (
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-700">Sea View</span>
                  </div>
                )}
                {selectedRoom.has_city_view && (
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-purple-700">City View</span>
                  </div>
                )}
                {selectedRoom.has_balcony && (
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-700">Private Balcony</span>
                  </div>
                )}
                <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium text-orange-700">Free WiFi</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-pink-50 rounded-lg">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-sm font-medium text-pink-700">Air Conditioning</span>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-6">
              <h3 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#0F75BD]" />
                Availability
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#5C5B59] text-sm">Total Rooms</span>
                  <span className="font-semibold text-[#1A1A1A]">{selectedRoom.total_rooms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#5C5B59] text-sm">Status</span>
                  <span className={`font-semibold ${selectedRoom.is_available ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedRoom.is_available ? "Available Now" : "Currently Occupied"}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full py-3 bg-[#0F75BD] text-white font-semibold rounded-xl hover:bg-[#0050C8] transition-colors">
                  Book Now
                </button>
                <button className="w-full py-3 bg-white border-2 border-[#E5E7EB] text-[#1A1A1A] font-semibold rounded-xl hover:border-[#0F75BD] transition-colors">
                  Edit Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white overflow-y-auto scrollbar-hide pt-8 pb-8">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">Rooms</h1>
            <p className="text-[#5C5B59] mt-1">Manage your hotel rooms and availability</p>
          </div>
          <button
            onClick={() => router.push("/rooms/create")}
            className="px-4 py-2.5 bg-[#0F75BD] text-sm text-white font-regular rounded-2xl hover:bg-[#0050C8] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Room
          </button>
        </div>

        {/* Search & Filters Bar */}
        <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C5B59]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search rooms by name or description..."
                className="w-full pl-12 pr-4 py-3 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent text-[#1A1A1A] placeholder:text-[#5C5B59]"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-5 py-3 border border-[#E5E7EB] rounded-xl hover:bg-[#FAFAFB] transition-colors"
              >
                <Filter className="w-5 h-5 text-[#5C5B59]" />
                <span className="text-sm font-medium text-[#1A1A1A]">Sort By</span>
                <ChevronDown className="w-4 h-4 text-[#5C5B59]" />
              </button>

              {showSortDropdown && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-[#E5E7EB] rounded-xl z-10 py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-[#5C5B59] uppercase">
                    Sort Options
                  </div>
                  {[
                    { value: "newly_added", label: "Newly Added" },
                    { value: "price_high_low", label: "Price: High - Low" },
                    { value: "price_low_high", label: "Price: Low - High" },
                    { value: "available_now", label: "Available Now" },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center px-4 py-2.5 hover:bg-[#FAFAFB] cursor-pointer">
                      <input
                        type="radio"
                        name="sort"
                        checked={sortBy === option.value}
                        onChange={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className="mr-3 text-[#0F75BD] focus:ring-[#0F75BD]"
                      />
                      <span className="text-sm text-[#1A1A1A]">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

        {/* Room Type Filters */}
        <div>
          <h3 className="text-sm font-semibold text-[#1A1A1A] mb-4">Filter by Room Type</h3>
            <div className="flex gap-3 flex-wrap overflow-x-auto scrollbar-hide pb-2">
              {[
                { value: "all", label: "All Rooms" },
                { value: "standard", label: "Standard" },
                { value: "deluxe", label: "Deluxe" },
                { value: "suite", label: "Suite" },
                { value: "presidential", label: "Presidential" },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFilterType(type.value as RoomType | "all")}
                  className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                    filterType === type.value
                      ? "bg-[#0F75BD] text-white"
                      : "bg-[#F5F5F5] text-[#1A1A1A] hover:bg-[#E5E7EB]"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Rooms", value: rooms.length, bg: "bg-[#F5F5F5]" },
              { label: "Available", value: rooms.filter(r => r.is_available).length, bg: "bg-[#F0F9FF]" },
              { label: "Occupied", value: rooms.filter(r => !r.is_available).length, bg: "bg-[#FEF3C7]" },
              { label: "Average Rate", value: `₦${Math.round(rooms.reduce((sum, r) => sum + parseInt(r.base_price), 0) / rooms.length)}`, bg: "bg-[#F5F3FF]" },
            ].map((stat, index) => (
              <div key={index} className={`${stat.bg} rounded-2xl p-5`}>
                <p className="text-[#5C5B59] text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</p>
              </div>
            ))}
        </div>

        {/* Rooms Grid */}
        {filteredRooms.length === 0 ? (
            <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-16 text-center">
              <div className="w-20 h-20 bg-[#E8F4F8] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-[#0F75BD]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">No rooms found</h3>
              <p className="text-[#5C5B59] mb-6">Start by adding your first room to the system</p>
              <button
                onClick={() => router.push("/rooms/create")}
                className="px-6 py-3 bg-[#0F75BD] text-white font-medium rounded-xl hover:bg-[#0050C8] transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Your First Room
              </button>
            </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room, index) => {
                  const roomNumber = `10${index + 1}`;

                  return (
                  <div
                    key={room.id}
                    className="bg-white rounded-[22px] overflow-hidden border border-[#E5E7EB] hover:border-[#0F75BD] transition-all group"
                  >
                    {/* Room Image */}
                    <div className="relative h-40 bg-[#E8F4F8] flex items-center justify-center overflow-hidden">
                      <span className="text-6xl">🏨</span>

                      {/* Room Number */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <span className="text-sm font-bold text-[#0F75BD]">{roomNumber}</span>
                      </div>

                      {/* Room Type Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-[#0F75BD] text-xs font-medium rounded-lg">
                          <Sparkles className="w-3 h-3" />
                          {room.room_type.toUpperCase()}
                        </span>
                      </div>

                      {/* Availability Badge */}
                      <div className="absolute bottom-3 right-3">
                        <span
                          className={`px-2.5 py-1 text-xs font-medium rounded-lg backdrop-blur-sm ${
                            room.is_available
                              ? "bg-green-500/90 text-white"
                              : "bg-red-500/90 text-white"
                          }`}
                        >
                          {room.is_available ? "Available" : "Occupied"}
                        </span>
                      </div>
                    </div>

                    {/* Room Content */}
                    <div className="p-5">
                      {/* Room Title */}
                      <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#0F75BD] transition-colors">
                        {room.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[#5C5B59] mb-3 line-clamp-2">
                        {room.description}
                      </p>

                      {/* Room Details */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="flex flex-col items-center p-2 bg-[#FAFAFB] rounded-lg">
                          <Bed className="w-4 h-4 text-[#0F75BD] mb-1" />
                          <span className="text-xs font-semibold text-[#1A1A1A] capitalize">{room.bed_type}</span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-[#FAFAFB] rounded-lg">
                          <Users className="w-4 h-4 text-[#0F75BD] mb-1" />
                          <span className="text-xs font-semibold text-[#1A1A1A]">{room.max_occupancy}</span>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-[#FAFAFB] rounded-lg">
                          <Maximize2 className="w-4 h-4 text-[#0F75BD] mb-1" />
                          <span className="text-xs font-semibold text-[#1A1A1A]">{room.room_size} ft²</span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-[#E5E7EB] my-3"></div>

                      {/* Price & Actions */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-[#5C5B59] mb-0.5">Starting from</p>
                          <p className="text-xl font-bold text-[#0F75BD]">
                            ₦{room.base_price}
                            <span className="text-xs font-normal text-[#5C5B59]">/night</span>
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedRoom(room)}
                          className="px-4 py-2 bg-[#0F75BD] text-white text-sm font-medium rounded-xl hover:bg-[#0050C8] transition-colors flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                  );
                })}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 m-8">
                <button className="p-2 hover:bg-[#FAFAFB] rounded-lg transition-colors">
                  <ChevronDown className="w-5 h-5 rotate-90 text-[#5C5B59] text-xs" />
                </button>
                <button className="px-2 py-1 bg-[#0F75BD] text-white rounded-lg font-medium">
                  1
                </button>
                <button className="px-2 py-1 hover:bg-[#FAFAFB] text-[#1A1A1A] rounded-lg font-regular transition-colors">
                  2
                </button>
                <button className="px-2 py-1 hover:bg-[#FAFAFB] text-[#1A1A1A] rounded-lg font-regular transition-colors">
                  3
                </button>
                <span className="px-2 text-[#5C5B59]">...</span>
                <button className="px-2 py-1 hover:bg-[#FAFAFB] text-[#1A1A1A] rounded-lg font-regular transition-colors">
                  10
                </button>
                <button className="p-2.5 hover:bg-[#FAFAFB] rounded-lg transition-colors">
                  <ChevronDown className="w-5 h-5 -rotate-90 text-[#5C5B59]" />
                </button>
            </div>

            {/* Showing count */}
            <div className="text-center text-sm text-[#5C5B59] m-8">
              Showing <span className="font-semibold text-[#1A1A1A]">1-{Math.min(10, filteredRooms.length)}</span> of <span className="font-semibold text-[#1A1A1A]">{filteredRooms.length}</span> rooms
            </div>
          </>
        )}
      </div>
    </div>
  );
}
