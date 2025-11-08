export type TabType = "users" | "admins" | "roles";

export interface User {
  id: string;
  name: string;
  email: string;
  category: string;
  status: "active" | "inactive";
  location: string;
  dateAdded: string;
  lastLogin: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  role: string;
  dateJoined: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  permissions: string[];
}
