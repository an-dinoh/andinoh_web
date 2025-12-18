import { useState } from "react";
import { Search, MoreVertical, ChevronDown, Edit, Trash2, UserX, Shield, Key } from "lucide-react";
import { Admin } from "@/types/staff.types";

interface AdminsTableProps {
  admins: Admin[];
}

export default function AdminsTable({ admins }: AdminsTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleAction = (action: string, adminId: string, adminName: string) => {
    setOpenMenuId(null);
    switch (action) {
      case "edit":
        alert(`Edit admin: ${adminName}`);
        break;
      case "permissions":
        alert(`Manage permissions for: ${adminName}`);
        break;
      case "reset-password":
        alert(`Reset password for: ${adminName}`);
        break;
      case "deactivate":
        alert(`Deactivate admin: ${adminName}`);
        break;
      case "delete":
        if (confirm(`Are you sure you want to delete ${adminName}?`)) {
          alert(`Admin ${adminName} deleted`);
        }
        break;
    }
  };

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
            <tr className="bg-[#FAFAFB] border-b border-[#E5E7EB]">
              <th className="text-left py-4 px-4">
                <input type="checkbox" className="rounded border-[#E5E7EB] text-[#0F75BD] focus:ring-[#0F75BD]" />
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-[#5C5B59] uppercase">Name</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-[#5C5B59] uppercase">Email</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-[#5C5B59] uppercase">Status</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-[#5C5B59] uppercase">Role</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-[#5C5B59] uppercase">Date Joined</th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-[#5C5B59] uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-[#FAFAFB] transition-colors">
                <td className="py-4 px-4">
                  <input type="checkbox" className="rounded border-[#E5E7EB] text-[#0F75BD] focus:ring-[#0F75BD]" />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {admin.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-[#1A1A1A]">{admin.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-[#5C5B59]">{admin.email}</td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-green-700">
                    {admin.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {admin.role}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-[#5C5B59]">{admin.dateJoined}</td>
                <td className="py-4 px-4">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === admin.id ? null : admin.id)}
                      className="p-2 hover:bg-[#FAFAFB] rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-[#5C5B59]" />
                    </button>

                    {openMenuId === admin.id && (
                      <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-[#D3D9DD] rounded-xl shadow-lg z-10 py-2">
                        <button
                          onClick={() => handleAction("edit", admin.id, admin.name)}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#FAFAFB] transition-colors flex items-center gap-3 text-[#1A1A1A]"
                        >
                          <Edit className="w-4 h-4 text-[#0F75BD]" />
                          Edit Admin
                        </button>
                        <button
                          onClick={() => handleAction("permissions", admin.id, admin.name)}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#FAFAFB] transition-colors flex items-center gap-3 text-[#1A1A1A]"
                        >
                          <Shield className="w-4 h-4 text-purple-600" />
                          Manage Permissions
                        </button>
                        <button
                          onClick={() => handleAction("reset-password", admin.id, admin.name)}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#FAFAFB] transition-colors flex items-center gap-3 text-[#1A1A1A]"
                        >
                          <Key className="w-4 h-4 text-blue-600" />
                          Reset Password
                        </button>
                        <button
                          onClick={() => handleAction("deactivate", admin.id, admin.name)}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#FAFAFB] transition-colors flex items-center gap-3 text-orange-600"
                        >
                          <UserX className="w-4 h-4" />
                          Deactivate Admin
                        </button>
                        <div className="border-t border-[#E5E7EB] my-1"></div>
                        <button
                          onClick={() => handleAction("delete", admin.id, admin.name)}
                          className="w-full px-4 py-2.5 text-left text-sm hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Admin
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button className="p-2 hover:bg-[#FAFAFB] rounded-lg transition-colors">
          <ChevronDown className="w-5 h-5 rotate-90 text-[#5C5B59] text-xs" />
        </button>
        <button className="px-2 py-1 bg-[#0F75BD] text-white rounded-lg font-medium">
          1
        </button>
        <button className="px-2 py-1 hover:bg-[#FAFAFB] text-[#1A1A1A] rounded-lg font-regular transition-colors">
          2
        </button>
        <button className="px-2 py-1 hover:bg-[#FAFAFB] text-[#1A1A1A] rounded-lg font-regular transition-colors">
          3
        </button>
        <span className="px-2 text-[#5C5B59]">...</span>
        <button className="px-2 py-1 hover:bg-[#FAFAFB] text-[#1A1A1A] rounded-lg font-regular transition-colors">
          10
        </button>
        <button className="p-2.5 hover:bg-[#FAFAFB] rounded-lg transition-colors">
          <ChevronDown className="w-5 h-5 -rotate-90 text-[#5C5B59]" />
        </button>
      </div>
    </div>
  );
}
