import { useListSalesStore } from "../store";

const SalesInDepthReport = () => {
  const { sales, filterData } = useListSalesStore(); // Assuming filterData is available from your store

  if (!sales || sales.length === 0) {
    return (
      <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200 text-center text-gray-600 text-lg font-medium">
        Looks like there is no sales data for the selected period.
      </div>
    );
  }

  // Total Sales Amount
  const totalSalesAmt = sales.reduce(
    (acc, curr) => acc + (curr.totalAmt || 0),
    0
  );

  // Total Discount Given (summing up discount per item * quantity)
  const totalDiscount = sales
    .flatMap((sale) => sale.salesItemsRes || [])
    .reduce((acc, item) => acc + (item?.discount * item?.quantity || 0), 0);

  // Breakdown: itemName => { count, buyers[] }
const itemStats: Record<
  string,
  { count: number; buyers: string[]; totalPrice: number }
> = {};

sales.forEach((sale) => {
  sale.salesItemsRes?.forEach((item) => {
    const key = item?.itemName;
    const quantity = item?.quantity || 0;
    const pricePerUnit = (item?.price - item?.discount) || 0;
    const totalItemPrice = quantity * pricePerUnit;

    if (itemStats[key]) {
      itemStats[key].count += quantity;
      itemStats[key].totalPrice += totalItemPrice;
      if (!itemStats[key].buyers.includes(sale.partyName)) {
        itemStats[key].buyers.push(sale.partyName);
      }
    } else {
      itemStats[key] = {
        count: quantity,
        buyers: [sale.partyName],
        totalPrice: totalItemPrice,
      };
    }
  });
});


  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-lg border border-gray-200 font-poppins animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        📦 In-Depth Sales Report
        {filterData?.reportPeriod && (
          <span className="text-xl text-gray-600 ml-2">
            for {filterData?.reportPeriod}
            {filterData?.reportPeriod === "CUSTOM_DATE" &&
              ` (${filterData?.startDate || "N/A"} to ${
                filterData?.endDate || "N/A"
              })`}
          </span>
        )}
      </h2>

      <hr className="my-6 border-gray-200" />

      {/* Summary Section - Enhanced with Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200 shadow-sm transition-transform transform hover:scale-105">
          <p className="text-sm text-green-700 font-medium mb-2">
            Total Sales Income
          </p>
          <p className="text-3xl font-extrabold text-green-600">
            रु {totalSalesAmt?.toLocaleString()}
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

      {/* Item Breakdown */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          🛒 Items Sold Breakdown
        </h3>
        <ul className="list-disc pl-6 space-y-3 text-base text-gray-800">
          {Object.entries(itemStats)?.map(([itemName, data]) => (
            <li
              key={itemName}
              className="bg-gray-50 p-3 rounded-md border border-gray-200 flex flex-col sm:flex-row sm:items-center  "
            >
              <div>
                <span className="font-semibold text-indigo-700 text-lg">
                  {itemName}
                </span>
                : sold{" "}
                <span className="font-bold text-green-700">{data?.count}</span>{" "}
                {data?.count === 1 ? "time" : "times"}
                <span className="font-bold text-green-600">
                  {" "}रु {data?.totalPrice?.toLocaleString()}
                </span>{" "}
              </div>
              <div className="text-gray-600 text-sm mt-1 sm:mt-0 sm:ml-4">
                (
                {Array.from(new Set(data?.buyers)) // Ensure unique buyers
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SalesInDepthReport;
