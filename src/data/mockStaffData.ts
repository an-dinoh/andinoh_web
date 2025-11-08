import { User, Admin, Role } from "@/types/staff.types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    category: "Hotel Manager",
    status: "active",
    location: "New York, USA",
    dateAdded: "Jan 15, 2024",
    lastLogin: "2 hours ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    category: "Receptionist",
    status: "active",
    location: "Los Angeles, USA",
    dateAdded: "Jan 20, 2024",
    lastLogin: "5 hours ago",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    category: "Housekeeping",
    status: "inactive",
    location: "Chicago, USA",
    dateAdded: "Feb 1, 2024",
    lastLogin: "2 days ago",
  },
];

export const mockAdmins: Admin[] = [
  {
    id: "1",
    name: "Sarah Williams",
    email: "sarah@example.com",
    status: "active",
    role: "Super Admin",
    dateJoined: "Dec 1, 2023",
  },
  {
    id: "2",
    name: "Tom Brown",
    email: "tom@example.com",
    status: "active",
    role: "Admin",
    dateJoined: "Jan 10, 2024",
  },
];

export const mockRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full system access with all permissions",
    usersCount: 2,
    permissions: ["all"],
  },
  {
    id: "2",
    name: "Hotel Manager",
    description: "Manage hotel operations and staff",
    usersCount: 5,
    permissions: ["manage_rooms", "manage_bookings", "view_reports"],
  },
  {
    id: "3",
    name: "Receptionist",
    description: "Handle guest check-ins and bookings",
    usersCount: 8,
    permissions: ["manage_bookings", "view_rooms"],
  },
];

export const mockStats = {
  totalUsers: 156,
  activeUsers: 142,
  inactiveUsers: 12,
  deletedUsers: 2,
};
