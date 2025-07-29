import { Box, TablePagination } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "../../../../../../global/config";
import { IPlansDetails } from "./interface";
import { useListPlansStore } from "./store";
import PlansFilters from "./component/plans-filters";
import PlansListTop from "./component/plans-list-top";
import { IoMdCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { TbFileInfo } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import Back from "@/global/components/back/back";
import { FiRefreshCw } from "react-icons/fi";
import { useIsDesktop } from "@/global/desktop-checker";
import { useSystemUserStore } from "../../../systemuser/store";
import { SystemUserType } from "@/global/components/enums/enums";
import { HiOutlineUserGroup } from "react-icons/hi";

const PlansList: React.FC = () => {
  const navigate = useNavigate();
  const {
    getPlans,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    filteredData,
    totalLength,
    isSearching,
    currentSearchData,
    searchQuery,
    resetSearch,
    toggleSelectAll,
    toggleSelectPlans,
  } = useListPlansStore();
  const { currentSystemUser } = useSystemUserStore();
  const handleViewProfile = (row: IPlansDetails) => {
    navigate(`/${PrivateRoute}/edit/gym/operation/plans`, { state: row });
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
      await getPlans();
    }
  };

  // handlers
  const handleChangePage = async (_event: unknown, newPage: number) => {
    setPage(newPage);

    if (isSearching && currentSearchData) {
      await searchQuery(currentSearchData);
    } else {
      await getPlans();
    }
  };
  const handleClearSearch = async () => {
    resetSearch(); // Reset search state
    await getPlans(); // Load all Plans
  };

  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'
  //for  seeing tick mark in select all
  const isAllSelected =
    filteredData?.length > 0 && filteredData?.every((item) => item?.isSelected);

  useEffect(() => {
    getPlans();
  }, [getPlans]);

  return (
    <Box sx={{ padding: 2 }}>
      <PlansListTop />
      <Back />

      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex items-center justify-center gap-3">
          <PlansFilters />
          {/* clear search */}
          <button
            onClick={handleClearSearch}
            className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 text-[#2E2E2E] rounded-md
             flex items-center gap-2 transition-colors duration-200 h-[56px]"
          >
            <FiRefreshCw className="text-[#1A1A1A] opacity-70" />
          </button>
        </div>
      </div>

      {/* Table Wrapper - for desktop */}
      {isDesktop ? (
        <div className="  overflow-hidden border border-gray-200 rounded-lg shadow-sm mt-4">
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
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Days
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Discount
                  </th>
                  {currentSystemUser?.systemUserType ===
                    SystemUserType.ADMIN && (
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <HiOutlineUserGroup className="w-4 h-4 text-gray-400" />
                        Added By
                      </div>
                    </th>
                  )}
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
                          onClick={() => toggleSelectPlans(data?.id)}
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
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {data?.planName}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {data?.durationInDays}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {data?.price}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {data?.discount}
                        </td>

                        {/* added by */}

                        {currentSystemUser?.systemUserType ===
                          SystemUserType.ADMIN && (
                          <td className="px-6 py-4 whitespace-nowrap">
                            {data?.addedBy || "unknown"}
                          </td>
                        )}
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
                      colSpan={6}
                      className="text-[14px] p-3 text-center text-red-400"
                    >
                      No plans are added
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center dark:text-gray-200 w-full mt-2">
            <TablePagination
              rowsPerPageOptions={[50, 70, 100]}
              component="div"
              count={totalLength ?? 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              className="dark:text-gray-200"
            />
          </div>
        </div>
      ) : (
        <div className="  flex flex-col h-full p-3">
          {/* Select All Header */}
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
                className="border border-gray-300 rounded-lg text-sm flex flex-col mb-4 p-4 shadow-md"
                key={data?.id}
              >
                {/* Header with selection */}
                <div className="flex items-center justify-between mb-3 border-b border-gray-600 pb-2">
                  <button
                    className="cursor-pointer"
                    onClick={() => toggleSelectPlans(data?.id)}
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

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-400 font-medium">
                      Plan ID: #{data?.id}
                    </span>
                  </div>
                </div>

                {/* Main content */}
                <div className="grid grid-cols-2 gap-y-3 text-sm mb-3">
                  <div className="flex flex-col col-span-2 mb-2">
                    <span className="text-gray-400 text-xs">Plan Name:</span>
                    <span className="font-medium  text-lg">
                      {data?.planName}
                    </span>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-gray-400 text-xs">Duration:</span>
                    <div className="flex items-center gap-1">
                      <LuCalendarDays className="text-blue-400" />
                      <span className="font-medium">
                        {data?.durationInDays} days
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-gray-400 text-xs">Price:</span>
                    <div className="flex items-center gap-1">
                      <RiMoneyDollarCircleLine className="text-green-500" />
                      <span className="font-medium">{data?.price}</span>
                    </div>
                  </div>
                </div>

                {/* Description if available */}
                {data?.description && (
                  <div className="mb-3">
                    <span className="text-gray-400 text-xs block mb-1">
                      Description:
                    </span>
                    <p className="text-sm text-gray-300 bg-gray-700 bg-opacity-50 p-2 rounded-md">
                      {data?.description}
                    </p>
                  </div>
                )}
                {/* added by */}

                {currentSystemUser?.systemUserType === SystemUserType.ADMIN && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data?.addedBy || "unknown"}
                  </td>
                )}
                {/* Action button */}
                <div className="flex justify-end mt-1">
                  <button
                    className="sm:text-gray-600 text-sm sm:text-base border-none sm:border sm:border-gray-800
                   sm:p-2 rounded-lg hover:text-[#E26300] transition-colors flex items-center justify-center
                   gap-2 sm:hover:scale-110 hover:zoom-out-50 underline sm:no-underline text-[#E26300]"
                    onClick={() => handleViewProfile(data)}
                  >
                    <TbFileInfo className="w-4" color="orange" />
                    Edit Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center items-center p-5 border border-gray-700 rounded-lg bg-gray-800">
              <div className="text-center text-red-400">
                <p>No plans are added</p>
              </div>
            </div>
          )}

          {/* Pagination for mobile */}
          {filteredData && filteredData?.length > 0 && (
            <div className="mt-4">
              <TablePagination
                rowsPerPageOptions={[50, 70, 100]}
                component="div"
                count={totalLength ?? 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="text-black"
              />
            </div>
          )}
        </div>
      )}

      {/* UPDATED for smaller screens */}
    </Box>
  );
};

export default PlansList;
