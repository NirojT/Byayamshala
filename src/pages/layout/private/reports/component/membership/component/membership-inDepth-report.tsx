import { useListMembershipStore } from "../store";

const MembershipInDepthReport = () => {
  const { memberShips, filterData } = useListMembershipStore();

  if (!memberShips || memberShips.length === 0) {
    return (
      <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200 text-center text-gray-600 text-lg font-medium">
        Looks like there are no memberships for the selected period.
      </div>
    );
  }

  // Calculate Totals
  const totalMembershipIncome = memberShips.reduce(
    (acc, curr) => acc + (curr?.price || 0),
    0
  );

  const totalDiscount = memberShips.reduce(
    (acc, curr) => acc + (curr?.discount || 0),
    0
  );

  // Breakdown: planName => { count, names[] }
  // Breakdown: planName => { count, names[], totalPrice }
  const planStats: Record<
    string,
    { count: number; names: string[]; totalPrice: number }
  > = {};

  memberShips.forEach((mem) => {
    const key = mem.planName;
    if (planStats[key]) {
      planStats[key].count += 1;
      planStats[key].names.push(mem.memberName);
      planStats[key].totalPrice += mem.price || 0;
    } else {
      planStats[key] = {
        count: 1,
        names: [mem.memberName],
        totalPrice: mem.price || 0,
      };
    }
  });

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200 font-poppins animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📊 In-Depth Membership Report for {filterData?.reportPeriod}
        {filterData?.reportPeriod === "CUSTOM_DATE" &&
          ` (${filterData?.startDate || "N/A"} to ${
            filterData?.endDate || "N/A"
          })`}
      </h2>

      <hr className="my-6 border-gray-200" />

      {/* Totals Section - Enhanced with Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200 shadow-sm transition-transform transform hover:scale-105">
          <p className="text-sm text-green-700 font-medium mb-2">
            Total Membership Income
          </p>
          <p className="text-3xl font-extrabold text-green-600">
            रु {totalMembershipIncome?.toLocaleString()}
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border border-red-200 shadow-sm transition-transform transform hover:scale-105">
          <p className="text-sm text-red-700 font-medium mb-2">
            Total Discount Given
          </p>
          <p className="text-3xl font-extrabold text-red-500">
            रु {totalDiscount?.toLocaleString()}
          </p>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Plan Breakdown */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          🏷️ Plans Sold Breakdown
        </h3>
        <ul className="list-disc pl-6 space-y-3 text-base text-gray-800">
          {Object.entries(planStats).map(([planName, data]) => (
            <li
              key={planName}
              className="bg-gray-50 p-3 rounded-md border border-gray-200"
            >
              <span className="font-semibold text-indigo-700">{planName}</span>:
              sold{" "}
              <span className="font-bold text-green-700">{data?.count}</span>{" "}
              {data?.count === 1 ? "time" : "times"}{" "}
              <span className="font-bold text-green-600">
                रु {data?.totalPrice?.toLocaleString()}
              </span>{" "}
              <span className="text-gray-600">
                (
                {data?.names
                  .map((name) =>
                    name
                      .split(" ")
                      .map(
                        (part) => part.charAt(0).toUpperCase() + part.slice(1)
                      )
                      .join(" ")
                  )
                  .join(", ")}
                )
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MembershipInDepthReport;
