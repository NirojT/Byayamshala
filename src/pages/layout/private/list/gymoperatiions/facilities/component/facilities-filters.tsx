import React, { useEffect } from "react";
import {
  Box,

  TextField,
 
} from "@mui/material";
import { useListFacilitiesStore } from "../store";
import { IFacilitiesFilterData } from "../interface";
import { Search } from "lucide-react";

const FacilitiesFilters = () => {
  const { searchQuery, facilities, setFilteredData, filters, setFilters } =
    useListFacilitiesStore();

  // Function to handle filter updates
  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  // Function to determine search criteria
  const getSearchData = (): Partial<IFacilitiesFilterData> => {
    const searchData: IFacilitiesFilterData = {
      name: "",
    };

    if (filters.name) searchData.name = filters.name;

    return searchData;
  };

  // Handles API Search
  const handleSearch = async () => {
    const searchData = getSearchData();
    await searchQuery(searchData as IFacilitiesFilterData);
  };

  // Triggers search on pressing Enter in text field
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Updates filtered data when Facilities change
  useEffect(() => {
    setFilteredData(facilities);
  }, [facilities]);

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* Search Input */}
      {/* <Box sx={{ flex: 1, minWidth: 550 }}> */}
      <TextField
        fullWidth
        label="Search Name"
        variant="outlined"
        value={filters.name}
        onChange={(e) => updateFilter("name", e.target.value)}
        onKeyDown={handleEnter}
        className="bg-white"
      />
      {/* </Box> */}

      {/* find search */}
      <button
        onClick={handleSearch}
        className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 text-[#2E2E2E] rounded-md flex items-center gap-2 transition-colors duration-200 h-[56px]"
      >
        <Search className="text-[#1A1A1A] opacity-70" />
      </button>
    </Box>
  );
};

export default FacilitiesFilters;
