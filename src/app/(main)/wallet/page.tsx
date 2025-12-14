"use client";

import { useState } from "react";
import { ChevronDown, Plus, Download, TrendingUp, TrendingDown, Calendar, DollarSign } from "lucide-react";

export default function WalletPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  // Mock transaction data
  const transactions = [
    { id: "TXN-001", type: "Payment Received", guest: "John Doe", amount: 45000, date: "Dec 14, 2025", status: "Completed" },
    { id: "TXN-002", type: "Payment Received", guest: "Jane Smith", amount: 32000, date: "Dec 13, 2025", status: "Completed" },
    { id: "TXN-003", type: "Refund", guest: "Mike Johnson", amount: -15000, date: "Dec 12, 2025", status: "Completed" },
    { id: "TXN-004", type: "Payment Received", guest: "Sarah Williams", amount: 58000, date: "Dec 11, 2025", status: "Pending" },
    { id: "TXN-005", type: "Payment Received", guest: "David Brown", amount: 41000, date: "Dec 10, 2025", status: "Completed" },
  ];

  const totalRevenue = 450000;
  const totalPayouts = 120000;
  const pendingPayments = 28000;

  return (
    <div className="h-full bg-white overflow-y-auto scrollbar-hide pt-8 pb-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">Wallet</h1>
            <p className="text-[#5C5B59] mt-1">Manage your hotel finances and transactions</p>
          </div>
          <button className="px-4 py-2.5 bg-[#0F75BD] text-sm text-white font-regular rounded-2xl hover:bg-[#0050C8] transition-colors flex items-center gap-2 w-fit">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#F5F5F5] rounded-2xl p-5">
            <p className="text-[#5C5B59] text-sm mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">₦{totalRevenue.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-600">+12.5%</span>
            </div>
          </div>

          <div className="bg-[#F0F9FF] rounded-2xl p-5">
            <p className="text-[#5C5B59] text-sm mb-1">Total Payouts</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">₦{totalPayouts.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingDown className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-medium text-orange-600">-8.3%</span>
            </div>
          </div>

          <div className="bg-[#FEF3C7] rounded-2xl p-5">
            <p className="text-[#5C5B59] text-sm mb-1">Pending</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">₦{pendingPayments.toLocaleString()}</p>
            <p className="text-xs text-[#5C5B59] mt-2">2 transactions</p>
          </div>

          <div className="bg-[#F5F3FF] rounded-2xl p-5">
            <p className="text-[#5C5B59] text-sm mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-[#1A1A1A]">₦{(totalRevenue - totalPayouts).toLocaleString()}</p>
            <button className="text-xs font-medium text-[#0F75BD] mt-2 hover:underline">Withdraw</button>
          </div>
        </div>

        {/* Filter and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative">
            <button
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
              className="flex items-center gap-2 px-5 py-3 border border-[#E5E7EB] rounded-xl hover:bg-[#FAFAFB] transition-colors"
            >
              <Calendar className="w-5 h-5 text-[#5C5B59]" />
              <span className="text-sm font-medium text-[#1A1A1A]">{selectedPeriod}</span>
              <ChevronDown className="w-4 h-4 text-[#5C5B59]" />
            </button>

            {showPeriodDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-xl z-10 py-2">
                {["Today", "This Week", "This Month", "This Year", "Custom Range"].map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setShowPeriodDropdown(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#FAFAFB] transition-colors ${
                      selectedPeriod === period ? "text-[#0F75BD] font-semibold bg-[#E8F4F8]" : "text-[#1A1A1A]"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FAFAFB] border-b border-[#E5E7EB]">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#5C5B59] uppercase">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#5C5B59] uppercase">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#5C5B59] uppercase">
                    Guest
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#5C5B59] uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#5C5B59] uppercase">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#5C5B59] uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-[#FAFAFB] transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[#1A1A1A]">{transaction.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#5C5B59]">{transaction.type}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[#1A1A1A]">{transaction.guest}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className={`text-sm font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                        {transaction.amount > 0 ? "+" : ""}₦{Math.abs(transaction.amount).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#5C5B59]">{transaction.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          transaction.status === "Completed"
                            ? "bg-[#ECFDF5] text-green-700"
                            : transaction.status === "Pending"
                            ? "bg-[#FEF3C7] text-yellow-700"
                            : "bg-[#FEE2E2] text-red-700"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
