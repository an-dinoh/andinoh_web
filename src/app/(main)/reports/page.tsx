"use client";

import { useState } from "react";
import { Download, Calendar, TrendingUp, DollarSign, Users, FileText, BarChart3, PieChart, Filter } from "lucide-react";

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [reportType, setReportType] = useState("all");

  const reportCategories = [
    { id: "all", label: "All Reports", icon: FileText, count: 12 },
    { id: "revenue", label: "Revenue", icon: DollarSign, count: 4 },
    { id: "bookings", label: "Bookings", icon: Calendar, count: 3 },
    { id: "occupancy", label: "Occupancy", icon: Users, count: 3 },
    { id: "performance", label: "Performance", icon: TrendingUp, count: 2 },
  ];

  const availableReports = [
    {
      title: "Monthly Revenue Report",
      description: "Detailed breakdown of revenue by source and room type",
      category: "revenue",
      date: "December 2025",
      size: "2.4 MB",
      icon: DollarSign,
      bg: "bg-[#ECFDF5]",
      iconColor: "text-green-600",
    },
    {
      title: "Booking Analytics",
      description: "Guest booking patterns and trends analysis",
      category: "bookings",
      date: "December 2025",
      size: "1.8 MB",
      icon: Calendar,
      bg: "bg-[#F0F9FF]",
      iconColor: "text-blue-600",
    },
    {
      title: "Occupancy Rate Report",
      description: "Room occupancy statistics and forecasts",
      category: "occupancy",
      date: "December 2025",
      size: "1.2 MB",
      icon: Users,
      bg: "bg-[#F5F3FF]",
      iconColor: "text-purple-600",
    },
    {
      title: "Performance Dashboard",
      description: "Overall hotel performance metrics and KPIs",
      category: "performance",
      date: "Q4 2025",
      size: "3.1 MB",
      icon: TrendingUp,
      bg: "bg-[#FEF3C7]",
      iconColor: "text-orange-600",
    },
    {
      title: "Revenue Breakdown",
      description: "Income sources and expense analysis",
      category: "revenue",
      date: "November 2025",
      size: "2.1 MB",
      icon: PieChart,
      bg: "bg-[#ECFDF5]",
      iconColor: "text-green-600",
    },
    {
      title: "Guest Demographics",
      description: "Guest profile and demographic insights",
      category: "bookings",
      date: "December 2025",
      size: "1.5 MB",
      icon: Users,
      bg: "bg-[#F0F9FF]",
      iconColor: "text-blue-600",
    },
  ];

  const filteredReports = reportType === "all"
    ? availableReports
    : availableReports.filter(r => r.category === reportType);

  return (
    <div className="h-full bg-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] bg-white px-8 py-6 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">Reports</h1>
            <p className="text-[#5C5B59] mt-1">Download and analyze your hotel reports</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2.5 border border-[#E5E7EB] rounded-xl text-[#1A1A1A] focus:ring-2 focus:ring-[#0F75BD] focus:border-transparent"
            >
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
            </select>
            <button className="px-5 py-2.5 bg-[#0F75BD] text-white font-medium rounded-xl hover:bg-[#0050C8] transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export All
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 border-r border-[#E5E7EB] bg-[#FAFAFB] p-6 overflow-y-auto scrollbar-hide">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-[#5C5B59] uppercase tracking-wider mb-4">
              Report Categories
            </h3>
            {reportCategories.map((category) => {
              const Icon = category.icon;
              const isActive = reportType === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setReportType(category.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#0F75BD] text-white"
                      : "text-[#5C5B59] hover:bg-white hover:text-[#0F75BD]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
                    <span className={`font-medium ${isActive ? "text-white" : "text-[#1A1A1A]"}`}>
                      {category.label}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      isActive ? "bg-white/20 text-white" : "bg-[#E5E7EB] text-[#5C5B59]"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <h3 className="font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#0F75BD]" />
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#5C5B59]">Total Reports</span>
                <span className="font-semibold text-[#1A1A1A]">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#5C5B59]">This Month</span>
                <span className="font-semibold text-[#1A1A1A]">6</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#5C5B59]">Downloaded</span>
                <span className="font-semibold text-[#1A1A1A]">8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-8">
          <div className="max-w-6xl">
            {/* Report Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReports.map((report, index) => {
                const Icon = report.icon;
                return (
                  <div
                    key={index}
                    className="bg-[#FAFAFB] border border-[#E5E7EB] rounded-2xl p-6 transition-all hover:border-[#0F75BD]"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${report.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${report.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#1A1A1A] mb-1">{report.title}</h3>
                        <p className="text-sm text-[#5C5B59] mb-3">{report.description}</p>
                        <div className="flex items-center gap-4 text-xs text-[#5C5B59]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {report.date}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            {report.size}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center gap-3">
                      <button className="flex-1 px-4 py-2.5 bg-[#0F75BD] text-white font-medium rounded-lg hover:bg-[#0050C8] transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      <button className="px-4 py-2.5 bg-white border border-[#E5E7EB] text-[#1A1A1A] font-medium rounded-lg hover:bg-[#FAFAFB] transition-colors">
                        View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredReports.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-20 h-20 bg-[#E5E7EB] rounded-2xl flex items-center justify-center mb-4">
                  <FileText className="w-10 h-10 text-[#5C5B59]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">No Reports Found</h3>
                <p className="text-[#5C5B59] text-sm">No reports available for this category</p>
              </div>
            )}

            {/* Generate Custom Report */}
            <div className="mt-8 bg-gradient-to-br from-[#0F75BD] to-[#02A5E6] rounded-2xl p-8 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Generate Custom Report</h3>
                  <p className="text-white/90 mb-6">
                    Create a custom report with specific metrics and date ranges tailored to your needs
                  </p>
                  <button className="px-6 py-3 bg-white text-[#0F75BD] font-semibold rounded-xl hover:bg-white/90 transition-colors flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Create Custom Report
                  </button>
                </div>
                <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center">
                  <FileText className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
