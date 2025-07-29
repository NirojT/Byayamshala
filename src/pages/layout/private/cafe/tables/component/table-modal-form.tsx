// import React from "react";
// import { Box, Typography, Modal, TextField, Button } from "@mui/material";
// import { useTableStore } from "../store";
// import { useGlobalStore } from "@/global/store";
// const style = {
//   position: "absolute" as const,
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   borderRadius: 3,
//   boxShadow: 24,
//   p: 4,
// };
// const TableModalForm = () => {
//   const { data, setData, clearData, open, toggleOpen, saveTable } =
//     useTableStore();
//   const { setToasterData } = useGlobalStore();
//   const handleClose = () => {
//     clearData();
//     toggleOpen();
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setData({
//       ...data,
//       [e.target.name]:
//         e.target.name === "capacity" ? +e.target.value : e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     const res = await saveTable(data);
//     setToasterData({
//       message: res?.message,
//       severity: res?.severity,
//       open: true,
//     });

//     if (res?.severity === "success") {
     
//       handleClose();
//     }
//   };

//   return (
//     <Modal open={open} onClose={handleClose}>
//       <Box sx={style}>
//         <Typography variant="h6" component="h2" gutterBottom>
//           {data?.id > 0 ? "Update" : "Add"} New Table
//         </Typography>

//         <TextField
//           fullWidth
//           margin="normal"
//           name="tableNo"
//           label="Table Number"
//           value={data?.tableNo}
//           onChange={handleChange}
//         />
//         <TextField
//           fullWidth
//           margin="normal"
//           name="capacity"
//           label="Capacity"
//           type="number"
//           value={data?.capacity || ""}
//           onChange={handleChange}
//         />

//         <Box className="flex justify-end mt-4 gap-2">
//           <Button variant="outlined" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="contained" onClick={handleSubmit}>
//             Save
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default TableModalForm;



import { useGlobalStore } from "@/global/store";
import { Modal, Typography } from "@mui/material";
import React from "react";
import { FaTable } from "react-icons/fa";
import { useTableStore } from "../store";

const TableModalForm = () => {
  const { data, setData, clearData, open, toggleOpen, saveTable } = useTableStore();
  const { setToasterData } = useGlobalStore();


  const handleClose = () => {
    clearData();
    toggleOpen();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.name === "capacity" ? +e.target.value : e.target.value,
    });
  };

  const handleSubmit = async () => {
    const res = await saveTable(data);
    setToasterData({
      message: res?.message,
      severity: res?.severity,
      open: true,
    });

    if (res?.severity === "success") {
      handleClose();
    }
  };

  return (
    <Modal 
      open={open} 
      onClose={handleClose}
      BackdropProps={{
        style: { backgroundColor: 'rgba(26, 26, 26, 0.5)' }
      }}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#FAFAFA] rounded-xl shadow-lg p-6 outline-none">
        {/* Modal Header */}
        <div className="border-b border-[#1A1A1A]/10 pb-4 mb-6">
          <div className="flex items-center">
            <div className="bg-[#FAFAFA] p-2 rounded-lg shadow-sm mr-3 border border-[#1A1A1A]/10">
              <FaTable className="text-2xl text-[#E26300]" />
            </div>
            <div>
              <Typography 
                variant="h6" 
                component="h2" 
                className="text-xl font-bold text-[#1A1A1A]"
              >
                {data?.id > 0 ? "Update" : "Add"} Table
              </Typography>
            </div>
          </div>
        </div>
        
        {/* Form Fields */}
        <div className="space-y-6">
          {/* Table Number Field */}
          <div>
            <label htmlFor="tableNo" className="block text-sm text-[#2E2E2E]/70 mb-1">
              Table Number
            </label>
            <input
              id="tableNo"
              name="tableNo"
              type="text"
              value={data?.tableNo || ""}
              onChange={handleChange}
              placeholder="Enter table number"
              className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent"
            />
          </div>
          
          {/* Capacity Field */}
          <div>
            <label htmlFor="capacity" className="block text-sm text-[#2E2E2E]/70 mb-1">
              Capacity (Seats)
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              value={data?.capacity || ""}
              onChange={handleChange}
              placeholder="Enter seating capacity"
              className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent"
            />
          </div>
          
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end mt-8 gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-[#1A1A1A]/10 text-[#2E2E2E] hover:bg-[#1A1A1A]/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-[#E26300] text-white hover:bg-[#D25800] transition-colors"
          >
            {data?.id > 0 ? "Update" : "Save"} Table
          </button>
        </div>
        
        {/* Form Footer */}
        <div className="mt-6 pt-4 border-t border-[#1A1A1A]/10 text-center">
          <Typography variant="caption" className="text-[#2E2E2E]/50 text-xs">
            {data?.id > 0 ? "Updating existing table ID: " + data?.id : "Creating new table"}
          </Typography>
        </div>
      </div>
    </Modal>
  );
};

export default TableModalForm;