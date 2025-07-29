import { Box, TablePagination } from "@mui/material";
import React from "react";
import { MdAttachMoney, MdCategory, MdWarning } from "react-icons/md";
import { TbFileInfo } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "../../../../../../global/config";
import { IItemDetails } from "./interface";
import { useItemListStore } from "./store";
import { useIsDesktop } from "@/global/desktop-checker";

const InventoryList: React.FC = () => {
  const navigate = useNavigate();
  const {
    getItems,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    filteredData,
    totalLength,
    isSearching,
    currentSearchData,
    searchQuery,
    filters,
  } = useItemListStore();

  const handleViewHistory = (row: IItemDetails) => {
    console.log(`View history clicked for Item with ID: ${row?.id}`);
    navigate(`/${PrivateRoute}/inventory/history`, { state: row });
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
      await getItems();
    }
  };

  // handlers
  const handleChangePage = async (_event: unknown, newPage: number) => {
    setPage(newPage);

    if (isSearching && currentSearchData) {
      await searchQuery(currentSearchData);
    } else {
      await getItems();
    }
  };
  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'

  return (
    <div className="min-h-screen font-poppins">
      <Box sx={{ padding: 2, position: "relative" }}>
        {/* <div className="absolute top-0 left-0 mb-10 w-full"> */}

        {/* </div> */}

        {/* Table Wrapper */}
        {isDesktop ? (
          <div className=" overflow-hidden border border-gray-200 rounded-lg shadow-sm mt-4">
            <div className="overflow-x-auto">
              <table className="  min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-200 text-gray-800">
                  <tr className="text-gray-600">
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      SN
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Cost Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Selling Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Stocks
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(filteredData) && filteredData?.length > 0 ? (
                    filteredData.map((data, index) => (
                      <React.Fragment key={data?.id ?? index}>
                        <tr
                          className="even:bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                          onClick={() => handleViewHistory(data)}
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {data?.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            {data?.category}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            Rs {data?.cp}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            Rs {data?.sp}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                            <span
                              className={`${
                                data?.stockQuantity <= 5
                                  ? "text-red-500 font-medium"
                                  : ""
                              }`}
                            >
                              {data?.stockQuantity} {data?.primaryUnit}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200">
                            <div
                              className="cursor-pointer"
                              title="View History"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewHistory(data);
                              }}
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
                        No items are added
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {(!filters?.category || !filters?.name || !filters?.stock) &&
              filteredData &&
              filteredData?.length > 0 && (
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
              )}
          </div>
        ) : (
          <div className="  flex flex-col h-full p-1">
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              filteredData.map((data, index) => (
                <div
                  key={data?.id || index}
                  onClick={() => handleViewHistory(data)}
                  className={`
                  rounded-xl shadow-md border border-gray-200 mb-4 bg-gradient-to-tr from-white to-slate-50
                  transition-transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden
                  group cursor-pointer
                `}
                >
                  {/* Ribbon for low stock */}
                  {data?.stockQuantity <= 5 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-[11px] font-bold rounded-bl-xl z-10 shadow">
                      Low Stock
                    </span>
                  )}

                  <div className="flex items-center justify-between px-4 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-blue-100 p-2">
                        <MdCategory className="text-blue-500" size={22} />
                      </span>
                      <span className="text-[15px] font-bold text-gray-800">
                        {data.name}
                      </span>
                    </div>
                    <button
                      className="flex items-center justify-center p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 shadow-md transition-transform duration-200 transform hover:scale-105"
                      title="View History"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewHistory(data);
                      }}
                    >
                      <TbFileInfo size={17} />
                    </button>
                  </div>

                  <div className="px-4 py-2">
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <span className="font-medium text-gray-500">
                        Category:
                      </span>
                      <span className="text-blue-700 font-medium">
                        {data.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <MdAttachMoney className="text-green-500" />
                      <span className="font-medium text-gray-500">Cost:</span>
                      <span className="text-green-700 font-semibold">
                        Rs {data.cp}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm mb-1">
                      <MdAttachMoney className="text-indigo-500" />
                      <span className="font-medium text-gray-500">Sell:</span>
                      <span className="text-indigo-700 font-semibold">
                        Rs {data.sp}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MdWarning
                        className={
                          data?.stockQuantity <= 5
                            ? "text-red-500"
                            : "text-gray-400"
                        }
                      />
                      <span className="font-medium text-gray-500">Stock:</span>
                      <span
                        className={
                          data?.stockQuantity <= 5
                            ? "text-red-500 font-bold"
                            : "text-gray-800 font-semibold"
                        }
                      >
                        {data.stockQuantity} {data.primaryUnit}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-red-400 py-5">
                No items are added
              </div>
            )}

            {/* Pagination for mobile */}
            {(!filters?.category || !filters?.name || !filters?.stock) &&
              filteredData &&
              filteredData?.length > 0 && (
                <div className="mt-1 mb-3">
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

        {/* Mobile Cards */}
      </Box>
    </div>
  );
};

export default InventoryList;
