# Staff Management Components

This directory contains reusable components for the staff management system.

## Components

### StatsCard.tsx
Reusable statistics card component displaying a title, value, and color-coded styling.

**Props:**
- `title`: string - The label for the stat
- `value`: number - The numeric value to display
- `color`: "gray" | "green" | "orange" | "red" - Color theme

**Usage:**
```tsx
<StatsCard title="Total Users" value={156} color="gray" />
```

### UsersTable.tsx
Table component displaying user list with search, filters, checkboxes, and pagination.

**Props:**
- `users`: User[] - Array of user objects
- `searchTerm`: string - Current search value
- `onSearchChange`: (value: string) => void - Search handler
- `selectedUsers`: string[] - Array of selected user IDs
- `onToggleUser`: (userId: string) => void - Single selection handler
- `onToggleAll`: () => void - Select all handler

### AdminsTable.tsx
Table component displaying admin list with search and pagination.

**Props:**
- `admins`: Admin[] - Array of admin objects

### RolesList.tsx
Grid component displaying roles with permissions and action buttons.

**Props:**
- `roles`: Role[] - Array of role objects

### CreateUserModal.tsx
Modal dialog for creating a new user.

**Props:**
- `isOpen`: boolean - Controls modal visibility
- `onClose`: () => void - Close handler

### CreateAdminModal.tsx
Modal dialog for creating a new admin.

**Props:**
- `isOpen`: boolean - Controls modal visibility
- `onClose`: () => void - Close handler

## Types

All type definitions are located in `/src/types/staff.types.ts`:
- `TabType` - Union type for tab selection
- `User` - User object interface
- `Admin` - Admin object interface
- `Role` - Role object interface

## Mock Data

Mock data for development is located in `/src/data/mockStaffData.ts`:
- `mockUsers` - Sample user data
- `mockAdmins` - Sample admin data
- `mockRoles` - Sample role data
- `mockStats` - Sample statistics

## File Structure

```
src/
├── app/(main)/staff/
│   └── page.tsx (Main page - 144 lines)
├── components/staff/
│   ├── StatsCard.tsx (17 lines)
│   ├── UsersTable.tsx (133 lines)
│   ├── AdminsTable.tsx (96 lines)
│   ├── RolesList.tsx (68 lines)
│   ├── CreateUserModal.tsx (85 lines)
│   └── CreateAdminModal.tsx (76 lines)
├── types/
│   └── staff.types.ts (28 lines)
└── data/
    └── mockStaffData.ts (88 lines)
```

## Benefits of This Structure

1. **Reusability** - Components can be used in other parts of the application
2. **Maintainability** - Each component has a single responsibility
3. **Testability** - Smaller components are easier to test
4. **Readability** - Main page is clean and easy to understand
5. **Scalability** - Easy to add new features without bloating files
