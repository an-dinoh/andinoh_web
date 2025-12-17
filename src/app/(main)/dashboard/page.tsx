"use client";

import { useEffect, useState } from "react";

// Import dashboard components
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import BookingsOverviewCard from "@/components/dashboard/BookingsOverviewCard";
import RevenueOverviewCard from "@/components/dashboard/RevenueOverviewCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import ActivitiesSection from "@/components/dashboard/ActivitiesSection";
import PerformanceCard from "@/components/dashboard/PerformanceCard";
import ReviewsCard from "@/components/dashboard/ReviewsCard";

export default function DashboardPage() {
  // Chart data - replace with real data later
  const [revenueData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [gigsData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [completionPercentage] = useState(0);
  const [averageRating] = useState(0);

  const [stats] = useState({
    todayCheckIns: 0,
    todayCheckOuts: 0,
    totalBookingsToday: 0,
    occupancyRate: 0,
    revenueToday: "0",
    revenueThisWeek: "0",
    pendingBookings: 0,
    confirmedBookings: 0,
  });

  useEffect(() => {
    // Component mounted
  }, []);

  // Prepare data for components
  const welcomeActionCards = [
    {
      title: "Manage Bookings",
      description: "View and update current reservations.",
      buttonText: "View Bookings",
      bgColor: "bg-[#E7F2EB]",
      borderColor: "border-[#117C35]",
      textColor: "text-[#117C35]",
      hoverBgColor: "hover:bg-[#117C35]",
    },
    {
      title: "Manage Event Spaces",
      description: "Add or update available venues for bookings.",
      buttonText: "View Spaces",
      bgColor: "bg-[#E6EFF6]",
      borderColor: "border-[#065CA8]",
      textColor: "text-[#065CA8]",
      hoverBgColor: "hover:bg-[#065CA8]",
    },
  ];

  const bookingStats = [
    {
      label: "Confirmed",
      count: stats.confirmedBookings,
      color: "text-green-600",
      bgColor: "bg-[#E7F2EB]",
    },
    {
      label: "Checked In",
      count: stats.todayCheckIns,
      color: "text-orange-600",
      bgColor: "bg-[#FFF4DF]",
    },
    {
      label: "Pending",
      count: stats.pendingBookings,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
  ];

  const revenueItems = [
    {
      label: "Today's Revenue",
      amount: stats.revenueToday,
    },
    {
      label: "This Month",
      amount: stats.revenueThisWeek,
    },
  ];

  const activityTabs = [
    { id: "gigs" as const, label: "Active Bookings", count: 0 },
    { id: "saved" as const, label: "Recent Guests", count: 0 },
    { id: "posts" as const, label: "Upcoming", count: 0 },
  ];

  return (
    <div className="h-full bg-white flex flex-row gap-6">
      {/* Main Content Section */}
      <div className="bg-white space-y-6 flex-2 overflow-y-auto scrollbar-hide pt-8 pb-8">
        <WelcomeHeader
          userName="Adeyanju"
          actionCards={welcomeActionCards}
        />

        <div className="bg-white flex flex-row gap-6">
          <BookingsOverviewCard
            totalBookings={0}
            stats={bookingStats}
          />

          <RevenueOverviewCard
            totalRevenue="0"
            items={revenueItems}
          />
        </div>

        <AnalyticsChart
          revenueData={revenueData}
          gigsData={gigsData}
        />

        <ActivitiesSection
          tabs={activityTabs}
        />
      </div>

      {/* Performance & Reviews Section */}
      <div className="hidden lg:block space-y-6 overflow-y-auto scrollbar-hide pt-8 pb-8 w-80 xl:w-96">
        <PerformanceCard
          userName="Kelo Kello"
          userBadge="Top 100% Clients"
          averageRating={averageRating}
          completionPercentage={completionPercentage}
          points={0}
          approvedGigs={0}
        />

        <ReviewsCard />
      </div>
    </div>
  );
}
