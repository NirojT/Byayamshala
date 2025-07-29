import { defaultNepaliDate } from "@/global/config";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaChair, FaTable } from "react-icons/fa";
import { TbEdit, TbPlus } from "react-icons/tb";
import TableModalForm from "./component/table-modal-form";
import { ITableDetails } from "./interface";
import { useTableStore } from "./store";
import Back from "@/global/components/back/back";

const Tables: React.FC = () => {
  const { tables, getTables, open, toggleOpen, setData, data } =
    useTableStore();
  const [searchTerm] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);

  useEffect(() => {
    getTables();

    // Set responsive view based on screen size
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on load

    return () => window.removeEventListener("resize", handleResize);
  }, [getTables]);

  const handleOpen = () => {
    toggleOpen();
  };

  const handleEdit = (table: ITableDetails) => {
    setData({
      ...data,
      id: table?.id,
      tableNo: table?.tableNo,
      capacity: table?.capacity,
    });
    handleOpen();
  };

  // Filter tables based on search term
  const filteredTables = tables?.filter(
    (table) =>
      table?.tableNo?.toString().includes(searchTerm) ||
      table?.capacity?.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen font-poppins bg-[#FAFAFA] text-[#2E2E2E]">
      <Box sx={{ padding: { xs: 2, md: 4 }, position: "relative" }}>
        {/* Header Section */}
        <Card
          elevation={1}
          className="mb-6"
          sx={{
            borderRadius: 2,
            backgroundColor: "#FAFAFA",
            overflow: "visible",
            position: "relative",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <Back />
          <CardContent
            sx={{ py: 3, px: { xs: 2, sm: 4 } }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="bg-[#FAFAFA] p-2 rounded-lg shadow-sm mr-3 border border-[#1A1A1A]/10">
                <FaTable className="text-3xl text-[#E26300]" />
              </div>
              <div>
                <Typography
                  variant="h5"
                  className="text-[#1A1A1A] font-bold tracking-wide"
                >
                  Manage Tables
                </Typography>
                <Typography variant="body2" className="text-[#2E2E2E]/70">
                  {tables?.length || 0} tables available •{" "}
                  {defaultNepaliDate.toString()}
                </Typography>
              </div>
            </div>
            <div className="flex items-center w-full sm:w-auto space-x-2">
              <Button
                variant="contained"
                onClick={handleOpen}
                startIcon={<TbPlus />}
                className="bg-[#E26300] text-white hover:bg-[#E26300]/90 font-medium shadow-sm"
                sx={{
                  borderRadius: 1.5,
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  backgroundColor: "#E26300",
                  "&:hover": {
                    backgroundColor: "#D25800",
                  },
                }}
              >
                Add New Table
              </Button>
            </div>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1A1A1A]/10 to-transparent"></div>
        </Card>

        {/* Search and Filter Section */}
        {/* <div className="mb-6 bg-[#FAFAFA] rounded-lg p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px] relative">
              <TbSearch className="absolute left-0 top-5 transform -translate-y-1/2 text-[#2E2E2E]/50 ml-3" size={18} />
              <input
                type="text"
                placeholder="Search tables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-3 pl-10 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent"
              />
            </div>
            
            <div className="w-full sm:w-auto flex flex-wrap gap-3">
              <select className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent">
                <option value="">All Tables</option>
                <option value="available">Available Only</option>
                <option value="occupied">Occupied Only</option>
              </select>
              <select className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors bg-transparent">
                <option value="tableNo">Sort by Table Number</option>
                <option value="capacity">Sort by Capacity</option>
                <option value="newest">Sort by Newest</option>
                <option value="oldest">Sort by Oldest</option>
              </select>
            </div>
          </div>
        </div> */}

        {/* Modal for Add Table */}
        {open && <TableModalForm />}

        {/* Table Grid View for Mobile */}
        {isMobile && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {Array.isArray(filteredTables) && filteredTables?.length > 0 ? (
              filteredTables.map((table, index) => (
                <Card
                  key={table?.id ?? index}
                  elevation={0}
                  className="hover:shadow-md transition-all duration-300 border border-[#1A1A1A]/10"
                  sx={{ borderRadius: 2, backgroundColor: "#FAFAFA" }}
                >
                  <CardContent className="relative p-0">
                    <div className="bg-[#FAFAFA] h-24 flex items-center justify-center relative border-b border-[#1A1A1A]/10">
                      <div className="absolute top-2 right-2">
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            table?.isAvailable
                              ? "bg-[#1A1A1A] text-[#FAFAFA]"
                              : "bg-[#E26300] text-white"
                          }`}
                        >
                          {table?.isAvailable ? "Available" : "Occupied"}
                        </div>
                      </div>
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-sm border border-[#1A1A1A]/10 ${
                          table?.isAvailable ? "bg-[#FAFAFA]" : "bg-[#FAFAFA]"
                        }`}
                      >
                        <Typography
                          variant="h5"
                          className={`font-bold ${
                            table?.isAvailable
                              ? "text-[#1A1A1A]"
                              : "text-[#E26300]"
                          }`}
                        >
                          {table?.tableNo}
                        </Typography>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <Typography
                            variant="body1"
                            className="font-bold text-[#1A1A1A]"
                          >
                            Table {table?.tableNo}
                          </Typography>
                          <div className="flex items-center text-[#2E2E2E]/70 mt-1">
                            <FaChair className="mr-1" size={14} />
                            <span className="text-sm">
                              Capacity: {table?.capacity}
                            </span>
                          </div>
                        </div>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(table)}
                          className="border border-[#1A1A1A]/10 text-[#E26300]"
                        >
                          <TbEdit />
                        </IconButton>
                      </div>
                      <Divider className="my-2 bg-[#1A1A1A]/10" />
                      <Typography
                        variant="caption"
                        className="text-[#2E2E2E]/70"
                      >
                        Added: {table?.createdDate}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card
                className="col-span-full p-8 text-center"
                elevation={0}
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#FAFAFA",
                  border: "1px solid rgba(26, 26, 26, 0.1)",
                }}
              >
                <Typography variant="h6" className="text-[#2E2E2E] mb-2">
                  {searchTerm ? "No matching tables found" : "No tables found"}
                </Typography>
                <Typography variant="body2" className="text-[#2E2E2E]/70 mb-4">
                  {searchTerm
                    ? "Try a different search term"
                    : "Start by adding your first table"}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  startIcon={<TbPlus />}
                  className="bg-[#E26300] text-white"
                  sx={{
                    borderRadius: 1.5,
                    backgroundColor: "#E26300",
                    "&:hover": {
                      backgroundColor: "#D25800",
                    },
                  }}
                >
                  Add New Table
                </Button>
              </Card>
            )}
          </div>
        )}

        {/* Table Display Section - Desktop */}
        <div
          className={`${isMobile ? "hidden" : "block"} overflow-hidden mt-4`}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 2,
              backgroundColor: "#FAFAFA",
              border: "1px solid rgba(26, 26, 26, 0.1)",
            }}
            className="overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#1A1A1A]/10">
                <thead className="bg-[#FAFAFA]">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider">
                      Table Number
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider">
                      Added At
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#2E2E2E]/70 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-[#FAFAFA] divide-y divide-[#1A1A1A]/10">
                  {Array.isArray(filteredTables) &&
                  filteredTables?.length > 0 ? (
                    filteredTables.map((table, index) => (
                      <tr
                        key={table?.id ?? index}
                        className="hover:bg-[#1A1A1A]/[0.02] transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center text-[#1A1A1A] font-medium">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`mr-2 text-${
                                table?.isAvailable ? "[#1A1A1A]" : "[#E26300]"
                              }`}
                            >
                              <FaTable />
                            </div>
                            <Typography
                              variant="body1"
                              className="font-medium text-[#1A1A1A]"
                            >
                              Table {table?.tableNo}
                            </Typography>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-[#2E2E2E]">
                            <FaChair className="mr-1" />
                            {table?.capacity}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              table?.isAvailable
                                ? "bg-[#1A1A1A] text-[#FAFAFA]"
                                : "bg-[#E26300] text-white"
                            }`}
                          >
                            {table?.isAvailable ? "Available" : "Occupied"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2E2E2E]/70">
                          {table?.createdNepDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            <Tooltip title="Edit Table">
                              <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleEdit(table)}
                                className="bg-[#E26300] text-white min-w-0 p-2"
                                sx={{
                                  minWidth: "unset",
                                  borderRadius: 1,
                                  backgroundColor: "#E26300",
                                  "&:hover": {
                                    backgroundColor: "#D25800",
                                  },
                                }}
                              >
                                <TbEdit size={18} />
                              </Button>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <FaTable className="text-4xl text-[#1A1A1A]/20 mb-4" />
                          <Typography
                            variant="h6"
                            className="text-[#2E2E2E] mb-2"
                          >
                            {searchTerm
                              ? "No matching tables found"
                              : "No tables found"}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-[#2E2E2E]/70 mb-4"
                          >
                            {searchTerm
                              ? "Try a different search term"
                              : "Start by adding your first table"}
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={handleOpen}
                            startIcon={<TbPlus />}
                            className="bg-[#E26300] text-white"
                            sx={{
                              borderRadius: 1.5,
                              backgroundColor: "#E26300",
                              "&:hover": {
                                backgroundColor: "#D25800",
                              },
                            }}
                          >
                            Add New Table
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </Box>
    </div>
  );
};

export default Tables;
