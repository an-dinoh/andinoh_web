"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { TabType } from "@/types/staff.types";
import { mockUsers, mockAdmins, mockRoles, mockStats } from "@/data/mockStaffData";
import StatsCard from "@/components/staff/StatsCard";
import UsersTable from "@/components/staff/UsersTable";
import AdminsTable from "@/components/staff/AdminsTable";
import RolesList from "@/components/staff/RolesList";
import CreateUserModal from "@/components/staff/CreateUserModal";
import CreateAdminModal from "@/components/staff/CreateAdminModal";

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === mockUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(mockUsers.map((u) => u.id));
    }
  };

  const handleCreateClick = () => {
    if (activeTab === "users") {
      setShowCreateUserModal(true);
    } else if (activeTab === "admins") {
      setShowCreateAdminModal(true);
    } else {
      window.location.href = "/staff/roles/create";
    }
  };

  const getButtonText = () => {
    switch (activeTab) {
      case "users":
        return "Create New User";
      case "admins":
        return "Create New Admin";
      case "roles":
        return "Create New Role";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your hotel staff and permissions</p>
          </div>
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            {getButtonText()}
          </button>
        </div>
      </div>

      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatsCard title="Total Users" value={mockStats.totalUsers} color="gray" />
          <StatsCard title="Active Users" value={mockStats.activeUsers} color="green" />
          <StatsCard title="Inactive Users" value={mockStats.inactiveUsers} color="orange" />
          <StatsCard title="Deleted Users" value={mockStats.deletedUsers} color="red" />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("users")}
                className={`px-8 py-4 font-medium transition-colors relative ${
                  activeTab === "users"
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab("admins")}
                className={`px-8 py-4 font-medium transition-colors relative ${
                  activeTab === "admins"
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Admins
              </button>
              <button
                onClick={() => setActiveTab("roles")}
                className={`px-8 py-4 font-medium transition-colors relative ${
                  activeTab === "roles"
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Roles and Permissions
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "users" && (
            <UsersTable
              users={mockUsers}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedUsers={selectedUsers}
              onToggleUser={toggleUserSelection}
              onToggleAll={toggleSelectAll}
            />
          )}

          {activeTab === "admins" && <AdminsTable admins={mockAdmins} />}

          {activeTab === "roles" && <RolesList roles={mockRoles} />}
        </div>
      </div>

      {/* Modals */}
      <CreateUserModal isOpen={showCreateUserModal} onClose={() => setShowCreateUserModal(false)} />
      <CreateAdminModal isOpen={showCreateAdminModal} onClose={() => setShowCreateAdminModal(false)} />
    </div>
  );
}
