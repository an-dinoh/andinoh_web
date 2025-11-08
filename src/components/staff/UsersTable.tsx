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
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <select className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
            <option>Category</option>
            <option>Hotel Manager</option>
            <option>Receptionist</option>
            <option>Housekeeping</option>
          </select>
          <select className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
            <option>Location</option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chicago</option>
          </select>
          <select className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
            <option>Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length}
                  onChange={onToggleAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Name</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Email</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Category</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Location</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Date Added</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Last Login</th>
              <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => onToggleUser(user.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{user.email}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{user.category}</td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{user.location}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{user.dateAdded}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{user.lastLogin}</td>
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
          Showing 1-{users.length} of {users.length} users
        </p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
            Previous
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium">
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
