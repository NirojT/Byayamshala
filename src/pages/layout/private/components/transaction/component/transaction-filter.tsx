import { ReportPeriod } from "@/global/components/enums/enums";
import { FiCalendar } from "react-icons/fi";

import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react"; 
import { useEffect, useState } from "react";
import { defaultNepaliDate } from "@/global/config";
import { useBusinessStatsStore } from "../../../reports/component/business_stats/store";

const TransactionFilter = ({
  refreshData
}: {
  refreshData: () => Promise<void>;
}) => {
  const { filters, setFilters } = useBusinessStatsStore();

  const [selectedPeriod, setSelectedPeriod] = useState(
    filters?.reportPeriod || ReportPeriod.THIS_MONTH
  );

  const handleChange = (value: ReportPeriod) => {
    setSelectedPeriod(value);
    setFilters({
      ...filters,
      reportPeriod: value,
    });
  };
  useEffect(() => {
    refreshData();
  }, [filters?.reportPeriod, filters?.startDate, filters?.endDate]);

  
  return (
    <div>
      {" "}
      <div className="relative flex-1 max-w-[180px] overflow-hidden">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiCalendar className="w-4 h-4 text-gray-400" />
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => handleChange(e.target.value as ReportPeriod)}
          className="pl-9 pr-8 py-2 w-full rounded-lg border border-gray-300 bg-white text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-300 appearance-none"
        >
          {Object.values(ReportPeriod).map((period) => (
            <option key={period} value={period}>
              {period
                .split("_")
                .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
                .join(" ")}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {/* Date Picker Row */}
      {filters?.reportPeriod === ReportPeriod.CUSTOM_DATE && (
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <NepaliDatePicker
              value={
                filters?.startDate
                  ? new NepaliDate(filters?.startDate)
                  : defaultNepaliDate
              }
              placeholder="Select date"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  startDate: e ? e.toString() : "",
                })
              }
              className="w-full text-sm border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E26003] focus:border-transparent"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <NepaliDatePicker
              value={filters?.endDate && new NepaliDate(filters?.endDate)}
              placeholder="Select date"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  endDate: e ? e.toString() : "",
                })
              }
              className="w-full text-sm border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E26003] focus:border-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionFilter;
