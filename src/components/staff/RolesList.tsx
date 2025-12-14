import { Search, Edit2, Eye, Trash2 } from "lucide-react";
import { Role } from "@/types/staff.types";

interface RolesListProps {
  roles: Role[];
}

export default function RolesList({ roles }: RolesListProps) {
  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search roles..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Roles Grid */}
      <div className="space-y-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="border border-gray-200 rounded-xl p-6 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  <span className="text-sm text-gray-500">
                    {role.usersCount} {role.usersCount === 1 ? "user" : "users"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {permission.replace("_", " ")}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit2 className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Eye className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
