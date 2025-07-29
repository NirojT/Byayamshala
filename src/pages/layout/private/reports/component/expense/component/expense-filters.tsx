import { ReportPeriod } from "@/global/components/enums/enums";
import { defaultNepaliDate } from "@/global/config";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { useEffect, useMemo } from "react";
import { BsCalendarDate, BsListOl } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbReportMoney } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { IExpenseDetails } from "../interface";
import { useListExpenseStore } from "../store";

const ExpenseFilters = () => {
  const location = useLocation();
  const id = location.state?.id;
  const {
    filterData,
    setFilterData,
    expense,
    totalAmt,
    setTotalAmt,
    searchQuery,
    getExpenseById,
  } = useListExpenseStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  const outgoingGrouped = useMemo(() => {
    const map = new Map<string, number>();

    expense?.forEach((exp) => {
      const current = map.get(exp.expenseType) || 0;
      map.set(exp.expenseType, current + exp.totalAmt);
    });

    return Array.from(map.entries()); // [ ['RENT', 2000], ['SALARIES', 1000], ... ]
  }, [expense]);

  useEffect(() => {
    const total = expense?.reduce((acc: number, curr: IExpenseDetails) => {
      return acc + curr?.totalAmt;
    }, 0);
    setTotalAmt(total);
  }, [expense]);

  // Common MUI TextField styling
  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#E26003",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#E26003",
      },
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#E26003",
    },
  };

  useEffect(() => {
    if (!id) {
      searchQuery();
    }
  }, [filterData?.reportPeriod, filterData?.startDate, filterData?.endDate]);

  useEffect(() => {
    if (id) {
      getExpenseById(id);
    } else {
      searchQuery();
    }
  }, [id]);

  return (
    <div className="font-poppins">
      <div className="flex flex-col space-y-3 sm:space-y-4">
        {/* Top Row with Filter and Stats - Responsive Layout */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center sm:justify-between">
          <div className="w-full sm:w-[350px]">
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={textFieldSx}
            >
              <InputLabel className="text-sm">Time Period</InputLabel>
              <Select
                name="reportPeriod"
                value={filterData?.reportPeriod || ""}
                onChange={handleChange}
                label="Time Period"
                className="text-sm"
                IconComponent={(props) => (
                  <BsCalendarDate
                    className={`${props.className} text-gray-500`}
                    size={18}
                  />
                )}
              >
                {Object.values(ReportPeriod).map((period) => (
                  <MenuItem key={period} value={period} className="text-sm">
                    {period}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Stats Cards - Responsive Grid */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4 sm:items-center">
            {/* Entries card */}
            <div className="bg-slate-50 rounded-md p-2 sm:p-3 shadow-sm border border-gray-200 flex items-center">
              <div className="mr-2 bg-gray-100 p-1.5 rounded-full">
                <BsListOl className="text-gray-500" size={14} />
              </div>
              <div>
                <p className="text-xxs sm:text-xs font-medium text-gray-500 mb-1">Entries</p>
                <p className="text-base sm:text-lg font-semibold text-gray-800">
                  {expense?.length || 0}
                </p>
              </div>
            </div>

            {/* Total expense card */}
            <div className="bg-slate-50 rounded-md p-2 sm:p-3 shadow-sm border border-gray-200 flex items-center">
              <div className="mr-2 bg-red-50 p-1.5 rounded-full">
                <RiMoneyDollarCircleLine className="text-red-500" size={14} />
              </div>
              <div>
                <p className="text-xxs sm:text-xs font-medium text-gray-500 mb-1">Total</p>
                <p className="text-base sm:text-lg font-semibold text-red-600">
                  रु {totalAmt?.toLocaleString() || 0}
                </p>
              </div>
            </div>

            {/* Outgoing expenses card - full width on mobile */}
            <div className="bg-slate-50 rounded-md p-2 sm:p-3 shadow-sm border border-gray-200 col-span-2 sm:min-w-[200px]">
              <div className="flex items-center mb-1">
                <TbReportMoney className="text-red-500 mr-1" size={16} />
                <p className="text-xxs sm:text-xs font-medium text-gray-500">
                  Outgoing Expenses
                </p>
              </div>
              <div className="space-y-1 text-xs sm:text-sm text-gray-800 max-h-[80px] sm:max-h-none overflow-y-auto">
                {outgoingGrouped.map(([type, amount]) => (
                  <div key={type} className="flex justify-between">
                    <span className="text-gray-600 truncate max-w-[120px] sm:max-w-none">{type}</span>
                    <span className="font-semibold text-red-600">
                      रु {amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Date Picker Row - Responsive */}
        {filterData?.reportPeriod === ReportPeriod.CUSTOM_DATE && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 sm:mt-4">
            <div className="w-full sm:flex-1 sm:min-w-[200px]">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <NepaliDatePicker
                value={
                  filterData?.startDate
                    ? new NepaliDate(filterData?.startDate)
                    : defaultNepaliDate
                }
                placeholder="Select date"
                onChange={(e) =>
                  setFilterData({
                    ...filterData,
                    startDate: e ? e.toString() : "",
                  })
                }
                className="w-full text-xs sm:text-sm border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E26003] focus:border-transparent"
              />
            </div>

            <div className="w-full sm:flex-1 sm:min-w-[200px]">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <NepaliDatePicker
                value={
                  filterData?.endDate && new NepaliDate(filterData?.endDate)
                }
                placeholder="Select date"
                onChange={(e) =>
                  setFilterData({
                    ...filterData,
                    endDate: e ? e.toString() : "",
                  })
                }
                className="w-full text-xs sm:text-sm border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E26003] focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseFilters;