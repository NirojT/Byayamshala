import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { defaultNepaliDate } from "@/global/config"; 
import { ISavingArchiveDetails } from "@/pages/layout/private/list/finance/saving/interface";
import { useListSavingStore } from "@/pages/layout/private/list/finance/saving/store";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { useEffect } from "react";
import { ReportPeriod, SavingActivity } from "@/global/components/enums/enums";

const SavingFilters = () => {
 
  const {
    savingArchives,
   
    setTotalAddedAmt,
    setTotalWithDrawAmt,
    filterData,
    setFilterData,
    // searchQuery,
  } = useListSavingStore();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  // const handleFind = async () => {
  //   const res = await searchQuery();
  //   setToasterData({
  //     message: res?.message,
  //     severity: res?.severity,
  //     open: true,
  //   });
  // };

  useEffect(() => {
    const totalAdded = savingArchives
      .filter((acc) => acc?.activity === SavingActivity.ADD)
      .reduce((acc: number, curr: ISavingArchiveDetails) => {
        return acc + curr?.amt;
      }, 0);
    const totalWithDraw = savingArchives
      .filter((acc) => acc?.activity === SavingActivity.WITHDRAW)
      .reduce((acc: number, curr: ISavingArchiveDetails) => {
        return acc + curr?.amt;
      }, 0);
    setTotalAddedAmt(totalAdded);
    setTotalWithDrawAmt(totalWithDraw);
  }, [savingArchives]);

  return (
    <Box
      sx={{
        display: "flex",
        // justifyContent: "space-between",
        // flexWrap: "wrap",
        gap: 3,
        // backgroundColor: "#FAFAFA",
        padding: 4,
        top:0,

      }}
    >
      {/* Saving Period Filter */}
      <Box sx={{ flex: 1, minWidth: 250 , marginTop:'auto', marginBottom:'auto'}}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Saving Period</InputLabel>
          <Select
            name="reportPeriod"
            value={filterData?.reportPeriod}
            onChange={handleChange}
            label="Saving Period"
          >
            {Object.values(ReportPeriod).map((period) => (
              <MenuItem key={period} value={period}>
                {period}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Custom Date Filters */}
      {filterData?.reportPeriod === ReportPeriod.CUSTOM_DATE && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
          <div className="">
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              Start Date *
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
              className="text-sm p-3 text-[#2E2E2E] bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E26003] focus:border-[#E26003]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2 ">
              End Date *
            </label>
            <NepaliDatePicker
              value={filterData?.endDate && new NepaliDate(filterData?.endDate)}
              placeholder="Select date"
              onChange={(e) =>
                setFilterData({
                  ...filterData,
                  endDate: e ? e.toString() : "",
                })
              }
              className="text-sm p-3 text-[#2E2E2E] bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E26003] focus:border-[#E26003]"
            />
          </div>
        </div>
      )}

      {/* Summary Section */}
      {/* <Box
        sx={{
          flex: 1,
          minWidth: 300,
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">Summary</h3>
        <p className="text-sm text-[#2E2E2E] mb-1">
          Total Entries:{" "}
          <span className="font-medium">{savingArchives?.length}</span>
        </p>
        <p className="text-sm text-[#2E2E2E] mb-1">
          Total Added Saving:{" "}
          <span className="font-medium">Rs {totalAddedAmt}</span>
        </p>
        <p className="text-sm text-[#2E2E2E]">
          Total Withdraw Saving:{" "}
          <span className="font-medium">Rs {totalWithDrawAmt}</span>
        </p>
      </Box> */}
    </Box>
  );
};

export default SavingFilters;
