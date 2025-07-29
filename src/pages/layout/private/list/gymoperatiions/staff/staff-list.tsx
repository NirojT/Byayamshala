import { Box, TablePagination } from "@mui/material";
import React, { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "../../../../../../global/config";
import StaffFilters from "./component/staff-filters";
import { IStaffDetails } from "./interface";
import { useListStaffStore } from "./store";
import StaffListTop from "./component/staff-list-top";
import { IoMdCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { TbFileInfo } from "react-icons/tb";
import Back from "@/global/components/back/back";
import { useIsDesktop } from "@/global/desktop-checker";

const StaffList: React.FC = () => {
  const navigate = useNavigate();
  const {
    getStaffs,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    filteredData,
    totalLength,
    isSearching,
    currentSearchData,
    searchQuery,
    toggleSelectAll,
    toggleSelectStaff,
  } = useListStaffStore();

  const handleViewProfile = (row: IStaffDetails) => {
    navigate(`/${PrivateRoute}/staff-profile`, { state: row });
  };

  // handlers
  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to first page

    if (isSearching && currentSearchData) {
      await searchQuery(currentSearchData);
    } else {
      await getStaffs();
    }
  };

  // handlers
  const handleChangePage = async (_event: unknown, newPage: number) => {
    setPage(newPage);

    if (isSearching && currentSearchData) {
      await searchQuery(currentSearchData);
    } else {
      await getStaffs();
    }
  };

  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'

  //for seeing tick mark in select all
  const isAllSelected =
    filteredData?.length > 0 && filteredData?.every((item) => item?.isSelected);

  useEffect(() => {
    getStaffs();
  }, [getStaffs]);

  return (
    <Box sx={{ padding: 2, position: "relative" }}>
      <div className="absolute top-0 left-0 mb-10 w-full">
        <StaffListTop />
      </div>
      <Back />

      <div className="flex flex-col items-center mt-14">
        <div className="flex items-center mr-4">
          {/* Filters */}
          <StaffFilters />
          {/* clear search */}
        </div>
      </div>

      {/* table display for large screens */}
      {isDesktop ? (
        <div className="hidden sm:block overflow-hidden border border-gray-200 rounded-lg shadow-sm mt-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-200 text-gray-800">
                <tr className="text-gray-600">
                  <th
                    className="p-3 text-sm font-semibold cursor-pointer"
                    onClick={toggleSelectAll}
                  >
                    {isAllSelected ? (
                      <IoMdCheckbox size={20} />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank size={20} />
                    )}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    SN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Shift
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Staff Type
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData?.length > 0 ? (
                  filteredData?.map((data, index) => (
                    <React.Fragment key={data?.id ?? index}>
                      <tr>
                        <td
                          className="p-3 text-center text-sm cursor-pointer"
                          onClick={() => toggleSelectStaff(data?.id)}
                        >
                          {data?.isSelected ? (
                            <IoMdCheckbox size={20} />
                          ) : (
                            <MdOutlineCheckBoxOutlineBlank size={20} />
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {index + 1}
                        </td>
                        <td
                          className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200 font-semibold
                      flex items-center gap-2 cursor-pointer hover:text-orange-500"
                        >
                          {data?.fullName}
                          {/* Profile Image */}
                          {data?.profileImageName && (
                            <a
                              href={data?.profileImageName}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              title="View attached image"
                              className="block"
                            >
                              <img
                                src={data?.profileImageName}
                                alt={data?.fullName}
                                className="w-14 h-14 rounded-sm object-cover border-2 border-orange-400 shadow"
                              />
                            </a>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {data?.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono shadow-sm">
                            {data?.address}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">
                          {data?.shiftType}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">
                          {data?.staffType}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">
                          <div
                            className="cursor-pointer"
                            title="View Details"
                            onClick={() => handleViewProfile(data)}
                          >
                            <TbFileInfo size={20} color="orange" />
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-[14px] p-3 text-center text-red-400"
                    >
                      No trainers are added
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {
            <div className="flex justify-center dark:text-gray-200 w-full mt-2">
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={totalLength ?? 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="dark:text-gray-200"
              />
            </div>
          }
        </div>
      ) : (
        <div className="sm:hidden flex flex-col h-full p-3">
          {/* for smaller screens - UPDATED to match reference */}
          <th
            className="p-3 text-sm cursor-pointer flex gap-2"
            onClick={toggleSelectAll}
          >
            {isAllSelected ? (
              <IoMdCheckbox size={20} />
            ) : (
              <MdOutlineCheckBoxOutlineBlank size={20} />
            )}
            Select all
          </th>

          {filteredData?.length > 0 ? (
            filteredData?.map((data) => (
              <div
                className="border border-gray-300 rounded-lg text-sm flex flex-col mb-4 p-4 bg-white shadow-md"
                key={data?.id}
              >
                {/* Header with selection and status */}
                <div className="flex items-center justify-between mb-3 border-b border-gray-600 pb-2">
                  <button
                    className="cursor-pointer"
                    onClick={() => toggleSelectStaff(data?.id)}
                  >
                    {data?.isSelected ? (
                      <IoMdCheckbox size={22} className="text-blue-500" />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        size={22}
                        className="text-gray-400"
                      />
                    )}
                  </button>
                  {/* Profile image */}
                  <div className="flex items-center gap-2">
                    {data?.profileImageName && (
                      <a
                        href={data?.profileImageName}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        title="View attached image"
                        className="block"
                      >
                        <img
                          src={data?.profileImageName}
                          alt={data?.fullName}
                          className="w-14 h-14 rounded-full object-cover border-2 border-orange-400 shadow"
                        />
                      </a>
                    )}
                  </div>
                </div>

                {/* Main content grid */}
                <div className="grid grid-cols-2 gap-y-3 text-sm mb-3">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">Name:</span>
                    <span className="font-medium">{data?.fullName}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">Phone:</span>
                    <span className="font-medium">{data?.phone}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">Address:</span>
                    <span className="font-medium">{data?.address}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">Shift:</span>
                    <span className="font-medium">{data?.shiftType}</span>
                  </div>
                </div>

                {/* Action button */}
                <div className="flex justify-end mt-1">
                  <button
                    className="flex items-center justify-center p-2 bg-[#E26300] text-white rounded-md hover:bg-orange-700 shadow-md transition-transform duration-200 transform hover:scale-105 text-xs"
                    onClick={() => handleViewProfile(data)}
                  >
                    <FaEye size={14} className="mr-1" /> Edit Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center items-center p-5 border border-gray-700 rounded-lg bg-gray-800">
              <div className="text-center text-red-400">
                <p>No trainers are added</p>
              </div>
            </div>
          )}

          {/* Pagination for mobile */}
          {filteredData && filteredData?.length > 0 && (
            <div className="mt-4">
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={totalLength ?? 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="text-gray-200"
              />
            </div>
          )}
        </div>
      )}
    </Box>
  );
};

export default StaffList;
