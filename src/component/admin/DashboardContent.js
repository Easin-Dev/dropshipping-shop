// --- src/component/admin/DashboardContent.js ---
// StatCard এবং ActivityItem কম্পোনেন্টগুলো এখানে রাখা হলো
function StatCard({ color, label, value }) {
  return (
    <div className={`p-6 rounded-xl text-white shadow-md ${color}`}>
      <div className="text-lg font-medium">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}

function ActivityItem({ label, status, color }) {
  const statusColors = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    gray: "bg-gray-400",
  };
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${statusColors[color]}`}></span>
        {label}
      </div>
      <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600 font-medium">
        {status}
      </span>
    </li>
  );
}

export const DashboardContent = () => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <StatCard color="bg-blue-500" label="Shipped orders" value="67" />
      <StatCard color="bg-rose-500" label="Pending orders" value="09" />
      <StatCard color="bg-purple-500" label="New orders" value="35" />
    </div>
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <div className="font-semibold text-gray-800 mb-2 flex justify-between">
        <span>Recent Activity</span>
        <button className="text-sm text-blue-600 font-medium hover:underline">
          View all
        </button>
      </div>
      <ul className="space-y-3 text-sm">
        <ActivityItem
          label="Confirm order update"
          status="URGENT"
          color="blue"
        />
        <ActivityItem
          label="Finish shipping update"
          status="URGENT"
          color="red"
        />
      </ul>
    </div>
  </>
);
