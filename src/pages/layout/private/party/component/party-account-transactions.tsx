import { PartyMoneyType, PartyType } from "@/global/components/enums/enums";
import { PrivateRoute } from "@/global/config";
import { useIsDesktop } from "@/global/desktop-checker";
import { Box } from "@mui/material";
import { Edit } from "lucide-react";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PartyTransactionModal from "./component/party-transaction-modal";
import { IPartyAccTransactionDetials } from "./interface";
import { usePartyAccTransactionStore } from "./store";
import CreditReminderModal from "./component/credit-reminder-modal";
import PartyTransactionHeader from "./component/party-transaction-header";

const PartyAccountTransactions: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const partyName: string = location.state?.partyName;
  const partyType: PartyType = location.state?.partyType;
  const {
    partyAccTransaction,
    open,
 
    setOpen,
    setTask,
    setData,
    data,
    partyAccDetail,
    reminderOpen,

    getSpecificPartyAccTransactions,
  } = usePartyAccTransactionStore();

  const handleRowClick = (row: IPartyAccTransactionDetials) => {
    if (row?.partyMoneyType === PartyMoneyType.YOU_GAVE) {
      setTask(PartyMoneyType.YOU_GAVE);
      setOpen(true);
      setData({
        ...data,
        id: row?.id,
        amt: row?.balance,
        notes: row?.notes,
      });
      return;
    } else if (row?.partyMoneyType === PartyMoneyType.YOU_RECEIVED) {
      setTask(PartyMoneyType.YOU_RECEIVED);
      setOpen(true);
      setData({
        ...data,
        id: row?.id,
        amt: row?.balance,
        notes: row?.notes,
      });
      return;
    }
    if (row?.salesId > 0) {
      navigate(`/${PrivateRoute}/add/finance/sales`, { state: row?.salesId });
    }
    if (row?.purchaseId > 0) {
      navigate(`/${PrivateRoute}/add/finance/purchase`, {
        state: row?.purchaseId,
      });
    }
    if (row?.purchaseId == 0 && row?.salesId == 0) {
      navigate(`/${PrivateRoute}/add/finance/credits`, {
        state: { creditId: row?.id },
      });
    }
  };
  const isDesktop = useIsDesktop(640); // 640px matches Tailwind 'sm'
  useEffect(() => {
    if (partyType && partyName) {
      getSpecificPartyAccTransactions(partyName, partyType);
    }
  }, [partyType, partyName, getSpecificPartyAccTransactions]);

  return (
    <div className="min-h-screen font-poppins bg-gradient-to-br from-blue-50 via-indigo-50 to-pink-50">
      <Box
        sx={{
          px: { xs: 1, sm: 3 },
          pt: { xs: 2, sm: 5 },
          pb: 2,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Responsive header */}
        <PartyTransactionHeader />

        {/* Table Wrapper - Desktop */}
        {isDesktop ? (
          <div className=" overflow-hidden border border-gray-200 rounded-2xl shadow-lg mt-8 bg-white font-serif">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-slate-100 text-gray-800">
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider">
                      SN
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider">
                      Transaction Type
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider">
                      Notes
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(partyAccTransaction) &&
                  partyAccTransaction?.length > 0 ? (
                    partyAccTransaction.map((data, index) => (
                      <tr
                        key={data?.id ?? index}
                        className="even:bg-gray-50    "
                      >
                        <td className="px-5 py-3 whitespace-nowrap  text-gray-600">
                          {index + 1}
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap  text-gray-700 font-semibold">
                          {data?.partyName}
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap ">
                          <span
                            className={`inline-flex px-3 py-1 text-xs rounded-full font-semibold shadow-sm ${
                              data?.partyMoneyType ===
                                PartyMoneyType.YOU_RECEIVED ||
                              data?.partyMoneyType === PartyMoneyType.TO_RECEIVE
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-red-800"
                            }`}
                          >
                            {data?.partyMoneyType}
                          </span>
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap  font-bold">
                          <span
                            className={`${
                              data?.partyMoneyType ===
                                PartyMoneyType.YOU_RECEIVED ||
                              data?.partyMoneyType === PartyMoneyType.TO_RECEIVE
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            रु {data?.balance}
                          </span>
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap  text-gray-600">
                          {data?.createdNepDate}
                          <span className="text-xs text-gray-400 ml-1">
                            {data?.localTimeZone}
                          </span>
                        </td>
                        <td className="px-5 py-3 whitespace-nowrap text-gray-600 max-w-[150px] overflow-hidden text-ellipsis">
                          <span
                            className="cursor-pointer text-blue-500 hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(data?.notes); // Or open a modal
                            }}
                          >
                            {data?.notes?.slice(0, 30)}...
                          </span>
                        </td>
                        <td
                          className="px-5 py-3 whitespace-nowrap  text-blue-700 hover:text-[#E26300] cursor-pointer"
                          onClick={() => handleRowClick(data)}
                        >
                          <Edit className="inline mr-1" size={18} /> Edit
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-[15px] px-5 py-6 text-center text-red-400 bg-white"
                      >
                        No transaction records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col gap-4 mt-8">
            {Array.isArray(partyAccTransaction) &&
            partyAccTransaction.length > 0 ? (
              partyAccTransaction.map((data, idx) => (
                <div
                  className="border border-gray-200 rounded-2xl text-sm p-4 bg-white shadow-lg flex flex-col gap-2"
                  key={data.id}
                  onClick={() => handleRowClick(data)}
                >
                  {/* Header with transaction type */}
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-900 ">
                      Transaction #{idx + 1}
                    </span>
                    <span
                      className={`inline-flex px-3 py-1 text-xs rounded-full font-semibold ${
                        data?.partyMoneyType === PartyMoneyType.YOU_RECEIVED
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {data?.partyMoneyType}
                    </span>
                  </div>
                  {/* Info grid */}
                  <div className="flex flex-row flex-wrap gap-y-2">
                    <div className="flex items-center gap-2 w-1/2 min-w-[120px]">
                      <span className="text-gray-400 text-xs">Type:</span>
                      <span className="text-gray-700 font-medium">
                        {data?.partyType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 w-1/2 min-w-[120px]">
                      <span className="text-gray-400 text-xs">Amount:</span>
                      <span
                        className={`font-semibold ${
                          data?.partyMoneyType === PartyMoneyType.YOU_RECEIVED
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}
                      >
                        रु{data?.balance}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 w-1/2 min-w-[120px]">
                      <span className="text-gray-400 text-xs">Date:</span>
                      <span className="text-gray-700">
                        {data?.createdNepDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 w-1/2 min-w-[120px]">
                      <span className="text-gray-400 text-xs">Time:</span>
                      <span className="text-gray-700">
                        {data?.localTimeZone}
                      </span>
                    </div>
                  </div>
                  {/* Notes */}

                  <td className="px-5 py-3 whitespace-nowrap text-gray-600 max-w-[150px] overflow-hidden text-ellipsis">
                    {data?.notes}
                  </td>

                  {/* Action */}
                  <div className="flex justify-end mt-2">
                    <button
                      className="flex items-center gap-1 text-[#E26300] font-semibold underline  hover:text-orange-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(data);
                      }}
                    >
                      <Edit className="w-4" color="orange" />
                      Edit Transaction
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex justify-center items-center p-6 border border-gray-200 rounded-2xl bg-white shadow-lg">
                <div className="text-center text-red-400">
                  <p>No transaction records found</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Mobile View: Card List */}
      </Box>
      {open && <PartyTransactionModal />}
      {partyType === PartyType.MEMBER &&
        partyAccDetail?.partyMoneyType === PartyMoneyType.TO_RECEIVE &&
        reminderOpen &&
         <CreditReminderModal partyName={partyName} />}
    </div>
  );
};

export default PartyAccountTransactions;
