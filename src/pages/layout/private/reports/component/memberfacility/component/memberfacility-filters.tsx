import { ReportPeriod } from "@/global/components/enums/enums";
import { defaultNepaliDate } from "@/global/config";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useListMemberFacilityStore } from "../store";
import MemberFacilityInDepthReport from "./memberfacility-inDepth-report";

const MemberFacilityFilters = () => {
  const location = useLocation();
  const id = location.state?.id;

  const {
    filterData,
    setFilterData,
    searchQuery,
    getMemberFacilityById,
    inDepthReport,
    setInDepthReport,
  } = useListMemberFacilityStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  // Common MUI TextField and Select styling for consistent focus/hover
  const inputSx = {
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
  When normally navigating, the id does not exist, so we need to call the searchQuery function to get the memberships data.
  */
  useEffect(() => {
    if (!id) {
      searchQuery();
    }
  }, [filterData?.reportPeriod, filterData?.startDate, filterData?.endDate]);

  /*
  When navigating from transactions, the id is present, so we need to call get by id.
  */
  useEffect(() => {
    if (id) {
      getMemberFacilityById(id);
    } else {
      searchQuery();
    }
  }, [id]);

  return (
    <div className="font-poppins">
      <div className="sm:w-[30em] md:w-[40em] flex flex-col space-y-4">
        {/* Top Row - Search and Report Type */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Search Input */}
          <Box sx={{ flex: 1, minWidth: 250 }}>
            <TextField
              fullWidth
              name="name"
              label="Search by Member Name"
              variant="outlined"
              value={filterData?.name || ""}
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchQuery();
                }
              }}
              sx={inputSx}
            />
          </Box>
          <div className="flex-1 min-w-[200px]">
            <FormControl
              fullWidth
              variant="outlined"
              size="medium"
              sx={inputSx}
            >
              <InputLabel>MemberFacility Period</InputLabel>
              <Select
                size="medium"
                name="reportPeriod"
                value={filterData?.reportPeriod || ""}
                onChange={handleChange}
                label="MemberFacility Period"
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
        {filterData?.reportPeriod === ReportPeriod.CUSTOM_DATE && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <FormControl fullWidth variant="outlined" sx={inputSx}>
                <InputLabel shrink htmlFor="start-date-picker">
                  Start Date
                </InputLabel>
                <NepaliDatePicker
                  value={
                    filterData?.startDate
                      ? new NepaliDate(filterData?.startDate)
                      : defaultNepaliDate
                  }
                  placeholder="Select Start Date"
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      startDate: e ? e.toString() : "",
                    })
                  }
                
                  className="MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root"
                />
              </FormControl>
            </div>

            <div className="flex-1 min-w-[200px]">
              <FormControl fullWidth variant="outlined" sx={inputSx}>
                <InputLabel shrink htmlFor="end-date-picker">
                  End Date
                </InputLabel>
                <NepaliDatePicker
                  value={
                    filterData?.endDate && new NepaliDate(filterData?.endDate)
                  }
                  placeholder="Select End Date"
                  onChange={(e) =>
                    setFilterData({
                      ...filterData,
                      endDate: e ? e.toString() : "",
                    })
                  }
                
                  className="MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root"
                />
              </FormControl>
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
      {inDepthReport && <MemberFacilityInDepthReport />}
    </div>
  );
};

export default MemberFacilityFilters;
