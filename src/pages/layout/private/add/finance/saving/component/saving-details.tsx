import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  ISavingArchiveDetails,
  ISavingDetails,
} from "../../../../list/finance/saving/interface";
import { useListSavingStore } from "../../../../list/finance/saving/store";
import { useAddSavingAcc } from "../store";
import SavingFilters from "./filter/saving-filters";
import AddSavingAmtModal from "./form/add-saving-amt-form ";
import EditSavingAmtModal from "./form/edit-saving-amt-form";
import SummaryCard from "./summary-card";
import { Box } from "@mui/material";
import Back from "@/global/components/back/back";

const SavingDetails = () => {
  const { accountId } = useParams(); // Get the account ID from the URL
  const state = useLocation();
  const account: ISavingDetails = state.state;
  const id = Number(accountId || 0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const {
     
    savingArchives,
    savingBalance,
    filterData,
    setFilterData,
    searchQuery,
    totalAddedAmt,
    totalWithDrawAmt,
  } = useListSavingStore();

  const { editData, setEditData } = useAddSavingAcc();

  const handleEdit = async (data: ISavingArchiveDetails) => {
    setEditData({
      ...editData,
      amt: data?.amt,
      remarks: data?.remarks,
      id: data?.id,
    });
    setEditModalOpen(true);
  };

 

  useEffect(() => {
    if (accountId || id) {
      const ids = Number(accountId || id || 0);

      setFilterData({
        ...filterData,
        savingId: ids,
      });
    }
  }, [accountId, id]);
  useEffect(() => {
    if (filterData?.savingId > 0) searchQuery();
  }, [
    filterData?.savingId,
    filterData?.reportPeriod,
    filterData?.startDate,
    filterData?.endDate,
  ]);

  return (
    <div className=" font-poppins min-h-screen p-4  text-[#2E2E2E] ">
      <Back />
      <div className="flex items-center justify-between mb-4 p-2">
        <h2 className="text-lg font-semibold capitalize text-center">
          {account?.accountName}
        </h2>

        <button
          // className="bg-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          className="mt-2 text-[#E26003] underline rounded-md  text-center "
          onClick={() => setIsModalOpen(true)}
        >
          Add Transaction
        </button>
      </div>

      {/* top */}
      <div className="mb-6 ">
        {/* filter */}
        <div className="flex items-center justify-between mb-4 p-2"></div>

        <div className="flex flex-col sm:flex-row justify-end  items-center gap-6">
          <div className="flex gap-4 justify-center">
            <div>
              {/* Summary Section */}
              <Box
                sx={{
                  flex: 1,
                  minWidth: 300,
                  backgroundColor: "white",
                  padding: 3,
                  borderRadius: 2,
                  boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-3">
                  Summary
                </h3>
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
              </Box>
            </div>

            {/* summary card */}
            <div>
              <SummaryCard account={account} savingBalance={savingBalance} />
            </div>
          </div>

          <SavingFilters />
        </div>
      </div>

      {/* table display for large screens */}
      {/* Table Wrapper */}
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm mt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-200 text-gray-800">
              <tr className="text-gray-600">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  SN
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Remarks
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  createdDate
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="">
              {Array.isArray(savingArchives) && savingArchives?.length > 0 ? (
                savingArchives.map((data, index: number) => (
                  <tr
                    key={data?.id ?? index}
                    // className="flex items-start justify-between px-1"
                  >
                    <td className="p-3 text-center text-sm cursor-pointer">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                      {data?.amt}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                      {data?.activity}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                      {data?.remarks}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                      {data?.createdNepDate}
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-200">
                      <button
                        // className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md transition-transform duration-200 transform hover:scale-105"
                        className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-200"
                        title="View Details"
                        onClick={() => handleEdit(data)}
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="p-6 text-center text-red-500 font-semibold"
                  >
                    No Saving are added
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding New Account */}
      {isModalOpen && (
        <AddSavingAmtModal setIsModalOpen={setIsModalOpen} id={id} />
      )}
      {editModalOpen && (
        <EditSavingAmtModal setEditModalOpen={setEditModalOpen} />
      )}
    </div>
  );
};

export default SavingDetails;
