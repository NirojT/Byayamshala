import React, { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { useListPlansStore } from "../store";
import { IPlansFilterData } from "../interface";
import { Search } from "lucide-react";

const PlansFilters = () => {
  const { searchQuery, plans, setFilteredData, filters, setFilters } =
    useListPlansStore();

  // Function to handle filter updates
  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  // Function to determine search criteria
  const getSearchData = (): Partial<IPlansFilterData> => {
    const searchData: IPlansFilterData = {
      name: "",
    };

    if (filters.name) searchData.name = filters.name;

    return searchData;
  };

  // Handles API Search
  const handleSearch = async () => {
    const searchData = getSearchData();
    await searchQuery(searchData as IPlansFilterData);
  };

  // Triggers search on pressing Enter in text field
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Updates filtered data when plans change
  useEffect(() => {
    setFilteredData(plans);
  }, [plans]);

  return (
    <Box sx={{ gap: 2, padding: 4, display: "flex" }}>
      {/* Search Input */}
      <Box sx={{ minWidth: 250 }}>
        <TextField
          fullWidth
          label="Search Name"
          variant="outlined"
          value={filters.name}
          onChange={(e) => updateFilter("name", e.target.value)}
          onKeyDown={handleEnter}
          className="bg-white"
        />
      </Box>

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

export default PlansFilters;
