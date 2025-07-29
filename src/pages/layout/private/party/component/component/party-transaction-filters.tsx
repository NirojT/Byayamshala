import { ReportPeriod } from "@/global/components/enums/enums";
import { defaultNepaliDate } from "@/global/config";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IPartyAccDetials } from "../../interface";
import { usePartyAccTransactionStore } from "../store";

const PartyTranasctionFilters = () => {
  const location = useLocation();
  const partyAcc: IPartyAccDetials = location.state;
  const { filterData, setFilterData, getPartyAccTransactions } =
    usePartyAccTransactionStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };

  useEffect(() => {
    if (partyAcc) {
      getPartyAccTransactions(partyAcc?.partyName, partyAcc?.partyType);
    }
  }, [partyAcc, getPartyAccTransactions]);

  useEffect(() => {
    getPartyAccTransactions(partyAcc?.partyName, partyAcc?.partyType);
  }, [
    filterData?.reportPeriod,
    filterData?.startDate,
    filterData?.endDate,
    getPartyAccTransactions,
    partyAcc?.partyName,
    partyAcc?.partyType,
  ]);

  return (
    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 flex flex-wrap gap-4">
      {/* Period Dropdown */}
      <div className="flex-1 min-w-[180px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Period
        </label>
        <select
          name="reportPeriod"
          value={filterData?.reportPeriod as ReportPeriod}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        >
          {Object.values(ReportPeriod).map((period) => (
            <option key={period} value={period}>
              {period}
            </option>
          ))}
        </select>
      </div>

      {/* Date Filters */}
      {filterData?.reportPeriod === ReportPeriod.CUSTOM_DATE && (
        <>
          {/* Start Date */}
          <div className="flex-1 min-w-[160px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date *
            </label>
            <NepaliDatePicker
              value={
                filterData?.startDate
                  ? new NepaliDate(filterData?.startDate)
                  : defaultNepaliDate
              }
              placeholder="Select start date"
              onChange={(e) =>
                setFilterData({
                  ...filterData,
                  startDate: e ? e.toString() : "",
                })
              }
              className="w-full text-sm border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* End Date */}
          <div className="flex-1 min-w-[160px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date *
            </label>
            <NepaliDatePicker
              value={
                filterData?.endDate
                  ? new NepaliDate(filterData?.endDate)
                  : defaultNepaliDate
              }
              placeholder="Select end date"
              onChange={(e) =>
                setFilterData({
                  ...filterData,
                  endDate: e ? e.toString() : "",
                })
              }
              className="w-full text-sm border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PartyTranasctionFilters;
