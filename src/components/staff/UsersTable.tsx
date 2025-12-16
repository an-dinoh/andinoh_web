import { Search, MoreVertical } from "lucide-react";
import { User } from "@/types/staff.types";

interface UsersTableProps {
  users: User[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedUsers: string[];
  onToggleUser: (userId: string) => void;
  onToggleAll: () => void;
}

export default function UsersTable({
  users,
  searchTerm,
  onSearchChange,
  selectedUsers,
  onToggleUser,
  onToggleAll,
}: UsersTableProps) {
  return (
    <div className="p-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8F8E8D]" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-[#D3D9DD] rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8E9397] focus:border-transparent placeholder:text-[#8F8E8D] placeholder:text-sm"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select className="px-4 py-2 border border-[#D3D9DD] rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8E9397] focus:border-transparent appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA2TDggMTBMMTIgNiIgc3Ryb2tlPSIjOEY4RThEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat pr-10">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#FAFAFB] border-b border-[#E5E7EB]">
              <th className="text-left py-4 px-4">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length}
                  onChange={onToggleAll}
                  className="rounded border-[#E5E7EB] text-[#0F75BD] focus:ring-[#0F75BD]"
                />
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-[#5C5B59] uppercase">Name</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-[#5C5B59] uppercase">Email</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-[#5C5B59] uppercase">Role</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-[#5C5B59] uppercase">Status</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-[#5C5B59] uppercase">Date Added</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-[#5C5B59] uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-[#FAFAFB] transition-colors">
                <td className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => onToggleUser(user.id)}
                    className="rounded border-[#E5E7EB] text-[#0F75BD] focus:ring-[#0F75BD]"
                  />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0F75BD] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-[#1A1A1A]">{user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-[#5C5B59]">{user.email}</td>
                <td className="py-4 px-4 text-sm text-[#5C5B59]">{user.category}</td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === "active"
                        ? "bg-[#ECFDF5] text-green-700"
                        : "bg-[#FEF3C7] text-yellow-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-[#5C5B59]">{user.dateAdded}</td>
                <td className="py-4 px-4">
                  <button className="p-2 hover:bg-[#FAFAFB] rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-[#5C5B59]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
        <p className="text-sm text-[#5C5B59]">
          Showing 1-{users.length} of {users.length} users
        </p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-[#E5E7EB] rounded-xl hover:bg-[#FAFAFB] text-sm font-medium text-[#1A1A1A]">
            Previous
          </button>
          <button className="px-4 py-2 bg-[#0F75BD] text-white rounded-xl text-sm font-medium">
            1
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
            2
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
            3
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
