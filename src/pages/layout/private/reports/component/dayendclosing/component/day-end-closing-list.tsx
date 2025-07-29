import Back from "@/global/components/back/back";
import { defaultNepaliDate } from "@/global/config";
import { useState } from "react";
import {
    FaArrowDown,
    FaArrowUp,
    FaCalendarAlt,
    FaChartLine,
    FaChevronDown,
    FaChevronUp,
    FaCoins,
    FaExclamationTriangle,
    FaFileAlt,
    FaHistory,
    FaListAlt,
    FaMoneyBillWave,
    FaReceipt,
    FaUniversity,
    FaUserCheck,
} from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useDayEndClosingStore } from "../store";
import DayEndClosingListFilter from "./day-end-closing-list filter";

const DayEndClosingList = () => {
  const { dayEndClosingDetailsList } = useDayEndClosingStore();
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<string>("cash");

  // Toggle expanded state for an item
  const toggleExpand = (id: number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((item) => item !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  // Get current date display
 

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      {/* Header */}
      <div className="border-b border-[#1A1A1A]/10 p-5 flex justify-between items-center bg-white shadow-sm">
         <Back />
        <div className="flex items-center">
          <div className="bg-[#E26300]/10 p-2.5 rounded-lg mr-3">
            <FaHistory className="text-[#E26300]" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1A1A1A]">
              Day-End Closing History
            </h1>
            <p className="text-sm text-[#2E2E2E]/70 mt-0.5">
              {defaultNepaliDate?.toString()}
            </p>
          </div>
        </div>
        <div className="flex items-center text-[#2E2E2E]/70">
          <div className="bg-[#1A1A1A]/5 px-4 py-1.5 rounded-full text-sm font-medium flex items-center">
            <FaReceipt className="mr-2 text-[#E26300]" size={14} />
            {dayEndClosingDetailsList?.length || 0} Records
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-5 sm:p-6 md:p-8">
        {/* Search and Filter Bar */}
        <div className="mb-6">
          <DayEndClosingListFilter />
        </div>

        {/* List of Day End Closings */}
        <div className="space-y-6">
          {dayEndClosingDetailsList?.length > 0 ? (
            dayEndClosingDetailsList.map((data, index) => {
              const isExpanded = expandedItems.includes(data?.id || index);
              const totalDiscrepancy =
                (data?.cashDiscrepancy || 0) + (data?.bankDiscrepancy || 0);
              const hasCashDiscrepancy = data?.cashDiscrepancy !== 0;
              const hasBankDiscrepancy = data?.bankDiscrepancy !== 0;

              return (
                <div
                  key={data?.id ?? index}
                  className="bg-white border border-[#1A1A1A]/10 rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md"
                >
                  {/* Header with Date and Handler */}
                  <div
                    className="p-5 border-b border-[#1A1A1A]/10 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer"
                    onClick={() => toggleExpand(data?.id || index)}
                  >
                    <div className="flex items-center mb-2 sm:mb-0">
                      <div className="bg-[#E26300]/10 p-2.5 rounded-lg mr-3">
                        <FaCalendarAlt className="text-[#E26300]" size={16} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1A1A1A] flex items-center">
                          <span>Closing Report: {data?.createdNepDate}</span>
                          {totalDiscrepancy !== 0 && (
                            <span
                              className={`ml-2 inline-flex items-center text-xs px-2 py-0.5 rounded-full ${
                                totalDiscrepancy > 0
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {totalDiscrepancy > 0 ? (
                                <FaArrowUp size={10} className="mr-1" />
                              ) : (
                                <FaArrowDown size={10} className="mr-1" />
                              )}
                              {totalDiscrepancy > 0 ? "Surplus" : "Deficit"}
                            </span>
                          )}
                        </h3>
                        <div className="text-xs text-[#2E2E2E]/70 mt-1">
                          ID: #{data?.id || index}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center bg-[#1A1A1A]/5 px-3 py-1 rounded-full">
                        <FaUserCheck
                          className="text-[#E26300] mr-2"
                          size={12}
                        />
                        <span className="text-sm">
                          {data?.handledBy || "N/A"}
                        </span>
                      </div>
                      {isExpanded ? (
                        <FaChevronUp className="text-[#2E2E2E]/70" size={16} />
                      ) : (
                        <FaChevronDown
                          className="text-[#2E2E2E]/70"
                          size={16}
                        />
                      )}
                    </div>
                  </div>

                  {/* Summary Row - Always Visible */}
                  <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <SummaryBox
                      label="Opening Total"
                      value={
                        (data?.openingCash || 0) + (data?.openingBank || 0)
                      }
                      icon={<RiMoneyDollarCircleLine size={18} />}
                      type="neutral"
                    />
                    <SummaryBox
                      label="Closing Total"
                      value={
                        (data?.actualClosingCash || 0) +
                        (data?.actualClosingBank || 0)
                      }
                      icon={<FaCoins size={16} />}
                      type="neutral"
                    />
                    <SummaryBox
                      label="Total Income"
                      value={
                        (data?.totalCashIncome || 0) +
                        (data?.totalBankIncome || 0)
                      }
                      icon={<FaArrowUp size={16} />}
                      type="positive"
                    />
                    <SummaryBox
                      label="Total Expense"
                      value={
                        (data?.totalCashExpense || 0) +
                        (data?.totalBankExpense || 0)
                      }
                      icon={<FaArrowDown size={16} />}
                      type="negative"
                    />
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-[#1A1A1A]/10">
                      {/* Tab Navigation */}
                      <div className="border-b border-[#1A1A1A]/10 bg-[#FAFAFA]">
                        <div className="flex">
                          <button
                            onClick={() => setActiveTab("cash")}
                            className={`px-6 py-3 text-sm font-medium flex items-center transition-colors relative ${
                              activeTab === "cash"
                                ? "text-[#E26300]"
                                : "text-[#2E2E2E]/70 hover:text-[#2E2E2E]"
                            }`}
                          >
                            <FaMoneyBillWave className="mr-2" size={16} />
                            Cash Summary
                            {hasCashDiscrepancy && (
                              <span className="ml-2 w-2 h-2 rounded-full bg-red-500"></span>
                            )}
                            {activeTab === "cash" && (
                              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E26300]"></div>
                            )}
                          </button>

                          <button
                            onClick={() => setActiveTab("bank")}
                            className={`px-6 py-3 text-sm font-medium flex items-center transition-colors relative ${
                              activeTab === "bank"
                                ? "text-[#E26300]"
                                : "text-[#2E2E2E]/70 hover:text-[#2E2E2E]"
                            }`}
                          >
                            <FaUniversity className="mr-2" size={16} />
                            Bank Summary
                            {hasBankDiscrepancy && (
                              <span className="ml-2 w-2 h-2 rounded-full bg-red-500"></span>
                            )}
                            {activeTab === "bank" && (
                              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E26300]"></div>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="p-6">
                        {/* Cash Summary Tab */}
                        {activeTab === "cash" && (
                          <div className="space-y-6">
                            <div className="bg-[#FAFAFA] rounded-lg p-5 border border-[#1A1A1A]/10">
                              <h3 className="text-base font-medium text-[#1A1A1A] mb-4 flex items-center">
                                <FaChartLine
                                  className="mr-2 text-[#E26300]"
                                  size={16}
                                />
                                Cash Flow Summary
                              </h3>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                                    <span className="text-sm text-[#2E2E2E]/70">
                                      Opening Cash
                                    </span>
                                    <span className="font-medium">
                                      रु {data?.openingCash}
                                    </span>
                                  </div>

                                  <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                                    <span className="flex items-center text-sm text-[#2E2E2E]/70">
                                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                      Cash Income
                                    </span>
                                    <span className="font-medium text-green-600">
                                      रु +{data?.totalCashIncome}
                                    </span>
                                  </div>

                                  <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                                    <span className="flex items-center text-sm text-[#2E2E2E]/70">
                                      <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                                      Cash Expense
                                    </span>
                                    <span className="font-medium text-red-600">
                                      रु -{data?.totalCashExpense}
                                    </span>
                                  </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                                    <span className="text-sm text-[#2E2E2E]/70">
                                      Expected Closing
                                    </span>
                                    <span className="font-medium">
                                      रु {data?.expectedClosingCash}
                                    </span>
                                  </div>

                                  <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                                    <span className="text-sm text-[#2E2E2E]/70">
                                      Actual Closing
                                    </span>
                                    <span className="font-medium">
                                      रु {data?.actualClosingCash}
                                    </span>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">
                                      Discrepancy
                                    </span>
                                    <span
                                      className={`font-bold ${
                                        data?.cashDiscrepancy > 0
                                          ? "text-green-600"
                                          : data?.cashDiscrepancy < 0
                                          ? "text-red-600"
                                          : "text-[#2E2E2E]"
                                      }`}
                                    >
                                      रु {data?.cashDiscrepancy}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Discrepancy Note if exists */}
                              {hasCashDiscrepancy &&
                                data?.cashDiscrepancyReason && (
                                  <div className="mt-5 pt-4 border-t border-[#1A1A1A]/10">
                                    <div
                                      className={`p-4 rounded-lg ${
                                        data?.cashDiscrepancy > 0
                                          ? "bg-green-50 border border-green-100"
                                          : "bg-red-50 border border-red-100"
                                      }`}
                                    >
                                      <div className="flex items-center mb-2">
                                        <FaExclamationTriangle
                                          className={
                                            data?.cashDiscrepancy > 0
                                              ? "text-green-600 mr-2"
                                              : "text-red-600 mr-2"
                                          }
                                          size={14}
                                        />
                                        <h4 className="text-sm font-medium">
                                          {data?.cashDiscrepancy > 0
                                            ? "Cash Surplus Note:"
                                            : "Cash Deficit Note:"}
                                        </h4>
                                      </div>
                                      <p className="text-sm">
                                        {data?.cashDiscrepancyReason}
                                      </p>
                                    </div>
                                  </div>
                                )}
                            </div>

                            {/* Key Metrics Card */}
                            <div className="bg-[#FAFAFA] rounded-lg p-5 border border-[#1A1A1A]/10">
                              <h3 className="text-base font-medium text-[#1A1A1A] mb-4">
                                Cash Performance
                              </h3>

                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <MetricsCard
                                  label="Cash Flow"
                                  value={
                                    data?.totalCashIncome -
                                    data?.totalCashExpense
                                  }
                                  type={
                                    data?.totalCashIncome -
                                      data?.totalCashExpense >=
                                    0
                                      ? "positive"
                                      : "negative"
                                  }
                                />
                                <MetricsCard
                                  label="Cash Accuracy"
                                  value={
                                    data?.cashDiscrepancy === 0
                                      ? "100%"
                                      : (
                                          (1 -
                                            Math.abs(
                                              data?.cashDiscrepancy || 0
                                            ) /
                                              (data?.expectedClosingCash ||
                                                1)) *
                                          100
                                        ).toFixed(1) + "%"
                                  }
                                  type={
                                    data?.cashDiscrepancy === 0
                                      ? "positive"
                                      : Math.abs(data?.cashDiscrepancy || 0) /
                                          (data?.expectedClosingCash || 1) <
                                        0.05
                                      ? "neutral"
                                      : "negative"
                                  }
                                />
                                <MetricsCard
                                  label="Cash Growth"
                                  value={
                                    (
                                      (((data?.actualClosingCash || 0) -
                                        (data?.openingCash || 0)) /
                                        (data?.openingCash || 1)) *
                                      100
                                    ).toFixed(1) + "%"
                                  }
                                  type={
                                    (data?.actualClosingCash || 0) >=
                                    (data?.openingCash || 0)
                                      ? "positive"
                                      : "negative"
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Bank Summary Tab */}
                        {activeTab === "bank" && (
                          <div className="space-y-6">
                            <div className="bg-[#FAFAFA] rounded-lg p-5 border border-[#1A1A1A]/10">
                              <h3 className="text-base font-medium text-[#1A1A1A] mb-4 flex items-center">
                                <FaChartLine
                                  className="mr-2 text-[#E26300]"
                                  size={16}
                                />
                                Bank Flow Summary
                              </h3>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left Column */}
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                                    <span className="text-sm text-[#2E2E2E]/70">
                                      Opening Bank
                                    </span>
                                    <span className="font-medium">
                                      {data?.openingBank}
                                    </span>
                                  </div>

                                  <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                                    <span className="flex items-center text-sm text-[#2E2E2E]/70">
                                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                      Bank Income
                                    </span>
                                    <span className="font-medium text-green-600">
                                      रु +{data?.totalBankIncome}
                                    </span>
                                  </div>

                                  <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                                    <span className="flex items-center text-sm text-[#2E2E2E]/70">
                                      <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                                      Bank Expense
                                    </span>
                                    <span className="font-medium text-red-600">
                                      रु -{data?.totalBankExpense}
                                    </span>
                                  </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                                    <span className="text-sm text-[#2E2E2E]/70">
                                      Expected Closing
                                    </span>
                                    <span className="font-medium">
                                      रु {data?.expectedClosingBank}
                                    </span>
                                  </div>

                                  <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                                    <span className="text-sm text-[#2E2E2E]/70">
                                      Actual Closing
                                    </span>
                                    <span className="font-medium">
                                      रु {data?.actualClosingBank}
                                    </span>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">
                                      Discrepancy
                                    </span>
                                    <span
                                      className={`font-bold ${
                                        data?.bankDiscrepancy > 0
                                          ? "text-green-600"
                                          : data?.bankDiscrepancy < 0
                                          ? "text-red-600"
                                          : "text-[#2E2E2E]"
                                      }`}
                                    >
                                      रु {data?.bankDiscrepancy}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Discrepancy Note if exists */}
                              {hasBankDiscrepancy &&
                                data?.bankDiscrepancyReason && (
                                  <div className="mt-5 pt-4 border-t border-[#1A1A1A]/10">
                                    <div
                                      className={`p-4 rounded-lg ${
                                        data?.bankDiscrepancy > 0
                                          ? "bg-green-50 border border-green-100"
                                          : "bg-red-50 border border-red-100"
                                      }`}
                                    >
                                      <div className="flex items-center mb-2">
                                        <FaExclamationTriangle
                                          className={
                                            data?.bankDiscrepancy > 0
                                              ? "text-green-600 mr-2"
                                              : "text-red-600 mr-2"
                                          }
                                          size={14}
                                        />
                                        <h4 className="text-sm font-medium">
                                          {data?.bankDiscrepancy > 0
                                            ? "Bank Surplus Note:"
                                            : "Bank Deficit Note:"}
                                        </h4>
                                      </div>
                                      <p className="text-sm">
                                        {data?.bankDiscrepancyReason}
                                      </p>
                                    </div>
                                  </div>
                                )}
                            </div>

                            {/* Key Metrics Card */}
                            <div className="bg-[#FAFAFA] rounded-lg p-5 border border-[#1A1A1A]/10">
                              <h3 className="text-base font-medium text-[#1A1A1A] mb-4">
                                Bank Performance
                              </h3>

                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <MetricsCard
                                  label="Bank Flow"
                                  value={
                                    data?.totalBankIncome -
                                    data?.totalBankExpense
                                  }
                                  type={
                                    data?.totalBankIncome -
                                      data?.totalBankExpense >=
                                    0
                                      ? "positive"
                                      : "negative"
                                  }
                                />
                                <MetricsCard
                                  label="Bank Accuracy"
                                  value={
                                    data?.bankDiscrepancy === 0
                                      ? "100%"
                                      : (
                                          (1 -
                                            Math.abs(
                                              data?.bankDiscrepancy || 0
                                            ) /
                                              (data?.expectedClosingBank ||
                                                1)) *
                                          100
                                        ).toFixed(1) + "%"
                                  }
                                  type={
                                    data?.bankDiscrepancy === 0
                                      ? "positive"
                                      : Math.abs(data?.bankDiscrepancy || 0) /
                                          (data?.expectedClosingBank || 1) <
                                        0.05
                                      ? "neutral"
                                      : "negative"
                                  }
                                />
                                <MetricsCard
                                  label="Bank Growth"
                                  value={
                                    (
                                      (((data?.actualClosingBank || 0) -
                                        (data?.openingBank || 0)) /
                                        (data?.openingBank || 1)) *
                                      100
                                    ).toFixed(1) + "%"
                                  }
                                  type={
                                    (data?.actualClosingBank || 0) >=
                                    (data?.openingBank || 0)
                                      ? "positive"
                                      : "negative"
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Remarks Section - Always Visible */}
                        {data?.remarks && (
                          <div className="mt-6 p-4 bg-[#FAFAFA] border border-[#1A1A1A]/10 rounded-lg">
                            <div className="flex items-center mb-2">
                              <FaFileAlt
                                className="text-[#E26300] mr-2"
                                size={14}
                              />
                              <h3 className="font-medium text-[#1A1A1A]">
                                Additional Remarks
                              </h3>
                            </div>
                            <p className="text-sm text-[#2E2E2E]/80 mt-2 italic">
                              "{data?.remarks}"
                            </p>
                          </div>
                        )}

                        {/* Footer with timestamps */}
                        <div className="mt-6 pt-4 border-t border-[#1A1A1A]/10 flex justify-between items-center text-xs text-[#2E2E2E]/50">
                          <div>Created: {data?.createdNepDate || "N/A"}</div>
                          <div>
                            User: {data?.handledBy} • Report ID: #
                            {data?.id || index}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white border border-[#1A1A1A]/10 rounded-lg p-12 text-center shadow-sm">
              <div className="w-20 h-20 mx-auto bg-[#1A1A1A]/5 rounded-full flex items-center justify-center mb-4">
                <FaListAlt className="text-[#1A1A1A]/20" size={32} />
              </div>
              <h3 className="text-xl font-medium text-[#1A1A1A] mb-2">
                No closing records found
              </h3>
              <p className="text-[#2E2E2E]/70 text-md max-w-md mx-auto">
                There are no day-end closing records available. Records will
                appear here after day-end closing processes are completed.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for summary boxes
const SummaryBox = ({
  label,
  value,
  icon,
  type,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  type: "positive" | "negative" | "neutral";
}) => {
  const getColorClass = () => {
    switch (type) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-[#1A1A1A]";
    }
  };

  return (
    <div className="bg-[#FAFAFA] border border-[#1A1A1A]/10 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="text-xs text-[#2E2E2E]/70 mb-1.5 font-medium">
        {label}
      </div>
      <div className="flex items-center">
        <div
          className={`p-2 rounded-lg bg-[#1A1A1A]/5 mr-3 ${
            type === "positive"
              ? "text-green-600"
              : type === "negative"
              ? "text-red-600"
              : "text-[#E26300]"
          }`}
        >
          {icon}
        </div>
        <span className={`text-base font-bold ${getColorClass()}`}>
          रु {value}
        </span>
      </div>
    </div>
  );
};

// Helper component for metrics card
const MetricsCard = ({
  label,
  value,
  type,
}: {
  label: string;
  value: number | string;
  type: "positive" | "negative" | "neutral";
}) => {
  const getBackgroundClass = () => {
    switch (type) {
      case "positive":
        return "bg-green-50 border-green-100";
      case "negative":
        return "bg-red-50 border-red-100";
      default:
        return "bg-white border-[#1A1A1A]/10";
    }
  };

  const getTextClass = () => {
    switch (type) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-[#1A1A1A]";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "positive":
        return <FaArrowUp size={14} className="mr-2 text-green-600" />;
      case "negative":
        return <FaArrowDown size={14} className="mr-2 text-red-600" />;
      default:
        return <FaChartLine size={14} className="mr-2 text-[#E26300]" />;
    }
  };

  return (
    <div className={`rounded-lg p-3 border ${getBackgroundClass()}`}>
      <div className="text-xs font-medium mb-1 text-[#2E2E2E]/80">{label}</div>
      <div className="flex items-center">
        {getIcon()}
        <span className={`text-base font-bold ${getTextClass()}`}>
          रु {value}
        </span>
      </div>
    </div>
  );
};

export default DayEndClosingList;
