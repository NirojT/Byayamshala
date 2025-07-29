import { ReportPeriod } from "@/global/components/enums/enums";
import { defaultNepaliDate } from "@/global/config";
import { useGlobalStore } from "@/global/store";
import { 
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { useEffect } from "react";
import { BsCalendarDate } from "react-icons/bs"; 
import { useLocation } from "react-router-dom";
import { useListSalesStore } from "../store";
import SalesInDepthReport from "./sales-inDepth-report";
import { RiSearchLine } from "react-icons/ri";

const SalesFilters = () => {
  const location = useLocation();
  const id = location.state?.id;
  const { setToasterData } = useGlobalStore();
  const {
   
    filterData,
    setFilterData,
    searchQuery,
    getSalesById,
    
 

    inDepthReport,
    setInDepthReport,
  } = useListSalesStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  const handleFind = async () => {
    const res = await searchQuery();
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });
  };

 

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      background: "#f9fafb",
      borderRadius: 2,
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
      getSalesById(id);
    } else {
      searchQuery();
    }
  }, [id]);

  return (
    <div className="font-poppins">
      <div className="flex flex-col space-y-3 sm:space-y-4">
        {/* Top Row - Search and Report Type */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-stretch sm:items-end">
          <div className="w-full sm:w-auto flex-1">
            <TextField
              size="small"
              fullWidth
              label="Search by Bill No/Party"
              variant="outlined"
              name="billNo"
              value={filterData?.billNo || ""}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleFind();
                }
              }}
              sx={textFieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiSearchLine className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="w-full sm:w-auto flex-1">
            <FormControl
              fullWidth
              variant="outlined"
              size="small"
              sx={textFieldSx}
            >
              <InputLabel className="text-sm">Sales Period</InputLabel>
              <Select
                name="reportPeriod"
                value={filterData?.reportPeriod || ""}
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
                  <MenuItem
                    key={period}
                    value={period}
                    className="text-sm capitalize"
                  >
                    {period
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Date Picker Row */}
        {filterData?.reportPeriod === ReportPeriod.CUSTOM_DATE && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="w-full sm:w-auto flex-1">
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
                className="w-full text-xs sm:text-sm border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#16a34a] focus:border-transparent bg-white"
              />
            </div>
            <div className="w-full sm:w-auto flex-1">
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
                className="w-full text-xs sm:text-sm border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#16a34a] focus:border-transparent bg-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Report Toggle */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-orange-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-orange-600 transition-colors duration-300 flex items-center gap-2"
          onClick={() => setInDepthReport(!inDepthReport)}
        >
          {inDepthReport ? (
            <>
              <span>✖️</span> Close Report
            </>
          ) : (
            <>
              <span>📊</span> View In-Depth Report
            </>
          )}
        </button>
      </div>

      {/* In-depth Report */}
      {inDepthReport && <SalesInDepthReport />}
    </div>
  );
};

export default SalesFilters;
