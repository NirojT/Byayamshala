import { PrivateRoute } from "@/global/config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ITableDetails } from "./tables/interface";
import { useTableStore } from "./tables/store";
import { useTakeOrderStore } from "./takeorder/store";
import { useGlobalStore } from "@/global/store";
import { AppUserPlanType } from "@/global/components/enums/enums";
import { FaSpinner } from "react-icons/fa";

const Cafe = () => {
  const navigate = useNavigate();
  const { appUser } = useGlobalStore();
  const { tables, getTables } = useTableStore();
  const {
    addSelectedTable,
    clearSelectedTables,
    clearSelectedMenus,
    dashboardData,
    getDashBoard,
  } = useTakeOrderStore();

  const handleNavigate = (path: string) => {
    navigate(`/${PrivateRoute}/${path}`);
  };

  const handleTableClick = (table: ITableDetails) => {
    clearSelectedTables();
    clearSelectedMenus();
    addSelectedTable([
      {
        value: table?.tableNo,
        label: `${table?.tableNo}`,
        id: table?.id,
        isAvailable: table?.isAvailable,
      },
    ]);

    navigate(`/${PrivateRoute}/take-order`, { state: table });
  };

  useEffect(() => {
    getDashBoard();
  }, [getDashBoard]);
  useEffect(() => {
    getTables();
  }, [getTables]);

  useEffect(() => {
    if (appUser?.planType !== AppUserPlanType.PLATINUM) {
      navigate(-1);
    }
  }, []);
  return (
    <div className="p-6 max-w-5xl mx-auto bg-[#FAFAFA] text-[#2E2E2E]">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Cafe Dashboard</h1>
        {/* <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate(`menus`)}
            className="bg-[#E26300] text-white px-5 py-2.5 rounded-md transition-all hover:opacity-90 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Manage Menus
          </button>
          <button
            onClick={() => navigate(`tables`)}
            className="bg-[#E26300] text-white px-5 py-2.5 rounded-md transition-all hover:opacity-90 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Manage Tables
          </button>
          <button
            onClick={() => navigate(`orders`)}
            className="bg-[#E26300] text-white px-5 py-2.5 rounded-md transition-all hover:opacity-90 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Manage Orders
          </button>
        </div> */}
      </header>

      {/* Stats Section */}
      <section className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-poppins">
        {/* menus */}
        <div
          className="bg-white p-6 rounded-md border border-[#EFEFEF]
        hover:cursor-pointer hover:shadow-md transition-all duration-200"
          onClick={() => handleNavigate("menus")}
        >
          <h3 className="text-xl font-medium mb-2">Enabled Menus</h3>
          <div className="flex items-center">
            <div className="  p-3 rounded-full bg-green-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#1A1A1A] "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="ml-4">
              <span className="text-2xl font-medium">
                {dashboardData?.enabledMenus || 0}
              </span>
            </div>
          </div>
        </div>
        {/* tables */}
        <div
          className="bg-white p-6 rounded-md border border-[#EFEFEF]
         hover:cursor-pointer hover:shadow-md transition-all duration-200"
          onClick={() => handleNavigate("tables")}
        >
          <h3 className="text-xl font-medium mb-2">Occupied Tables</h3>
          <div className="flex items-center">
            <div className="bg-red-300 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#1A1A1A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <span className="text-2xl font-medium">
                {dashboardData?.occupiedTables}
              </span>
            </div>
          </div>
        </div>
        {/* orders */}
        <div
          className="bg-white p-6 rounded-md border border-[#EFEFEF]
          hover:cursor-pointer hover:shadow-md transition-all duration-200"
          onClick={() => handleNavigate("orders")}
        >
          <h3 className="text-xl font-medium mb-2">Pending Orders</h3>
          <div className="flex items-center">
            <div className="bg-[#F6F6F6] p-3 rounded-full">
              {dashboardData?.pendingOrders === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#1A1A1A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              ) : (
                <FaSpinner size={12} className="mr-1 animate-spin" />
              )}
            </div>
            <div className="ml-4">
              <span className="text-2xl font-medium">
                {dashboardData?.pendingOrders || 0}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Select Table Section */}
      <section className="bg-white rounded-md border border-[#EFEFEF] font-poppins">
        <div className="p-6 border-b border-[#EFEFEF]">
          <h2 className="text-2xl font-medium flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-[#1A1A1A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Select Table
          </h2>
          <p className="text-[#666666] mt-1">
            Click on a table to take or manage orders
          </p>
        </div>

        <div className="p-6">
          {tables && tables?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4   gap-5">
              {tables?.map((table, index) => (
                <div
                  key={index}
                  className="relative rounded-xl shadow-sm transition-all transform hover:scale-105 hover:shadow-md cursor-pointer"
                  onClick={() => handleTableClick(table)}
                >
                  <div
                    className={`p-5 rounded-xl ${
                      table?.isAvailable
                        ? "bg-gradient-to-br from-green-50 to-green-100 border border-green-200"
                        : "bg-gradient-to-br from-red-50 to-red-100 border border-red-200"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2 text-[.4rem] md:text-md lg:text-[.8rem]">
                      <span
                        className={`text-lg font-bold ${
                          table?.isAvailable ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        Table {table?.tableNo}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-[.4rem] md:text-md lg:text-[.8rem] font-medium ${
                          table?.isAvailable
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {table?.isAvailable ? "Available" : "Occupied"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="text-[.7rem] md:text-md lg:text-[.8rem]">
                        Capacity: {table?.capacity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-[#CCCCCC]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <p className="mt-4 text-lg text-[#666666]">No tables available</p>
              <p className="text-[#999999]">
                Add tables using the Manage Tables option
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cafe;
