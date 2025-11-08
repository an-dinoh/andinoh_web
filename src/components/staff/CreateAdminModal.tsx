interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateAdminModal({ isOpen, onClose }: CreateAdminModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">Create New Admin</h2>
          <p className="text-sm text-gray-500 mt-1">Add a new administrator</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                placeholder="Sarah"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Williams"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="sarah@example.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
              <option>Select role</option>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>Moderator</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl flex items-center justify-end gap-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
            Create Admin
          </button>
        </div>
      </div>
    </div>
  );
}
