import Back from "@/global/components/back/back";
import { PartyMoneyType, PartyType } from "@/global/components/enums/enums";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePartyAccTransactionStore } from "../store";
import PartyTranasctionFilters from "./party-transaction-filters";
import { Minus, Plus } from "lucide-react";

const PartyTransactionHeader = () => {
  const location = useLocation();
  const partyName: string = location.state?.partyName;
  const partyType: PartyType = location.state?.partyType;

  const {
    handleReceive,
    handleGive,
    partyAccDetail,
    reminderOpen,
    setReminderOpen,

    getSpecificPartyAccTransactions,
  } = usePartyAccTransactionStore();

  useEffect(() => {
    if (partyType && partyName) {
      getSpecificPartyAccTransactions(partyName, partyType);
    }
  }, [partyType, partyName, getSpecificPartyAccTransactions]);

  return (
    <div className="bg-white rounded-2xl shadow p-4 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <Back />

        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 capitalize">
            {partyAccDetail?.partyName}
          </h2>
          <p
            className={`text-sm sm:text-base font-medium ${
              partyAccDetail?.balance > 0 ? "text-green-600" : "text-gray-600"
            }`}
          >
            {partyAccDetail?.balance <= 0
              ? "रु 0"
              : `रु ${partyAccDetail?.balance}`}
            <span className="ml-2 text-xs text-gray-500">
              {partyAccDetail?.partyMoneyType}
            </span>
          </p>
        </div>

        {partyType === PartyType.MEMBER &&
          partyAccDetail?.partyMoneyType === PartyMoneyType.TO_RECEIVE && (
            <button
              onClick={() => setReminderOpen(!reminderOpen)}
              className={`text-sm sm:text-base font-semibold text-indigo-600 hover:text-indigo-800 transition
                  `}
              // ${reminded ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {/* {reminded ? "Reminder Sended" : "Send Reminder"} */}
              Send Reminder
            </button>
          )}
      </div>

      <div className="w-full">
        <PartyTranasctionFilters />
      </div>

      <div className="flex flex-wrap gap-2 justify-end">
        <button
          onClick={handleReceive}
          className="flex items-center gap-2 bg-green-100 border border-green-300 hover:bg-green-200 text-green-800 px-4 py-2 rounded-md text-sm font-semibold transition"
        >
          <Plus className="w-4 h-4" />
          Received <span className="hidden sm:inline font-normal">(Debit)</span>
        </button>

        <button
          onClick={handleGive}
          className="flex items-center gap-2 bg-blue-100 border border-blue-300 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-md text-sm font-semibold transition"
        >
          <Minus className="w-4 h-4 text-red-600" />
          Gave <span className="hidden sm:inline font-normal">(Credit)</span>
        </button>
      </div>
    </div>
  );
};

export default PartyTransactionHeader;
