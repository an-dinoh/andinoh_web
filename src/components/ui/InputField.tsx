interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
}

export default function InputField({
  label,
  type = "text",
  placeholder,
}: InputFieldProps) {
  return (
    <div>
      <label className="block text-gray-700 text-sm mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
       className="w-full border border-green-500 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
     />
    </div>
  );
}
