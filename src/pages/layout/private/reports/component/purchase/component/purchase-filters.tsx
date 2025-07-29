import { ReportPeriod } from "@/global/components/enums/enums";
import { defaultNepaliDate } from "@/global/config";
import { useGlobalStore } from "@/global/store";
import {
    Button,
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
import { BsCalendarDate, BsListOl } from "react-icons/bs";
import { RiMoneyDollarCircleLine, RiSearchLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
import { IPurchaseDetails } from "../interface";
import { useListPurchaseStore } from "../store";

const PurchaseFilters = () => {
  const location = useLocation();
  const id = location.state?.id;
  const { setToasterData } = useGlobalStore();
  const {
    purchase,
    totalAmt,
    setTotalAmt,
    filterData,
    setFilterData,
    searchQuery,
    getPurchaseById,
  } = useListPurchaseStore();

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

  useEffect(() => {
    const total = purchase?.reduce((acc: number, curr: IPurchaseDetails) => {
      return acc + curr?.totalAmt;
    }, 0);
    setTotalAmt(total);
  }, [purchase]);

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
      getPurchaseById(id);
    } else {
      searchQuery();
    }
  }, [id]);

  return (
    <div className="font-poppins">
      <div className="flex flex-col space-y-3 sm:space-y-4">
        {/* Top Row - Search and Report Type */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-stretch sm:items-end">
          {/* search by bill */}
          <div className="w-full sm:w-auto flex-1">
            <TextField
              size="small"
              fullWidth
              label="Search by Bill No"
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
          {/* search by party */}
          <div className="w-full sm:w-auto flex-1">
            <TextField
              size="small"
              fullWidth
              label="Search by party name"
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
            <FormControl fullWidth variant="outlined" size="small" sx={textFieldSx}>
              <InputLabel className="text-sm">Purchase Period</InputLabel>
              <Select
                name="reportPeriod"
                value={filterData?.reportPeriod || ""}
                onChange={handleChange}
                label="Purchase Period"
                className="text-sm"
                IconComponent={(props) => (
                  <BsCalendarDate className={`${props.className} text-gray-500`} size={18} />
                )}
              >
                {Object.values(ReportPeriod).map((period) => (
                  <MenuItem key={period} value={period} className="text-sm capitalize">
                    {period.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Button
            variant="contained"
            size="medium"
            sx={{
              background: "#E26003",
              color: "#fff",
              px: 3,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: "none",
              minWidth: "120px",
              boxShadow: "none",
              "&:hover": {
                background: "#c44d00",
                boxShadow: "none",
              },
            }}
            onClick={handleFind}
            startIcon={<RiSearchLine />}
            className="mt-2 sm:mt-0"
          >
            Search
          </Button>
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
                className="w-full text-xs sm:text-sm border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E26003] focus:border-transparent bg-white"
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
                className="w-full text-xs sm:text-sm border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E26003] focus:border-transparent bg-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Summary Stats - responsive design */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-6 mt-3 sm:mt-4 sm:justify-end">
        <div className="bg-gradient-to-tr from-slate-50 to-slate-100 rounded-lg p-3 shadow border border-gray-200 flex items-center min-w-[120px]">
          <div className="mr-2 bg-gray-100 p-2 rounded-full">
            <BsListOl className="text-gray-500" size={18} />
          </div>
          <div>
            <p className="text-xxs sm:text-xs font-medium text-gray-500">
              Total Entries
            </p>
            <p className="text-lg sm:text-xl font-bold text-gray-800">
              {purchase?.length || 0}
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-tr from-blue-50 to-blue-100 rounded-lg p-3 shadow border border-blue-100 flex items-center min-w-[140px]">
          <div className="mr-2 bg-blue-100 p-2 rounded-full">
            <RiMoneyDollarCircleLine className="text-blue-500" size={18} />
          </div>
          <div>
            <p className="text-xxs sm:text-xs font-medium text-blue-700">
              Total Purchase
            </p>
            <p className="text-lg sm:text-xl font-bold text-blue-700">
              रु {totalAmt?.toLocaleString() || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseFilters;