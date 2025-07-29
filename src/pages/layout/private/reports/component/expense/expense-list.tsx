import Back from "@/global/components/back/back";
import { useIsDesktop } from "@/global/desktop-checker";
import { Box } from "@mui/material";
import React from "react"; 
import { HiCreditCard, HiOutlineUserGroup } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbFileInfo } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "../../../../../../global/config";
import ExpenseFilters from "./component/expense-filters";
import { IExpenseDetails } from "./interface";
import { useListExpenseStore } from "./store";
import { useSystemUserStore } from "../../../systemuser/store";
import { SystemUserType } from "@/global/components/enums/enums";

const ExpenseList: React.FC = () => {
  const navigate = useNavigate();

  const { expense } = useListExpenseStore();
  const { currentSystemUser } = useSystemUserStore();
  const handleNavigate = (row: IExpenseDetails) => {
    navigate(`/${PrivateRoute}/add/finance/expenses`, { state: row?.id });
  };
  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'
  return (
    <div className="min-h-screen font-poppins">
      <Box sx={{ padding: 2, position: "relative" }}>
        <Back />

        {/* Filters */}
        <div className="mt-16 mb-6">
          <ExpenseFilters />
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
                      Expense Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Payment Mode
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Notes
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
                  {Array.isArray(expense) && expense?.length > 0 ? (
                    expense.map((data, index) => (
                      <React.Fragment key={data?.id ?? index}>
                        <tr
                          className="even:bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => handleNavigate(data)}
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            <span
                              className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                                data?.expenseType === "RENT"
                                  ? "bg-purple-100 text-purple-800"
                                  : data?.expenseType === "SALARIES"
                                  ? "bg-blue-100 text-blue-800"
                                  : data?.expenseType === "UTILITIES"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {data?.expenseType}
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

                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                            <span className="text-red-600">
                              रु {data?.totalAmt}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {data?.notes || "-"}
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
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">
                            <div
                              className="cursor-pointer"
                              title="View Details"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNavigate(data);
                              }}
                            >
                              <TbFileInfo size={20} color="orange" />
                            </div>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-[14px] p-3 text-center text-red-400"
                      >
                        No expense records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full p-3">
            {Array.isArray(expense) && expense.length > 0 ? (
              expense.map((data) => (
                <div
                  className="border border-gray-300 rounded-lg text-sm flex flex-col mb-4 p-4 bg-white shadow-md"
                  key={data.id}
                  onClick={() => handleNavigate(data)}
                >
                  {/* Header with expense type and payment mode badges */}
                  <div className="flex items-center justify-between mb-3 border-b border-gray-200 pb-2">
                    <div className="flex items-center">
                      <MdOutlineCategory className="text-gray-500 mr-2" />
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                          data?.expenseType === "RENT"
                            ? "bg-purple-100 text-purple-800"
                            : data?.expenseType === "SALARIES"
                            ? "bg-blue-100 text-blue-800"
                            : data?.expenseType === "UTILITIES"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {data?.expenseType}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <HiCreditCard className="text-gray-500 mr-1" />
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
                    </div>
                  </div>

                  {/* Main content grid */}
                  <div className="grid grid-cols-2 gap-y-3 text-sm mb-3">
                    <div className="flex flex-col">
                      <span className="text-gray-400 text-xs">Amount:</span>
                      <div className="flex items-center gap-1 mt-1">
                        <RiMoneyDollarCircleLine className="text-red-500" />
                        <span className="font-medium text-red-600">
                          रु{data?.totalAmt}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Notes section if available */}
                  {data?.notes && (
                    <div className="mb-3">
                      <div className="flex items-center gap-1 mb-1">
                        <IoDocumentTextOutline className="text-gray-500" />
                        <span className="text-gray-400 text-xs">Notes:</span>
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-md">
                        {data?.notes}
                      </p>
                    </div>
                  )}

                  {/* Created date */}
                  <div className="text-xs text-gray-400 border-t border-gray-100 pt-2 mb-2">
                    Added: {data?.createdNepDate}__{data?.localTimeZone}
                  </div>
                  {/* added by */}

                  {currentSystemUser?.systemUserType ===
                    SystemUserType.ADMIN && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      {data?.addedBy || "unknown"}
                    </td>
                  )}
                  {/* Action button */}
                  <div className="flex justify-end mt-1">
                    <button
                      className="sm:text-gray-600 text-sm sm:text-base border-none sm:border sm:border-gray-800 
                     sm:p-2 rounded-lg hover:text-[#E26300] transition-colors flex items-center justify-center 
                     gap-2 sm:hover:scale-110 hover:zoom-out-50 underline sm:no-underline text-[#E26300]"
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
                  <p>No expense records found</p>
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

export default ExpenseList;
