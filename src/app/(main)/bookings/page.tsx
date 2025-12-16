"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Filter,
  Calendar as CalendarIcon,
  Download,
  Users,
  LogIn,
  LogOut,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  User,
  Mail,
  Phone,
  Bed,
  MapPin,
  ChevronDown,
} from "lucide-react";
import Loading from "@/components/ui/Loading";
import { Skeleton, SkeletonCard, SkeletonTable } from "@/components/ui/Skeleton";
import { hotelService } from "@/services/hotel.service";
import { Booking, BookingStatus, PaymentStatus, BookingSource } from "@/types/hotel.types";

export default function BookingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<BookingSource | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      // Mock data for UI development
      setBookings([]);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Get today's bookings
  const today = new Date().toISOString().split("T")[0];
  const arrivalsToday = bookings.filter((b) => b.check_in_date === today);
  const departuresToday = bookings.filter((b) => b.check_out_date === today);
  const totalBookingsToday = bookings.filter(
    (b) => b.check_in_date === today || b.check_out_date === today
  );

  // Calculate occupancy (mock calculation - adjust based on actual logic)
  const occupancyRate = bookings.filter((b) => b.booking_status === "checked_in").length;

  const getStatusConfig = (status: BookingStatus) => {
    const configs = {
      pending: {
        color: "bg-amber-100 text-amber-700 border-amber-200",
        icon: Clock,
        label: "Pending",
      },
      confirmed: {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: CheckCircle,
        label: "Confirmed",
      },
      checked_in: {
        color: "bg-emerald-100 text-emerald-700 border-emerald-200",
        icon: LogIn,
        label: "Checked In",
      },
      checked_out: {
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: LogOut,
        label: "Checked Out",
      },
      cancelled: {
        color: "bg-red-100 text-red-700 border-red-200",
        icon: XCircle,
        label: "Cancelled",
      },
      no_show: {
        color: "bg-orange-100 text-orange-700 border-orange-200",
        icon: XCircle,
        label: "No Show",
      },
    };
    return configs[status];
  };

  const getPaymentConfig = (status: PaymentStatus) => {
    const configs = {
      paid: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Paid" },
      partial: { color: "bg-amber-100 text-amber-700 border-amber-200", label: "Partial" },
      pending: { color: "bg-orange-100 text-orange-700 border-orange-200", label: "Pending" },
      refunded: { color: "bg-gray-100 text-gray-700 border-gray-200", label: "Refunded" },
    };
    return configs[status];
  };

  const getSourceBadge = (source: BookingSource) => {
    const sources = {
      online: { color: "bg-blue-50 text-blue-700", label: "Online" },
      walk_in: { color: "bg-purple-50 text-purple-700", label: "Walk-in" },
      phone: { color: "bg-green-50 text-green-700", label: "Phone" },
      email: { color: "bg-pink-50 text-pink-700", label: "Email" },
    };
    return sources[source];
  };

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.booking_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer_phone?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || booking.booking_status === statusFilter;
    const matchesPayment = paymentFilter === "all" || booking.payment_status === paymentFilter;
    const matchesSource = sourceFilter === "all" || booking.booking_source === sourceFilter;

    return matchesSearch && matchesStatus && matchesPayment && matchesSource;
  });

  return (
    <div className="h-full bg-white overflow-y-auto scrollbar-hide pt-8 pb-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">Bookings</h1>
            <p className="text-[#5C5B59] mt-1">Manage your hotel bookings and reservations</p>
          </div>
          <button
            onClick={() => router.push("/bookings/create")}
            className="px-4 py-2.5 bg-[#0F75BD] text-sm text-white font-regular rounded-2xl hover:bg-[#0050C8] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Booking
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Bookings", value: bookings.length, bg: "bg-[#F5F5F5]" },
            { label: "Check-ins Today", value: arrivalsToday.length, bg: "bg-[#F0F9FF]" },
            { label: "Check-outs Today", value: departuresToday.length, bg: "bg-[#FEF3C7]" },
            { label: "Active", value: occupancyRate, bg: "bg-[#F5F3FF]" },
          ].map((stat, index) => (
            <div key={index} className={`${stat.bg} rounded-2xl p-5`}>
              <p className="text-[#5C5B59] text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search & Filters Bar */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8F8E8D]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search bookings by name, email, or reference..."
              className="w-full pl-10 pr-3 py-2 border border-[#D3D9DD] rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8E9397] focus:border-transparent placeholder:text-[#8F8E8D] placeholder:text-sm"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as BookingStatus | "all")}
            className="px-4 py-2 border border-[#D3D9DD] rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8E9397] focus:border-transparent appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA2TDggMTBMMTIgNiIgc3Ryb2tlPSIjOEY4RThEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat pr-10"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked_in">Checked In</option>
            <option value="checked_out">Checked Out</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-3xl p-16 text-center">
            <div className="w-16 h-16 bg-[#0F75BD]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-[#0F75BD]" />
            </div>
            <h3 className="text-base font-semibold text-[#1A1A1A] mb-2">No bookings found</h3>
            <p className="text-[#5C5B59] text-sm mb-6">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Start by adding your first booking"}
            </p>
            <button
              onClick={() => router.push("/bookings/create")}
              className="px-4 py-2.5 bg-[#0F75BD] text-sm text-white font-regular rounded-2xl hover:bg-[#0050C8] transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Booking
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FAFAFB] border-b border-[#E5E7EB]">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#5C5B59] uppercase">
                      Guest
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#5C5B59] uppercase">
                      Check-in
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#5C5B59] uppercase">
                      Check-out
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#5C5B59] uppercase">
                      Nights
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#5C5B59] uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#5C5B59] uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#5C5B59] uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBookings.map((booking) => {
                    const statusConfig = getStatusConfig(booking.booking_status);
                    const paymentConfig = getPaymentConfig(booking.payment_status);
                    const sourceConfig = getSourceBadge(booking.booking_source);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <tr
                        key={booking.id}
                        className="hover:bg-[#FAFAFB] transition-colors cursor-pointer"
                        onClick={() => router.push(`/bookings/${booking.id}`)}
                      >
                        {/* Guest */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#0F75BD] rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {booking.customer_name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#1A1A1A]">{booking.customer_name}</p>
                              <p className="text-xs text-[#5C5B59]">{booking.customer_email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Check-in */}
                        <td className="px-6 py-4">
                          <p className="text-sm text-[#1A1A1A]">
                            {new Date(booking.check_in_date).toLocaleDateString()}
                          </p>
                        </td>

                        {/* Check-out */}
                        <td className="px-6 py-4">
                          <p className="text-sm text-[#1A1A1A]">
                            {new Date(booking.check_out_date).toLocaleDateString()}
                          </p>
                        </td>

                        {/* Nights */}
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-[#1A1A1A]">{booking.number_of_nights}</p>
                        </td>

                        {/* Amount */}
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-[#1A1A1A]">
                            ₦{parseFloat(booking.total_amount).toFixed(2)}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.color}`}
                          >
                            {statusConfig.label}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/bookings/${booking.id}`);
                            }}
                            className="px-3 py-1.5 text-sm font-medium text-[#0F75BD] hover:bg-[#0F75BD]/10 rounded-lg transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
