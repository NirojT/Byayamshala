import { ReportPeriod } from "@/global/components/enums/enums";
import { defaultNepaliDate } from "@/global/config";
import { useAddAttendanceFormStore } from "@/pages/layout/private/attendance/store";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { useEffect } from "react"; 
import Back from "@/global/components/back/back";
import { IStaffDetails } from "../../interface";

const StaffAttendanceFilters = ({ staff }: { staff :IStaffDetails}) => {
  const { searchByStaff, filters, setFilters } = useAddAttendanceFormStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
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

  /*
  when normal navigating the id does not exist so we need to call the searchQuery function to get the Attendance data
  */

  /*
  when   navigating from transactions the id is present so we need to call the get by id
  */
  useEffect(() => {
    searchByStaff(staff?.id);
  }, [filters?.reportPeriod, filters?.startDate, filters?.endDate]);

  return (
    <div className="font-poppins flex justify-between items-center p-4  ">
      <Back />
      <div className="flex flex-col space-y-4">
        {/* Top Row - Search and Report Type */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px]">
            <FormControl
              fullWidth
              variant="outlined"
              size="medium"
              sx={textFieldSx}
            >
              <InputLabel>Attendance Period</InputLabel>
              <Select
                size="medium"
                name="reportPeriod"
                value={filters?.reportPeriod || ""}
                onChange={handleChange}
                label="Attendance Period"
              >
                {Object.values(ReportPeriod).map((period) => (
                  <MenuItem key={period} value={period}>
                    {period}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
    </div>
  );
};

export default StaffAttendanceFilters;
