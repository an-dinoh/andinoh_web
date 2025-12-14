"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  User,
  Mail,
  Phone,
  Users,
  Bed,
  DollarSign,
  CreditCard,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  Plus,
} from "lucide-react";
import { hotelService } from "@/services/hotel.service";
import { Room, BookingSource } from "@/types/hotel.types";

interface BookingForm {
  room_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  check_in_date: string;
  check_out_date: string;
  number_of_adults: number;
  number_of_children: number;
  booking_source: BookingSource;
  special_requests?: string;
  total_amount: string;
  amount_paid: string;
}

export default function CreateBookingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState<BookingForm>({
    room_id: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    check_in_date: "",
    check_out_date: "",
    number_of_adults: 1,
    number_of_children: 0,
    booking_source: "walk_in",
    special_requests: "",
    total_amount: "0",
    amount_paid: "0",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (form.room_id && form.check_in_date && form.check_out_date) {
      const room = rooms.find((r) => r.id === form.room_id);
      if (room && room.price_per_night) {
        const nights = calculateNights(form.check_in_date, form.check_out_date);
        const total = parseFloat(room.price_per_night) * nights;
        setForm((prev) => ({ ...prev, total_amount: total.toFixed(2) }));
      } else if (room) {
        const nights = calculateNights(form.check_in_date, form.check_out_date);
        const total = parseFloat(room.base_price) * nights;
        setForm((prev) => ({ ...prev, total_amount: total.toFixed(2) }));
      }
    }
  }, [form.room_id, form.check_in_date, form.check_out_date, rooms]);

  const fetchRooms = async () => {
    try {
      const data = await hotelService.getRooms();
      const roomsArray = Array.isArray(data) ? data : [];
      setRooms(roomsArray.filter((r) => r.is_available));
      setAvailableRooms(roomsArray.filter((r) => r.is_available));
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]);
      setAvailableRooms([]);
    }
  };

  const calculateNights = (checkIn: string, checkOut: string): number => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!form.customer_name.trim()) newErrors.customer_name = "Customer name is required";
    if (!form.customer_email.trim()) newErrors.customer_email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customer_email))
      newErrors.customer_email = "Invalid email format";
    if (!form.customer_phone.trim()) newErrors.customer_phone = "Phone number is required";
    if (!form.room_id) newErrors.room_id = "Please select a room";
    if (!form.check_in_date) newErrors.check_in_date = "Check-in date is required";
    if (!form.check_out_date) newErrors.check_out_date = "Check-out date is required";

    const checkIn = new Date(form.check_in_date);
    const checkOut = new Date(form.check_out_date);
    if (checkOut <= checkIn) {
      newErrors.check_out_date = "Check-out must be after check-in";
    }

    if (form.number_of_adults < 1) newErrors.number_of_adults = "At least 1 adult required";

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

      const nights = calculateNights(form.check_in_date, form.check_out_date);

      await hotelService.createBooking({
        room: form.room_id,
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone,
        check_in_date: form.check_in_date,
        check_out_date: form.check_out_date,
        number_of_adults: form.number_of_adults,
        number_of_children: form.number_of_children,
        booking_source: form.booking_source,
        special_requests: form.special_requests,
        amount_paid: form.amount_paid,
        number_of_nights: nights,
        balance_due: (parseFloat(form.total_amount) - parseFloat(form.amount_paid)).toFixed(2),
      });

      setSuccessMessage("Booking created successfully!");
      setTimeout(() => {
        router.push("/bookings");
      }, 1500);
    } catch (error: any) {
      console.error("Error creating booking:", error);
      setErrors({
        submit: error?.response?.data?.message || "Failed to create booking. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const nights = form.check_in_date && form.check_out_date
    ? calculateNights(form.check_in_date, form.check_out_date)
    : 0;

  const balanceDue = parseFloat(form.total_amount) - parseFloat(form.amount_paid);

  return (
    <div className="h-full bg-white overflow-y-auto scrollbar-hide pt-8 pb-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-[#FAFAFB] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#5C5B59]" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-[#1A1A1A]">Create New Booking</h1>
              <p className="text-[#5C5B59] mt-1">Fill in the booking details</p>
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">{successMessage}</p>
          </div>
        )}

        {errors.submit && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm font-medium text-red-800">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest Information */}
          <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Guest Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="customer_name"
                  value={form.customer_name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent ${
                    errors.customer_name ? "border-red-300" : "border-[#E5E7EB]"
                  }`}
                  placeholder="John Doe"
                />
                {errors.customer_name && (
                  <p className="mt-1 text-xs text-red-600">{errors.customer_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="customer_email"
                  value={form.customer_email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent ${
                    errors.customer_email ? "border-red-300" : "border-[#E5E7EB]"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.customer_email && (
                  <p className="mt-1 text-xs text-red-600">{errors.customer_email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="customer_phone"
                  value={form.customer_phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent ${
                    errors.customer_phone ? "border-red-300" : "border-[#E5E7EB]"
                  }`}
                  placeholder="+234 123 456 7890"
                />
                {errors.customer_phone && (
                  <p className="mt-1 text-xs text-red-600">{errors.customer_phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Booking Source
                </label>
                <select
                  name="booking_source"
                  value={form.booking_source}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent"
                >
                  <option value="walk_in">Walk-in</option>
                  <option value="online">Online</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stay Details */}
          <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Stay Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Check-in Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="check_in_date"
                  value={form.check_in_date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent ${
                    errors.check_in_date ? "border-red-300" : "border-[#E5E7EB]"
                  }`}
                />
                {errors.check_in_date && (
                  <p className="mt-1 text-xs text-red-600">{errors.check_in_date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Check-out Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="check_out_date"
                  value={form.check_out_date}
                  onChange={handleInputChange}
                  min={form.check_in_date || new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent ${
                    errors.check_out_date ? "border-red-300" : "border-[#E5E7EB]"
                  }`}
                />
                {errors.check_out_date && (
                  <p className="mt-1 text-xs text-red-600">{errors.check_out_date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Adults <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="number_of_adults"
                  value={form.number_of_adults}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent ${
                    errors.number_of_adults ? "border-red-300" : "border-[#E5E7EB]"
                  }`}
                />
                {errors.number_of_adults && (
                  <p className="mt-1 text-xs text-red-600">{errors.number_of_adults}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Children
                </label>
                <input
                  type="number"
                  name="number_of_children"
                  value={form.number_of_children}
                  onChange={handleInputChange}
                  min="0"
                  max="10"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent"
                />
              </div>

              {nights > 0 && (
                <div className="md:col-span-2">
                  <div className="p-4 bg-[#0F75BD]/10 border border-[#0F75BD]/20 rounded-xl">
                    <p className="text-sm font-medium text-[#0F75BD]">
                      Total Stay: {nights} {nights === 1 ? "night" : "nights"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Room Selection */}
          <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Room Selection</h2>
            <div>
              <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                Select Room <span className="text-red-500">*</span>
              </label>
              <select
                name="room_id"
                value={form.room_id}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent ${
                  errors.room_id ? "border-red-300" : "border-[#E5E7EB]"
                }`}
              >
                <option value="">Select a room</option>
                {availableRooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.room_number} - {room.room_type} - ₦{room.price_per_night || room.base_price}/night
                  </option>
                ))}
              </select>
              {errors.room_id && <p className="mt-1 text-xs text-red-600">{errors.room_id}</p>}
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Payment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Total Amount
                </label>
                <input
                  type="number"
                  name="total_amount"
                  value={form.total_amount}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 bg-white/50 border border-[#E5E7EB] rounded-xl"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
                  Amount Paid
                </label>
                <input
                  type="number"
                  name="amount_paid"
                  value={form.amount_paid}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  max={form.total_amount}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent"
                />
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#5C5B59]">Total Amount:</span>
                <span className="text-lg font-bold text-[#1A1A1A]">₦{parseFloat(form.total_amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#5C5B59]">Amount Paid:</span>
                <span className="text-lg font-semibold text-green-600">₦{parseFloat(form.amount_paid).toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-[#E5E7EB] flex justify-between">
                <span className="text-sm font-medium text-[#1A1A1A]">Balance Due:</span>
                <span className={`text-lg font-bold ${balanceDue > 0 ? "text-orange-600" : "text-green-600"}`}>
                  ₦{balanceDue.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-[#1A1A1A] mb-4">Special Requests (Optional)</h2>
            <textarea
              name="special_requests"
              value={form.special_requests}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent resize-none"
              placeholder="Enter any special requests or notes..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 bg-white border border-[#E5E7EB] text-[#1A1A1A] font-medium rounded-xl hover:bg-[#FAFAFB] transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-[#0F75BD] text-white font-medium rounded-xl hover:bg-[#0050C8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Booking...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Booking
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
