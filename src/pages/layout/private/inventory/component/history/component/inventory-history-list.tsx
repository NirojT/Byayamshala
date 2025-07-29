import { Box, TablePagination } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useItemHistoryListStore } from "../store";
import StockAddDeductModal from "./component/stock-add-deduct-modal";
import { IItemHistoryDetails } from "../interface";
import { ActivityType } from "@/global/components/enums/enums";
import { PrivateRoute } from "@/global/config";

const InventoryHistoryList: React.FC = () => {
  const item = useLocation().state;
  const navigate = useNavigate();
  const {
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    filteredData,
    setFilteredData,
    totalLength,
    isSearching,
    currentSearchData,
    searchQuery,
    getItemsHistory,
    itemsHistory,
    setData,
    clearData,
    data,
  } = useItemHistoryListStore();

  // handlers
  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to first page

    if (isSearching && currentSearchData) {
      await searchQuery(currentSearchData);
    } else {
      await getItemsHistory(item?.id);
    }
  };

  // handlers
  const handleChangePage = async (_event: unknown, newPage: number) => {
    setPage(newPage);

    if (isSearching && currentSearchData) {
      await searchQuery(currentSearchData);
    } else {
      await getItemsHistory(item?.id);
    }
  };

  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState("");

  const handleAdd = () => {
    setOpen(true);
    setTask("Add");
    clearData();
  };

  const handleDeduct = () => {
    setOpen(true);
    setTask("Deduct");
    clearData();
  };

  const handleRowClick = (history: IItemHistoryDetails) => {
    switch (history?.activityType) {
      case ActivityType.DEDUCT:
        setTask("Deduct");
        setOpen(true);
        setData({
          ...data,
          itemId: item?.id,
          id: history?.id, // this is the id for history for update purpose
          quantity: history?.quantity,
          date: history?.date,
          remarks: history?.remarks,
        });
        break;
      case ActivityType.ADD:
        setTask("Add");
        setOpen(true);
        setData({
          ...data,
          itemId: item?.id,
          id: history?.id, // this is the id for history for update purpose
          quantity: history?.quantity,
          date: history?.date,
          remarks: history?.remarks,
        });
        break;
      case ActivityType.SALES:
        if (history?.salesId === 0 && history?.ordersId > 0) {
          navigate(`/${PrivateRoute}/orders`, {
            state: history?.ordersId,
          });

          return;
        } else {
          navigate(`/${PrivateRoute}/add/finance/sales`, {
            state: history?.salesId,
          });
        }

        break;
      case ActivityType.PURCHASE:
        navigate(`/${PrivateRoute}/add/finance/purchase`, {
          state: history?.purchaseId,
        });
        break;
      case ActivityType.PURCHASE_RETURN:
        navigate(`/${PrivateRoute}/add/finance/purchase-returns`, {
          state: history?.purchaseId,
        });
        break;
      case ActivityType.SALES_RETURN:
        navigate(`/${PrivateRoute}/add/finance/sales-returns`, {
          state: history?.salesId,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getItemsHistory(item?.id);
  }, [getItemsHistory]);

  useEffect(() => {
    setFilteredData(itemsHistory);
  }, [itemsHistory]);

  return (
    <div className="min-h-screen font-poppins">
      <Box sx={{ padding: 2, position: "relative" }}>
        <div className="absolute top-0 left-0 mb-10 w-full flex justify-between items-center">
          <div className="flex w-full justify-end items-center gap-3">
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-[#2E2E2E] px-4 py-2 rounded-md shadow-sm cursor-pointer transition-colors duration-200 hover:border-[#E26003] hover:text-[#E26003]"
            >
              <span className="font-medium">Add Stock</span>
            </button>
            <button
              onClick={handleDeduct}
              className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-[#2E2E2E] px-4 py-2 rounded-md shadow-sm cursor-pointer transition-colors duration-200 hover:border-red-500 hover:text-red-500"
            >
              <span className="font-medium">Deduct Stock</span>
            </button>
          </div>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm mt-16">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-200 text-gray-800">
                <tr className="text-gray-600">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    SN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Added At
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredData) && filteredData?.length > 0 ? (
                  filteredData.map((data, index) => (
                    <React.Fragment key={data?.id ?? index}>
                      <tr
                        className="even:bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => handleRowClick(data)}
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          <span
                            className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                              data?.activityType === ActivityType.ADD
                                ? "bg-green-100 text-green-800"
                                : data?.activityType === ActivityType.DEDUCT
                                ? "bg-red-100 text-red-800"
                                : data?.activityType === ActivityType.SALES
                                ? "bg-blue-100 text-blue-800"
                                : data?.activityType === ActivityType.PURCHASE
                                ? "bg-purple-100 text-purple-800"
                                : data?.activityType ===
                                  ActivityType.PURCHASE_RETURN
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {data?.activityType}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                          {data?.createdNepDate}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <span
                            className={`${
                              data?.quantity > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {data?.quantity > 0 && "+"}
                            {data?.quantity}
                          </span>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-[14px] p-3 text-center text-red-400"
                    >
                      No history records found
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
      </Box>

      {open && (
        <StockAddDeductModal
          open={open}
          setOpen={setOpen}
          id={item?.id}
          task={task}
          setTask={setTask}
        />
      )}
    </div>
  );
};

export default InventoryHistoryList;
