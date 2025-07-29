import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { defaultNepaliDate } from "@/global/config";
import { ReportPeriod } from "@/global/components/enums/enums";
import { useGlobalStore } from "@/global/store";
import { useVisitorsListStore } from "../store";

const VisitorsFilters = () => {
  const { setToasterData } = useGlobalStore();
  const { visitors, filterData, setFilterData, searchQuery } =
    useVisitorsListStore();

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

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        marginBottom: 2,
        alignItems: "flex-end",
      }}
    >
      {/* Search Input */}
      <Box sx={{ flex: 1, minWidth: 220 }}>
        <TextField
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFind();
            }
          }}
          fullWidth
          label="Search By name"
          variant="outlined"
          name="name"
          value={filterData?.name}
          onChange={handleChange}
        />
      </Box>

      {/* Period Filter */}
      <Box sx={{ flex: 1, minWidth: 180 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Period</InputLabel>
          <Select
            name="reportPeriod"
            value={filterData?.reportPeriod}
            onChange={handleChange}
            label="Period"
          >
            {Object.values(ReportPeriod).map((period) => (
              <MenuItem key={period} value={period}>
                {period}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Start and End Date Filters (only if custom) */}
      {filterData?.reportPeriod === ReportPeriod.CUSTOM_DATE && (
        <>
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <FormControl fullWidth>
              <InputLabel shrink>Start Date *</InputLabel>
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
               
              
              />
            </FormControl>
          </Box>
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <FormControl fullWidth>
              <InputLabel shrink>End Date *</InputLabel>
              <NepaliDatePicker
                value={
                  filterData?.endDate
                    ? new NepaliDate(filterData?.endDate)
                    : defaultNepaliDate
                }
                placeholder="Select date"
                onChange={(e) =>
                  setFilterData({
                    ...filterData,
                    endDate: e ? e.toString() : "",
                  })
                }
               
                
              />
            </FormControl>
          </Box>
        </>
      )}

      {/* Total Visitors */}
      <Box sx={{ minWidth: 170 }}>
        <Typography
          variant="subtitle2"
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          Total visitors: {visitors?.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default VisitorsFilters;
