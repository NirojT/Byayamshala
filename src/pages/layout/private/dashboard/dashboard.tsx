import {
  BarChart2,
  Users,
  ShoppingCart,
  Package,
  CreditCard,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    name: "Total Sales",
    value: "₹23,450",
    icon: <BarChart2 className="text-blue-500" size={32} />,
    growth: "+12%",
    growthType: "up",
  },
  {
    name: "Bills",
    value: "320",
    icon: <ShoppingCart className="text-green-500" size={32} />,
    growth: "+8%",
    growthType: "up",
  },
  {
    name: "Customers",
    value: "150",
    icon: <Users className="text-purple-500" size={32} />,
    growth: "+4%",
    growthType: "up",
  },
  {
    name: "Stock Items",
    value: "45",
    icon: <Package className="text-orange-400" size={32} />,
    growth: "-2%",
    growthType: "down",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-green-50 py-8 px-4">
      <h1 className="text-3xl font-extrabold text-blue-800 mb-8 text-center tracking-tight">
        Dashboard
      </h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="p-6 bg-white rounded-2xl shadow-lg flex flex-col gap-3 items-start border border-blue-100"
          >
            <div className="flex items-center justify-between w-full">
              <div>{stat.icon}</div>
              <span
                className={`flex items-center gap-1 text-sm font-semibold ${
                  stat.growthType === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.growthType === "up" ? (
                  <ArrowUpRight size={15} />
                ) : (
                  <TrendingUp size={15} className="rotate-180" />
                )}
                {stat.growth}
              </span>
            </div>
            <div className="text-gray-400 text-xs mt-2">{stat.name}</div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Chart & recent activity row */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sales Chart (dummy) */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-6 lg:mb-0">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="text-blue-500" />
            <span className="font-semibold text-blue-700">Sales Overview</span>
          </div>
          {/* Dummy chart */}
          <div className="w-full h-40 flex items-end gap-2">
            {[40, 65, 80, 100, 90, 110, 75].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-blue-400 to-blue-200 rounded-lg"
                style={{ height: `${h}px` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-3">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Recent Activity (dummy) */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="text-green-500" />
            <span className="font-semibold text-green-700">
              Recent Activity
            </span>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Users className="text-blue-500" size={20} />
              <span className="flex-1 text-gray-700">
                New customer <b>Rahul Sharma</b> has purchased.
              </span>
              <span className="text-xs text-gray-400">2 min ago</span>
            </li>
            <li className="flex items-center gap-3">
              <ShoppingCart className="text-green-500" size={20} />
              <span className="flex-1 text-gray-700">
                Order <b>#1023</b> placed.
              </span>
              <span className="text-xs text-gray-400">10 min ago</span>
            </li>
            <li className="flex items-center gap-3">
              <Package className="text-orange-400" size={20} />
              <span className="flex-1 text-gray-700">
                Stock updated: <b>Jwelery</b> (20 units).
              </span>
              <span className="text-xs text-gray-400">1 hr ago</span>
            </li>
            <li className="flex items-center gap-3">
              <CreditCard className="text-purple-500" size={20} />
              <span className="flex-1 text-gray-700">
                Payment of <b>₹2,500</b> received by <b>Card</b>.
              </span>
              <span className="text-xs text-gray-400">2 hr ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
