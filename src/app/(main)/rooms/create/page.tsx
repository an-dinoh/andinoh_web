"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Bed,
  Users,
  DollarSign,
  Wifi,
  Tv,
  Coffee,
  Loader2,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Video,
  Sparkles,
} from "lucide-react";
import { hotelService } from "@/services/hotel.service";
import { RoomType, BedType } from "@/types/hotel.types";

interface RoomForm {
  room_number: string;
  room_type: RoomType;
  title: string;
  description: string;
  base_price: string;
  max_occupancy: number;
  bed_type: BedType;
  size_sqm: string;
  amenities: string[];
  images: string[];
  is_available: boolean;
}

export default function CreateRoomPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState<RoomForm>({
    room_number: "",
    room_type: "standard",
    title: "",
    description: "",
    base_price: "",
    max_occupancy: 2,
    bed_type: "queen",
    size_sqm: "",
    amenities: [],
    images: [],
    is_available: true,
  });

  const roomTypes = [
    { value: "standard", label: "Standard Room", icon: Bed },
    { value: "deluxe", label: "Deluxe Room", icon: Sparkles },
    { value: "suite", label: "Suite", icon: Sparkles },
    { value: "presidential", label: "Presidential Suite", icon: Sparkles },
  ];

  const bedTypes = [
    { value: "single", label: "Single Bed" },
    { value: "double", label: "Double Bed" },
    { value: "twin", label: "Twin Beds" },
    { value: "queen", label: "Queen Bed" },
    { value: "king", label: "King Bed" },
    { value: "sofa_bed", label: "Sofa Bed" },
  ];

  const availableAmenities = [
    { id: "wifi", label: "Free Wi-Fi", icon: Wifi },
    { id: "tv", label: "Smart TV", icon: Tv },
    { id: "coffee", label: "Coffee Maker", icon: Coffee },
    { id: "minibar", label: "Mini Bar", icon: Coffee },
    { id: "safe", label: "In-room Safe", icon: Bed },
    { id: "ac", label: "Air Conditioning", icon: Bed },
    { id: "balcony", label: "Private Balcony", icon: Bed },
    { id: "bathtub", label: "Bathtub", icon: Bed },
  ];

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!form.room_number.trim()) newErrors.room_number = "Room number is required";
    if (!form.title.trim()) newErrors.title = "Room title is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.base_price || parseFloat(form.base_price) <= 0)
      newErrors.base_price = "Valid price is required";
    if (!form.size_sqm || parseFloat(form.size_sqm) <= 0)
      newErrors.size_sqm = "Valid room size is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccessMessage("");

      await hotelService.createRoom({
        hotel: "", // Will be set by backend from authenticated user
        room_type: form.room_type,
        title: form.title,
        description: form.description,
        room_size: parseFloat(form.size_sqm),
        bed_type: form.bed_type,
        max_occupancy: form.max_occupancy,
        max_adults: form.max_occupancy,
        max_children: 0,
        base_price: form.base_price,
        total_rooms: 1,
      });

      setSuccessMessage("Room created successfully!");
      setTimeout(() => {
        router.push("/rooms");
      }, 1500);
    } catch (error: any) {
      setErrors({
        submit:
          error?.response?.data?.message ||
          "Failed to create room. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const updatedValue = name === 'room_type' ? value as RoomType : name === 'bed_type' ? value as BedType : value;
    setForm((prev) => ({ ...prev, [name]: updatedValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const toggleAmenity = (amenityId: string) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((a) => a !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  return (
    <div className="h-full bg-white overflow-y-auto scrollbar-hide pt-8 pb-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-[#FAFAFB] rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#5C5B59]" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#1A1A1A]">
                Add New Room
              </h1>
              <p className="text-[#5C5B59] mt-1">
                Create a new room for your hotel
              </p>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="p-4 bg-[#ECFDF5] border border-green-200 rounded-2xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-700" />
            <p className="text-sm font-semibold text-green-800">
              {successMessage}
            </p>
          </div>
        )}

        {errors.submit && (
          <div className="p-4 bg-[#FEE2E2] border border-red-200 rounded-2xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-700" />
            <p className="text-sm font-semibold text-red-800">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-6">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Room Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="room_number"
                  value={form.room_number}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent ${
                    errors.room_number ? "border-red-300" : "border-[#E5E7EB]"
                  }`}
                  placeholder="e.g., 101, 205, Suite 301"
                />
                {errors.room_number && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.room_number}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Room Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="room_type"
                  value={form.room_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent"
                >
                  {roomTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Room Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent ${
                    errors.title ? "border-red-300" : "border-[#E5E7EB]"
                  }`}
                  placeholder="e.g., Deluxe Ocean View Suite"
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-600">{errors.title}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent resize-none ${
                    errors.description ? "border-red-300" : "border-[#E5E7EB]"
                  }`}
                  placeholder="Describe the room features, views, and highlights..."
                />
                {errors.description && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Room Details */}
          <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-6">
              Room Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Base Price (₦) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C5B59]" />
                  <input
                    type="number"
                    name="base_price"
                    value={form.base_price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent ${
                      errors.base_price ? "border-red-300" : "border-[#E5E7EB]"
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.base_price && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.base_price}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Max Occupancy
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C5B59]" />
                  <input
                    type="number"
                    name="max_occupancy"
                    value={form.max_occupancy}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    className="w-full pl-10 pr-4 py-3 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Bed Type
                </label>
                <select
                  name="bed_type"
                  value={form.bed_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent"
                >
                  {bedTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Size (sq m) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="size_sqm"
                  value={form.size_sqm}
                  onChange={handleInputChange}
                  step="0.1"
                  min="0"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent ${
                    errors.size_sqm ? "border-red-300" : "border-[#E5E7EB]"
                  }`}
                  placeholder="e.g., 35.5"
                />
                {errors.size_sqm && (
                  <p className="mt-1 text-xs text-red-600">{errors.size_sqm}</p>
                )}
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-6">
              Room Amenities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {availableAmenities.map((amenity) => {
                const Icon = amenity.icon;
                const isSelected = form.amenities.includes(amenity.id);
                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "bg-[#0F75BD] border-[#0F75BD] text-white"
                        : "bg-white border-[#E5E7EB] text-[#1A1A1A] hover:border-[#0F75BD]"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">
                      {amenity.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability Status */}
          <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
              Availability
            </h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_available}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    is_available: e.target.checked,
                  }))
                }
                className="w-5 h-5 text-[#0F75BD] border-[#E5E7EB] rounded focus:ring-[#0F75BD]"
              />
              <div>
                <span className="text-sm font-semibold text-[#1A1A1A]">
                  Room is Available for Booking
                </span>
                <p className="text-xs text-[#5C5B59]">
                  Guests can book this room immediately
                </p>
              </div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-4 bg-white border-2 border-[#E5E7EB] text-[#1A1A1A] font-semibold rounded-xl hover:bg-[#FAFAFB] transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-[#0F75BD] text-white font-semibold rounded-xl hover:bg-[#0050C8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Room...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Room
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
