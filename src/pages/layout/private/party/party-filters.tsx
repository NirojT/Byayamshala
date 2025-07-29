import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { usePartyStore } from "./store";
import { PartyMoneyType } from "@/global/components/enums/enums";
import { useEffect } from "react";
import { muiStyles } from "../../super/components/custom-select-styles";

const PartyFilters = () => {
  const { search, setSearch, setFilteredData, partyAccounts } = usePartyStore();

  // Update filtered data when members change or search input changes
  useEffect(() => {
    if (search) {
      setFilteredData(
        partyAccounts.filter(
          (data) =>
            data?.partyName?.toLowerCase()?.includes(search.toLowerCase()) ||
            data?.partyMoneyType?.toLowerCase()?.includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredData(partyAccounts);
    }
  }, [partyAccounts, search, setFilteredData]);

  // Responsive and beautiful filter bar
  return (
    <div className="flex   items-center justify-between gap-4 mb-6   ">
      {/* Search Input */}
      <Box sx={{ flex: 1, minWidth: 220 }}>
        <TextField
          fullWidth
          label="Search by name"
          variant="outlined"
          onChange={(e) => setSearch(e.target.value)}
          sx={muiStyles.select}
        />
      </Box>

      {/* Transaction Type Filter */}
      <Box sx={{ flex: 1, minWidth: 200 }}>
        <FormControl fullWidth variant="outlined" sx={muiStyles.select}>
          <InputLabel>Transaction Type</InputLabel>
          <Select
            onChange={(e) => setSearch(e.target.value as PartyMoneyType)}
            label="Transaction Type"
            displayEmpty
          >
            <MenuItem value={PartyMoneyType.TO_GIVE}>
              {PartyMoneyType.TO_GIVE}
            </MenuItem>
            <MenuItem value={PartyMoneyType.TO_RECEIVE}>
              {PartyMoneyType.TO_RECEIVE}
            </MenuItem>
            <MenuItem value={PartyMoneyType.SETTLED}>
              {PartyMoneyType.SETTLED}
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default PartyFilters;
