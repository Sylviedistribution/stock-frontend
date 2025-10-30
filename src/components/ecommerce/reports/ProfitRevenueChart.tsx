import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CalendarDays } from "lucide-react";

const data = [
  { month: "Sep", revenue: 20000, profit: 15000 },
  { month: "Oct", revenue: 30000, profit: 18000 },
  { month: "Nov", revenue: 40000, profit: 22000 },
  { month: "Dec", revenue: 35000, profit: 20000 },
  { month: "Jan", revenue: 50000, profit: 28000 },
  { month: "Feb", revenue: 45000, profit: 26000 },
];

const ProfitRevenueChart = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-gray-800">Profit & Revenue</h2>
        <button className="flex items-center text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1">
          <CalendarDays size={14} className="mr-1" /> Weekly
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="profit" stroke="#f59e0b" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitRevenueChart;
