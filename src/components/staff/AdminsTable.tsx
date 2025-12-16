import { Search, MoreVertical } from "lucide-react";
import { Admin } from "@/types/staff.types";

interface AdminsTableProps {
  admins: Admin[];
}

export default function AdminsTable({ admins }: AdminsTableProps) {
  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8F8E8D]" />
          <input
            type="text"
            placeholder="Search admins..."
            className="w-full pl-10 pr-3 py-2 border border-[#D3D9DD] rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8E9397] focus:border-transparent placeholder:text-[#8F8E8D] placeholder:text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Name</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Email</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Role</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Date Joined</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {admin.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">{admin.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{admin.email}</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    {admin.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {admin.role}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{admin.dateJoined}</td>
                <td className="py-4 px-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600">
          Showing 1-{admins.length} of {admins.length} admins
        </p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
            Previous
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium">
            1
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
