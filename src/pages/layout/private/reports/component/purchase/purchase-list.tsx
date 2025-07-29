import Back from "@/global/components/back/back";
import { useIsDesktop } from "@/global/desktop-checker";
import { Box } from "@mui/material";
import React from "react";
import { BsCalendarDate, BsCreditCard } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbFileInfo } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "../../../../../../global/config";
import PurchaseFilters from "./component/purchase-filters";
import { IPurchaseDetails } from "./interface";
import { useListPurchaseStore } from "./store";
import { SystemUserType } from "@/global/components/enums/enums";
import { useSystemUserStore } from "../../../systemuser/store";

const PurchaseList: React.FC = () => {
  const navigate = useNavigate();
  const { purchase } = useListPurchaseStore();
  const { currentSystemUser } = useSystemUserStore();
  const handleNavigate = (row: IPurchaseDetails) => {
    navigate(`/${PrivateRoute}/add/finance/purchase`, { state: row?.id });
  };
  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'
  return (
    <div className="min-h-screen font-poppins">
      <Box sx={{ padding: 2, position: "relative" }}>
        <Back />

        {/* Filters */}
        <div className="mt-16 mb-6">
          <PurchaseFilters />
        </div>

        {/* Table Wrapper - desktop only */}
        {isDesktop ? (
          <div className="  overflow-hidden border border-gray-200 rounded-lg shadow-sm mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-200 text-gray-800">
                  <tr className="text-gray-600">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      SN
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Bill No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Payment Mode
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Party Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Party Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Added At
                    </th>
                    {currentSystemUser?.systemUserType ===
                      SystemUserType.ADMIN && (
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <HiOutlineUserGroup className="w-4 h-4 text-gray-400" />
                          Added By
                        </div>
                      </th>
                    )}
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(purchase) && purchase?.length > 0 ? (
                    purchase.map((data, index) => (
                      <React.Fragment key={data?.id ?? index}>
                        <tr
                          className="even:bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => handleNavigate(data)}
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {data?.billNo}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <span className="text-blue-600">
                              रु {data?.totalAmt}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            <span
                              className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                                data?.paymentMode === "CASH"
                                  ? "bg-green-100 text-green-800"
                                  : data?.paymentMode === "FULL_CREDIT"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {data?.paymentMode}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span
                              className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                                data?.status === "Paid"
                                  ? "bg-green-100 text-green-800"
                                  : data?.status === "Partial"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {data?.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {data?.partyName}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {data?.partyType}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {data?.createdNepDate}_{data?.createdDate}_
                            {data?.localTimeZone}
                          </td>
                          {/* added by */}

                          {currentSystemUser?.systemUserType ===
                            SystemUserType.ADMIN && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              {data?.addedBy || "unknown"}
                            </td>
                          )}
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200 flex items-center gap-2">
                            <div
                              className="cursor-pointer"
                              title="View Details"
                            >
                              <TbFileInfo
                                size={20}
                                color="orange"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNavigate(data);
                                }}
                              />
                            </div>
                            {data?.imageName && (
                              <a
                                href={data?.imageName}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                title="View attached image"
                              >
                                <img
                                  src={data?.imageName}
                                  className="cursor-pointer w-10 h-10 rounded-full border border-gray-200 hover:scale-105 transition-transform"
                                  alt="purchase attachment"
                                />
                              </a>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-[14px] p-3 text-center text-red-400"
                      >
                        No purchase records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="  flex flex-col h-full p-3">
            {Array.isArray(purchase) && purchase.length > 0 ? (
              purchase.map((data) => (
                <div
                  className="border border-gray-300 rounded-lg text-sm flex flex-col mb-4 p-4 bg-white shadow-md hover:shadow-lg transition-shadow"
                  key={data?.id}
                  onClick={() => handleNavigate(data)}
                >
                  {/* Header with bill # and status badges */}
                  <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                    <span className="font-semibold text-gray-800 text-base">
                      Bill #{data?.billNo}
                    </span>
                    <div className="flex items-end gap-1">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                          data?.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : data?.status === "Partial"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {data?.status}
                      </span>
                      <span
                        className={`text-xs inline-flex px-2 py-1 rounded-full font-medium ${
                          data?.paymentMode === "CASH"
                            ? "bg-green-100 text-green-800"
                            : data?.paymentMode === "FULL_CREDIT"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {data?.paymentMode}
                      </span>
                    </div>
                  </div>

                  {/* Party details section */}
                  <div className="flex items-center gap-2 mb-3">
                    <FaRegUser className="text-blue-500" />
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Party:</span>
                      <span className="font-medium text-gray-800">
                        {data?.partyName || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center ml-auto bg-gray-50 px-2 py-1 rounded-md">
                      <HiUserGroup className="text-gray-500 mr-1" size={14} />
                      <span className="text-xs text-gray-600">
                        {data?.partyType}
                      </span>
                    </div>
                  </div>

                  {/* Main content grid */}
                  <div className="grid grid-cols-2 gap-y-3 text-sm mb-3">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Amount:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <RiMoneyDollarCircleLine className="text-blue-500" />
                        <span className="font-semibold text-blue-700 text-base">
                          रु{data?.totalAmt}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Payment:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <BsCreditCard
                          className={`${
                            data?.paymentMode === "CASH"
                              ? "text-green-500"
                              : data?.paymentMode === "FULL_CREDIT"
                              ? "text-blue-500"
                              : "text-purple-500"
                          }`}
                        />
                        <span className="font-medium text-gray-700">
                          {data?.paymentMode}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col col-span-2">
                      <span className="text-gray-400 text-xs">Date:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <BsCalendarDate className="text-gray-500" />
                        <span className="font-medium text-gray-700">
                          {data?.createdNepDate}_{data?.createdDate}_
                          {data?.localTimeZone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Attach image: click to view */}
                  {data?.imageName && (
                    <div className="flex justify-end mt-2">
                      <a
                        href={data?.imageName}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="View attached image"
                        className="block"
                      >
                        <img
                          src={data?.imageName}
                          className="cursor-pointer w-20 h-20 rounded-lg border border-gray-200 hover:scale-105 transition-transform object-cover"
                          alt="purchase attachment"
                        />
                      </a>
                    </div>
                  )}

                  {/* Action button */}
                  <div className="flex justify-end mt-2">
                    <button
                      className="text-sm border-none px-3 py-1 rounded-lg hover:text-[#E26300] transition-colors flex items-center gap-1 underline text-[#E26300] font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(data);
                      }}
                    >
                      <TbFileInfo className="w-4" color="orange" />
                      Edit Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex justify-center items-center p-5 border border-gray-300 rounded-lg bg-white shadow-md">
                <div className="text-center text-red-400">
                  <p>No purchase records found</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* UPDATED mobile view */}
      </Box>
    </div>
  );
};

export default PurchaseList;
