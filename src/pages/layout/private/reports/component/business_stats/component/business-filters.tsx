import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useBusinessStatsStore } from "../store";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { defaultNepaliDate } from "@/global/config";
import { ReportPeriod } from "@/global/components/enums/enums";
import { useGlobalStore } from "@/global/store";
import { useEffect } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FiDownload, FiRefreshCw } from "react-icons/fi";
import { RiFileExcel2Line } from "react-icons/ri";

const BusinessFilters = () => {
  const { setToasterData } = useGlobalStore();
  const { filterData, setFilterData, generatePdf, generateExcel, getBusinessStats } =
    useBusinessStatsStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  const handlePdfGenerate = async () => {
    const res = await generatePdf();
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
  };

  const handleExcelGenerate = async () => {
    const res = await generateExcel();
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
  };

  const handleReset = async () => {
    setFilterData({
      reportPeriod: ReportPeriod.TODAY,
      startDate: "",
      endDate: "",
    });
  };

  useEffect(() => {
    getBusinessStats();
  }, [filterData?.reportPeriod, filterData?.startDate, filterData?.endDate]);

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

  return (
    <div className="font-poppins">
      <div className="flex flex-col space-y-3 sm:space-y-4">
        {/* Top Row - Filter and Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Period Filter */}
          <div className="w-full sm:w-auto sm:min-w-[200px] sm:flex-1">
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={textFieldSx}
            >
              <InputLabel className="text-sm">Business Period</InputLabel>
              <Select
                name="reportPeriod"
                value={filterData?.reportPeriod}
                onChange={handleChange}
                label="Business Period"
                className="text-sm bg-white"
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

          {/* Action Buttons - Mobile: Stack, Desktop: Row */}
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <button
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
              onClick={handlePdfGenerate}
            >
              <FiDownload size={16} />
              <span>PDF</span>
            </button>
            <button
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
              onClick={handleExcelGenerate}
            >
              <RiFileExcel2Line size={16} />
              <span>Excel</span>
            </button>
            <button
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm transition-colors"
              onClick={handleReset}
            >
              <FiRefreshCw size={16} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Date Picker Row - Conditional Rendering */}
        {filterData?.reportPeriod === ReportPeriod.CUSTOM_DATE && (
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="w-full sm:flex-1">
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

            <div className="w-full sm:flex-1">
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

export default BusinessFilters;