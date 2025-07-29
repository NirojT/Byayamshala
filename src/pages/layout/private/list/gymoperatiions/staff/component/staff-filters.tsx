import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useListStaffStore } from "../store";
import { IStaffFilterData } from "../interface";
import { ShiftType } from "@/global/components/enums/enums";
import { FiRefreshCw } from "react-icons/fi";
import { Search } from "lucide-react";

const StaffFilters = () => {
  const {
    searchQuery,
    staffs,
    setFilteredData,
    filters,
    setFilters,
    resetSearch,
  } = useListStaffStore();

  // Function to handle filter updates
  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  // Function to determine search criteria
  const getSearchData = (): Partial<IStaffFilterData> => {
    const searchData: IStaffFilterData = {
      fullName: "",
      shift: "",
    };

    if (filters.fullName) searchData.fullName = filters.fullName;
    if (filters.shift && filters.shift !== "All")
      searchData.shift = filters.shift;

    return searchData;
  };

  // Handles API Search
  const handleSearch = async () => {
    const searchData = getSearchData();
    await searchQuery(searchData as IStaffFilterData);
  };
  const handleClearSearch = async () => {
    await resetSearch(); // Reset search state
    
  };
  // Triggers search on pressing Enter in text field
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Updates filtered data when staffs change
  useEffect(() => {
    setFilteredData(staffs);
  }, [staffs]);

  //auto search
  useEffect(() => {
    if (!filters?.fullName && filters?.shift) {
      handleSearch();
    }
  }, [filters]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "evenly",
        flexWrap: "wrap",
        gap: 2,
        marginBottom: 2,
        padding: 4,
      }}
    >
      {/* Search Input */}
      <Box sx={{ flex: 1, minWidth: 350 }}>
        <TextField
          fullWidth
          label="Search Name"
          variant="outlined"
          value={filters.fullName}
          onChange={(e) => updateFilter("fullName", e.target.value)}
          onKeyDown={handleEnter}
          className="bg-white"
        />
      </Box>

      {/* Shift Type Filter */}
      <Box sx={{ flex: 1, minWidth: 200, backgroundColor: "white" }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Shift Type</InputLabel>
          <Select
            value={filters.shift}
            onChange={(e) => updateFilter("shift", e.target.value as ShiftType)}
            label="Shift Type"
          >
            {Object.values(ShiftType).map((shift) => (
              <MenuItem key={shift} value={shift}>
                {shift}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* find search */}
      <button
        onClick={handleSearch}
        className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 text-[#2E2E2E] rounded-md flex items-center gap-2 transition-colors duration-200 h-[56px]"
      >
        <Search className="text-[#1A1A1A] opacity-70" />
      </button>
      {/* Clear Filters Button */}
      <button
        onClick={handleClearSearch}
        className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 text-[#2E2E2E] rounded-md flex items-center gap-2 transition-colors duration-200 h-[56px]"
      >
        <FiRefreshCw className="text-[#1A1A1A] opacity-70" />
      </button>
    </Box>
  );
};

export default StaffFilters;
