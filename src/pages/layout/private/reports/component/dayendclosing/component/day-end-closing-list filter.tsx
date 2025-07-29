import { ReportPeriod } from "@/global/components/enums/enums";
import { defaultNepaliDate } from "@/global/config";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { BsCalendarDate } from "react-icons/bs";
import { useDayEndClosingStore } from "../store";

const DayEndClosingListFilter = () => {
  const location = useLocation();
  const id = location.state?.id;

  const { searchQuery, filter, setFilter } = useDayEndClosingStore();

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
      </div>

    </div>
  );
};

export default DayEndClosingListFilter;
