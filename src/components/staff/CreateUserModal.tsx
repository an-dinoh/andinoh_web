interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">Create New User</h2>
          <p className="text-sm text-gray-500 mt-1">Add a new user to your hotel</p>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-[#0B0A07] text-sm mb-1">First Name</label>
              <input
                type="text"
                placeholder="John"
                className="w-full rounded-xl border border-[#D3D9DD] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8E9397] focus:border-transparent placeholder:text-[#8F8E8D] placeholder:text-sm"
              />
            </div>
            <div>
              <label className="block text-[#0B0A07] text-sm mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full rounded-xl border border-[#D3D9DD] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8E9397] focus:border-transparent placeholder:text-[#8F8E8D] placeholder:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#0B0A07] text-sm mb-1">Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-xl border border-[#D3D9DD] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8E9397] focus:border-transparent placeholder:text-[#8F8E8D] placeholder:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-[#0B0A07] text-sm mb-1">Category</label>
              <select className="w-full rounded-xl border border-[#D3D9DD] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8E9397] focus:border-transparent appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA2TDggMTBMMTIgNiIgc3Ryb2tlPSIjOEY4RThEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==')] bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat pr-10">
                <option>Select category</option>
                <option>Hotel Manager</option>
                <option>Receptionist</option>
                <option>Housekeeping</option>
              </select>
            </div>
            <div>
              <label className="block text-[#0B0A07] text-sm mb-1">Location</label>
              <input
                type="text"
                placeholder="New York, USA"
                className="w-full rounded-xl border border-[#D3D9DD] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8E9397] focus:border-transparent placeholder:text-[#8F8E8D] placeholder:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#0B0A07] text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-[#D3D9DD] px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#8E9397] focus:border-transparent placeholder:text-[#8F8E8D] placeholder:text-sm"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl flex items-center justify-end gap-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-[#D3D9DD] rounded-xl hover:bg-gray-50 text-gray-800 font-medium transition-colors"
          >
            Cancel
          </button>
          <button className="px-6 py-3 bg-[#0F75BD] hover:bg-[#0050C8] text-white rounded-xl font-semibold transition-colors">
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}
