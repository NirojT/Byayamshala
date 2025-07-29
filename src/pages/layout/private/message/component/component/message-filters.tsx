// import {
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
// import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
// import "@zener/nepali-datepicker-react/index.css";
// import { defaultNepaliDate } from "@/global/config";
// import { ReportPeriod } from "@/global/components/enums/enums";
// import { useGlobalStore } from "@/global/store";
// import { useAddMessageStore } from "../../store";

// const MessageFilters = () => {
//   const { setToasterData } = useGlobalStore();
//   const {
//     messages,

//     filterData,
//     setFilterData,
//     searchQuery,
//   } = useAddMessageStore();
//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFilterData({
//       ...filterData,
//       [name]: value,
//     });
//   };

//   const handleFind = async () => {
//     const res = await searchQuery();
//     setToasterData({
//       message: res?.message,
//       severity: res?.severity,
//       open: true,
//     });
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "evenly",
//         flexWrap: "wrap",
//         gap: 2,
//         marginBottom: 2,
//       }}
//     >

//       {/* Shift Type Filter */}
//       <Box sx={{ flex: 1, minWidth: 200, backgroundColor: "white" }}>
//         <FormControl fullWidth variant="outlined">
//           <InputLabel>SALES Type</InputLabel>
//           <Select
//             name="reportPeriod"
//             value={filterData?.reportPeriod}
//             onChange={handleChange}
//             label="Message Money Type"
//           >
//             {Object.values(ReportPeriod).map((period) => (
//               <MenuItem key={period} value={period}>
//                 {period}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Start And End Date Filter */}
//       {/* Nepali Date Picker */}
//       {filterData?.reportPeriod === ReportPeriod.CUSTOM_DATE && (
//         <>
//           <div>
//             <label className="block text-sm font-medium text-white mt-2 mb-2">
//               Start Date *
//             </label>

//             <NepaliDatePicker
//               value={
//                 filterData?.startDate
//                   ? new NepaliDate(filterData?.startDate)
//                   : defaultNepaliDate
//               }
//               placeholder="Select date"
//               onChange={(e) =>
//                 setFilterData({
//                   ...filterData,
//                   startDate: e ? e.toString() : "",
//                 })
//               }
//               className="text-sm text-white border border-gray-700 p-4
//                                     rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//           {/* Nepali Date Picker  end*/}
//           {/* End Date Filter */}
//           {/* Nepali Date Picker */}
//           <div>
//             <label className="block text-sm font-medium text-white mt-2 mb-2">
//               End Date *
//             </label>

//             <NepaliDatePicker
//               value={filterData?.endDate && new NepaliDate(filterData?.endDate)}
//               placeholder="Select date"
//               onChange={(e) =>
//                 setFilterData({
//                   ...filterData,
//                   endDate: e ? e.toString() : "",
//                 })
//               }
//               className="text-sm text-white border border-gray-700 p-4
//                                     rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//           {/* Nepali Date Picker  end*/}
//         </>
//       )}
//       {/* Shift Type Filter */}
//       {/* Shift Type Filter */}
//       <Box
//         sx={{
//           minWidth: 200,
//           backgroundColor: "white",
//           hover: "cursor-pointer",
//         }}
//       >
//         <div className="">total message : {messages?.length}</div>

//       </Box>
//     </Box>
//   );
// };

// export default MessageFilters;

import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import { defaultNepaliDate } from "@/global/config";
import { ReportPeriod } from "@/global/components/enums/enums";
import { useGlobalStore } from "@/global/store";
import { useAddMessageStore } from "../../store";
import Back from "@/global/components/back/back";

const MessageFilters = () => {
  const { setToasterData } = useGlobalStore();
  const { messages, filterData, setFilterData, searchQuery } =
    useAddMessageStore();

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
    <Box className="p-5 bg-white font-poppins">
      <div className="flex flex-wrap gap-4 items-end justify-between">
        <Back />

        {/* Shift Type Filter */}
        <div className="flex-1 min-w-[200px]">
          <FormControl
            fullWidth
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#e5e5e5",
                },
                "&:hover fieldset": {
                  borderColor: "#1A1A1A",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1A1A1A",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#2E2E2E",
                "&.Mui-focused": {
                  color: "#1A1A1A",
                },
              },
              "& .MuiSelect-select": {
                color: "#2E2E2E",
              },
            }}
          >
            <InputLabel>Report Period</InputLabel>
            <Select
              name="reportPeriod"
              value={filterData?.reportPeriod}
              onChange={handleChange}
              label="Report Period"
            >
              {Object.values(ReportPeriod).map((period) => (
                <MenuItem key={period} value={period}>
                  {period}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Start And End Date Filter */}
        {filterData?.reportPeriod === ReportPeriod.CUSTOM_DATE && (
          <div className="flex flex-wrap gap-4">
            <div className="min-w-[200px]">
              <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                Start Date *
              </label>

              <div className="datepicker-wrapper">
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
                  className="text-sm text-[#2E2E2E] border border-gray-300 p-2.5 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] bg-white"
                />
              </div>
            </div>

            <div className="min-w-[200px]">
              <label className="block text-sm font-medium text-[#2E2E2E] mb-2">
                End Date *
              </label>

              <div className="datepicker-wrapper">
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
                  className="text-sm text-[#2E2E2E] border border-gray-300 p-2.5 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1A1A1A] focus:border-[#1A1A1A] bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Message Count and Search Button */}
        <div className="flex items-center gap-4">
          <div className="text-[#2E2E2E] text-sm font-medium border border-gray-300 px-4 py-2 rounded-md bg-[#FAFAFA]">
            Total Messages:{" "}
            <span className="font-bold">{messages?.length || 0}</span>
          </div>

          <button
            onClick={handleFind}
            className="px-6 py-2 rounded-md bg-[#E26300] text-white hover:bg-[#D25200] transition-colors text-sm font-medium"
          >
            Search
          </button>
        </div>
      </div>

      {/* Custom style for Nepali Date Picker to match the theme */}
      {/* <style jsx global>{`
        .nepali-date-picker {
          font-family: inherit;
          color: #2E2E2E;
        }
        .nepali-date-picker .header {
          background-color: #1A1A1A !important;
        }
        .nepali-date-picker .selected {
          background-color: #1A1A1A !important;
        }
        .nepali-date-picker .today {
          color: #E26300 !important;
        }
        .nepali-date-picker .day:hover:not(.disabled) {
          background-color: #f5f5f5 !important;
        }
      `}</style> */}
    </Box>
  );
};

export default MessageFilters;
