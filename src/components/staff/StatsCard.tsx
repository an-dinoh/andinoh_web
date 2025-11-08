interface StatsCardProps {
  title: string;
  value: number;
  color: "gray" | "green" | "orange" | "red";
}

const colorClasses = {
  gray: "text-gray-900",
  green: "text-green-600",
  orange: "text-orange-600",
  red: "text-red-600",
};

export default function StatsCard({ title, value, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <p className="text-sm text-gray-600 mb-2">{title}</p>
      <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
    </div>
  );
}
