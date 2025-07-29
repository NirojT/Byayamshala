import { Box, TablePagination, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "../../../../../../global/config";

import { ISupplierDetails } from "./interface";
import { useListSupplierStore } from "./store";
import SupplierFilters from "./component/supplier-filters";
import { TbFileInfo } from "react-icons/tb";
import { Edit } from "lucide-react";
import { PartyType } from "@/global/components/enums/enums";
import Back from "@/global/components/back/back";
import { FiRefreshCw } from "react-icons/fi";
import { useIsDesktop } from "@/global/desktop-checker";

const SupplierList: React.FC = () => {
  const navigate = useNavigate();
  const {
    getSupplier,
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
  } = useListSupplierStore();

  const handleViewProfile = (row: ISupplierDetails) => {
    navigate(`/${PrivateRoute}/supplier-profile`, { state: row });
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to first page

    if (isSearching && currentSearchData) {
      await searchQuery(currentSearchData);
    } else {
      await getSupplier();
    }
  };

  const handleChangePage = async (_event: unknown, newPage: number) => {
    setPage(newPage);

    if (isSearching && currentSearchData) {
      await searchQuery(currentSearchData);
    } else {
      await getSupplier();
    }
  };

  const handleClearSearch = async () => {
    await resetSearch();
    await getSupplier();
  };

  const handleNavigateToTransactions = (supplier: ISupplierDetails) => {
    navigate(`/${PrivateRoute}/party-accounts-transaction`, {
      state: {
        partyName: supplier?.name,
        partyType: PartyType.SUPPLIER,
      },
    });
  };
  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'
  useEffect(() => {
    getSupplier();
  }, [getSupplier]);

  return (
    <Box sx={{ padding: 2 }}>
      <Back />

      <Typography variant="h6" gutterBottom>
        Supplier List
      </Typography>

      <div className="flex flex-col items-center justify-center mb-8">
        <div className="flex items-center">
          <SupplierFilters />
          {/* clear search */}
          <button
            onClick={handleClearSearch}
            className="bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 text-[#2E2E2E] rounded-md flex items-center gap-2 transition-colors duration-200 h-[56px]"
          >
            <FiRefreshCw className="text-[#1A1A1A] opacity-70" />
          </button>
        </div>
      </div>
      {/* Table Wrapper - Hide on mobile */}
      {isDesktop ? (
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm mt-4  ">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-200 text-gray-800">
                <tr className="text-gray-600">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    SN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Phone No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    PAN No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredData) && filteredData?.length > 0 ? (
                  filteredData?.map((data, index) => (
                    <React.Fragment key={data?.id ?? index}>
                      <tr className="even:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {data?.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {data?.phoneNo}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {data?.email}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {data?.panNo}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">
                          <div
                            className="cursor-pointer flex gap-2"
                            title="View Details"
                          >
                            <Edit
                              onClick={() =>
                                navigate(
                                  `/${PrivateRoute}/edit/gym/operation/supplier`,
                                  { state: data }
                                )
                              }
                              size={20}
                              color="orange"
                            />
                            <FaMoneyBillWave
                              onClick={() => handleNavigateToTransactions(data)}
                              size={20}
                              color="orange"
                            />
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
                      No suppliers are added
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
        </div>
      ) : (
        <div className=" flex flex-col h-full text-white p-3">
          {Array.isArray(filteredData) &&
            filteredData?.length > 0 &&
            filteredData?.map((data) => (
              <div
                className="border border-gray-400 text-sm flex flex-col items-center justify-center gap-4 mb-4 p-3 rounded-lg bg-[#232323]"
                key={data.id}
              >
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between w-full">
                    <span className="font-semibold text-[#E26300]">Name:</span>
                    <span className="text-white">{data.name}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="font-semibold text-[#E26300]">Phone:</span>
                    <span className="text-white">{data.phoneNo}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="font-semibold text-[#E26300]">Email:</span>
                    <span className="text-white">{data.email}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="font-semibold text-[#E26300]">PAN:</span>
                    <span className="text-white">{data.panNo}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <span className="font-semibold text-[#E26300]">
                      Balance:
                    </span>
                    <span className="text-white">
                      Rs {data.initialBalance} {data.partyMoneyType}
                    </span>
                  </div>
                  <div className="flex justify-between w-full mt-2">
                    <button
                      className="flex items-center justify-center px-3 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-transform duration-200 transform hover:scale-105"
                      title="View Details"
                      onClick={() => handleViewProfile(data)}
                    >
                      <TbFileInfo size={16} />
                      <span className="ml-2">Details</span>
                    </button>
                    <button
                      className="flex items-center justify-center px-3 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 shadow-md transition-transform duration-200 transform hover:scale-105"
                      title="Transactions"
                      onClick={() => handleNavigateToTransactions(data)}
                    >
                      <FaMoneyBillWave size={16} />
                      <span className="ml-2">Transactions</span>
                    </button>
                    <button
                      className="flex items-center justify-center px-3 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 shadow-md transition-transform duration-200 transform hover:scale-105"
                      title="Edit"
                      onClick={() =>
                        navigate(
                          `/${PrivateRoute}/edit/gym/operation/supplier`,
                          {
                            state: data,
                          }
                        )
                      }
                    >
                      <Edit size={16} />
                      <span className="ml-2">Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Card view for smaller screens - Hide on desktop/tablet */}
    </Box>
  );
};

export default SupplierList;
