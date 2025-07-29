import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import { useItemCategoryStore } from "./form/category/store";
import { IItemFilterData } from "./list/interface";
import { useItemListStore } from "./list/store";
import { useLocation } from "react-router-dom";
import { muiStyles } from "@/pages/layout/super/components/custom-select-styles";
import {
  MdOutlineClear,
  MdSearch,
  MdCategory,
  MdWarning,
} from "react-icons/md";
import { useTheme } from "@mui/material/styles";

const InventoryTop = () => {
  const {
    searchQuery,
    items,
    setFilteredData,
    filters,
    setFilters,
    resetSearch,
    getItems,
  } = useItemListStore();

  const location = useLocation();
  const dashStock = location.state?.lowStock;
  const { itemCategorys, getItemCategorys } = useItemCategoryStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const updateFilter = (key: keyof typeof filters, value: string | boolean) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const getSearchData = (): Partial<IItemFilterData> => {
    const searchData: IItemFilterData = {
      name: "",
      category: "",
      stock: "",
    };

    if (filters.name) searchData.name = filters.name;
    if (filters.category && filters.category !== "All")
      searchData.category = filters.category;
    searchData.stock = filters?.stock;

    return searchData;
  };

  const handleSearch = async () => {
    const searchData = getSearchData();
    await searchQuery(searchData as IItemFilterData);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = async () => {
    await resetSearch();
    await getItems();
  };

  useEffect(() => {
    setFilteredData(items);
  }, [items]);

  useEffect(() => {
    getItemCategorys();
  }, []);

  useEffect(() => {
    if (dashStock) {
      setFilters({ ...filters, stock: "low" });
    }
  }, [dashStock]);

  useEffect(() => {
    if (filters?.category || filters?.stock) {
      handleSearch();
    }
  }, [filters]);

  useEffect(() => {
    if (!dashStock) {
      getItems();
    }
  }, [getItems, dashStock]);

  return (
    <Box
      className="font-poppins"
      sx={{
        display: "flex",
        flexDirection: { xs: "row", sm: "row" },
        flexWrap: "wrap",
        alignItems: "center",
        gap: { xs: 1, sm: 2 },
        mb: 3,
        bgcolor: "white",
        borderRadius: 3,
        boxShadow: 1,
        p: { xs: 2, sm: 3 },
      }}
    >
      {/* Search Input */}
      <Box
        sx={{ flex: 2, minWidth: { xs: 120, sm: 180 }, mr: { xs: 0, sm: 1 } }}
      >
        <TextField
          fullWidth
          label="Search Name or Code"
          variant="outlined"
          value={filters.name}
          onChange={(e) => updateFilter("name", e.target.value)}
          onKeyDown={handleEnter}
          sx={muiStyles.select}
          size="small"
          InputProps={{
            style: { borderRadius: 10, fontWeight: 500, fontSize: 16 },
            startAdornment: (
              <MdSearch className="mr-2 text-gray-400" size={20} />
            ),
          }}
        />
      </Box>

      {/* Category Type Filter */}
      <Box
        sx={{ flex: 1, minWidth: { xs: 100, sm: 170 }, mr: { xs: 0, sm: 1 } }}
      >
        <FormControl
          fullWidth
          variant="outlined"
          size="small"
          sx={muiStyles.select}
        >
          <InputLabel>
            <span className="flex items-center gap-1">
              <MdCategory className="text-gray-400" /> Category
            </span>
          </InputLabel>
          <Select
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            label="Category"
            sx={{
              fontSize: 15,
              fontWeight: 500,
              borderRadius: 2,
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {itemCategorys?.map((category) => (
              <MenuItem key={category?.id} value={category?.category}>
                {category?.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Low Stock Filter */}
      <Box
        sx={{ flex: 1, minWidth: { xs: 90, sm: 130 }, mr: { xs: 0, sm: 1 } }}
      >
        <FormControl
          fullWidth
          variant="outlined"
          sx={muiStyles.select}
          size="small"
        >
          <InputLabel>
            <span className="flex items-center gap-1">
              <MdWarning className="text-gray-400" /> Stock
            </span>
          </InputLabel>
          <Select
            value={filters.stock}
            onChange={(e) => updateFilter("stock", e.target.value)}
            label="Stock"
            sx={{
              fontSize: 15,
              fontWeight: 500,
              borderRadius: 2,
            }}
          >
            <MenuItem value="healthy">Healthy</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Clear Search Button */}
      <Box
        sx={{
          minWidth: { xs: 60, sm: 120 },
          mt: { xs: 0, sm: 0 },
          flex: { xs: "none", sm: 1 },
        }}
      >
        <button
          onClick={handleClearSearch}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#E26300] border border-[#E26300] hover:bg-[#e88837] text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md shadow-md cursor-pointer transition-colors duration-200 font-semibold"
        >
          <MdOutlineClear size={20} />
          <span className={isMobile ? "hidden" : ""}>Clear</span>
        </button>
      </Box>
    </Box>
  );
};

export default InventoryTop;
