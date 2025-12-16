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
    <div className="h-full bg-white overflow-y-auto scrollbar-hide pt-8 pb-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Reports</h1>
            <p className="text-gray-500 text-sm">Download and analyze your hotel reports</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-[#D3D9DD] rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8E9397] focus:border-transparent appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA2TDggMTBMMTIgNiIgc3Ryb2tlPSIjOEY4RThEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat pr-10"
            >
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
            </select>
            <button className="px-5 py-3 bg-[#0F75BD] text-white font-semibold rounded-xl hover:bg-[#0050C8] transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export All
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {reportCategories.map((category) => {
              const Icon = category.icon;
              const isActive = reportType === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setReportType(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#0F75BD] text-white"
                      : "border border-[#D3D9DD] text-gray-800 hover:border-[#0F75BD]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                  <span className={`font-medium text-sm ${isActive ? "text-white" : ""}`}>
                    {category.label}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-[#D3D9DD]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Reports</p>
                <p className="text-2xl font-semibold text-gray-800">12</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#D3D9DD]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">This Month</p>
                <p className="text-2xl font-semibold text-gray-800">6</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#D3D9DD]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Downloaded</p>
                <p className="text-2xl font-semibold text-gray-800">8</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredReports.map((report, index) => {
            const Icon = report.icon;
            return (
              <div
                key={index}
                className="bg-white border border-[#D3D9DD] rounded-2xl p-6 transition-all hover:shadow-lg hover:border-[#0F75BD]"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${report.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${report.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1">{report.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
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
                <div className="mt-5 flex items-center gap-3">
                  <button className="flex-1 px-4 py-2.5 bg-[#0F75BD] text-white font-semibold rounded-xl hover:bg-[#0050C8] transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="px-4 py-2.5 bg-white border border-[#D3D9DD] text-gray-800 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <div className="bg-white border border-[#D3D9DD] rounded-2xl p-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Reports Found</h3>
            <p className="text-gray-500 text-sm">No reports available for this category</p>
          </div>
        )}

        {/* Generate Custom Report */}
        <div className="bg-gradient-to-br from-[#0F75BD] to-[#02A5E6] rounded-2xl p-8 text-white">
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
  );
}
