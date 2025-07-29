import { OrderStatus, ReportPeriod } from "@/global/components/enums/enums";
import { defaultNepaliDate } from "@/global/config";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { useEffect } from "react";
import { BsCalendarDate, BsListOl } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { IOrderDetails } from "../interface";
import { useOrderTableStore } from "../store";

const OrderFilter = () => {
  const location = useLocation();
  const id = location.state?.id;

  const {
    searchQuery,
    filter,
    setFilter,
    filterStatus,
    setFilterStatus,
    orderDetails,
    totalAmt,
    setTotalAmt,
  } = useOrderTableStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
    });
  };

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
  }, [filter?.reportPeriod, filter?.startDate, filter?.endDate]);

  useEffect(() => {
    const total = orderDetails?.reduce((acc: number, curr: IOrderDetails) => {
      return acc + curr?.price;
    }, 0);
    setTotalAmt(total);
  }, [orderDetails]);
  return (
    <div className="font-poppins">
      <div className="flex flex-col space-y-3 sm:space-y-4">
        {/* Top Row - Search and Report Type */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="w-full sm:flex-1 sm:min-w-[200px]">
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={textFieldSx}
            >
              <InputLabel className="text-sm">Period</InputLabel>
              <Select
                name="reportPeriod"
                value={filter?.reportPeriod || ""}
                onChange={handleChange}
                label="Sales Period"
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
        </div>

        {/* Date Picker Row */}
        {filter?.reportPeriod === ReportPeriod.CUSTOM_DATE && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="w-full sm:flex-1 sm:min-w-[200px]">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <NepaliDatePicker
                value={
                  filter?.startDate
                    ? new NepaliDate(filter?.startDate)
                    : defaultNepaliDate
                }
                placeholder="Select date"
                onChange={(e) =>
                  setFilter({
                    ...filter,
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
                value={filter?.endDate && new NepaliDate(filter?.endDate)}
                placeholder="Select date"
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    endDate: e ? e.toString() : "",
                  })
                }
                className="w-full text-xs sm:text-sm border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E26003] focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* for filtering with status */}
        <div className="w-full sm:flex-1 sm:min-w-[200px]">
          <FormControl
            fullWidth
            variant="outlined"
            size="small"
            sx={textFieldSx}
          >
            <InputLabel className="text-sm">Status</InputLabel>
            <Select
              name="filter by status"
              value={filterStatus || ""}
              onChange={(e) => {
                setFilterStatus(e?.target?.value as OrderStatus);
              }}
              label="status"
              className="text-sm"
              IconComponent={(props) => (
                <BsCalendarDate
                  className={`${props.className} text-gray-500`}
                  size={18}
                />
              )}
            >
              {Object.values(OrderStatus).map((order) => (
                <MenuItem key={order} value={order} className="text-sm">
                  {order}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {/* Summary Stats - responsive grid design */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-6 mt-3 sm:mt-4 sm:justify-end">
        <div className="bg-slate-50 rounded-md p-2 sm:p-3 shadow-sm border border-gray-200 flex items-center">
          <div className="mr-2 bg-gray-100 p-1.5 rounded-full">
            <BsListOl className="text-gray-500" size={14} />
          </div>
          <div>
            <p className="text-xxs sm:text-xs font-medium text-gray-500">
              Total Orders
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-800">
              {orderDetails?.length || 0}
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-md p-2 sm:p-3 shadow-sm border border-gray-200 flex items-center">
          <div className="mr-2 bg-green-50 p-1.5 rounded-full">
            <RiMoneyDollarCircleLine className="text-green-500" size={14} />
          </div>
          <div>
            <p className="text-xxs sm:text-xs font-medium text-gray-500">
              Total Sales
            </p>
            <p className="text-base sm:text-lg font-semibold text-green-600">
              रु{totalAmt?.toLocaleString() || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFilter;
