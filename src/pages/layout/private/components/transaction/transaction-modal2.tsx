import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useBusinessStatsStore } from "../../reports/component/business_stats/store";
import { useEffect, useState } from "react";
import { TransactionType } from "@/global/components/enums/enums";
import { ITransactionDetails } from "../../reports/component/business_stats/interface";
import { nepMonths, PrivateRoute } from "@/global/config";
import { FiArrowRight, FiRefreshCw } from "react-icons/fi";
import { useOpenUserProfile } from "../../store/privatestore";
import TransactionFilter from "./component/transaction-filter";

export function TransactionBell() {
  const navigate = useNavigate();
  const { transactions, getTransaction, filters } = useBusinessStatsStore();
  const { isOpenTransaction, setIsOpenTransaction } = useOpenUserProfile();

  const [isLoading, setIsLoading] = useState(false);

  const handleNav = (tran: ITransactionDetails) => {
    switch (tran?.transactionType) {
      case TransactionType.PURCHASE:
        navigate(`/${PrivateRoute}/reports/purchase`, {
          state: { id: tran?.purchaseId },
        });
        break;
      case TransactionType.SALES:
        navigate(`/${PrivateRoute}/reports/sales`, {
          state: { id: tran?.salesId },
        });
        break;
      case TransactionType.EXPENSE:
        navigate(`/${PrivateRoute}/reports/expenses`, {
          state: { id: tran?.expenseId },
        });
        break;
      case TransactionType.ADMISSION_FEE:
      case TransactionType.CARD_FEE:
      case TransactionType.LOCKER_FEE:
        navigate(`/${PrivateRoute}/member-profile`, {
          state: tran?.memberId,
        });
        break;

      case TransactionType.PAYMENT_INCOMING:
      case TransactionType.PAYMENT_OUTGOING:
        navigate(`/${PrivateRoute}/party`, {
          state: tran?.partyAccountId,
        });
        break;

      case TransactionType.MEMBERSHIP:
        navigate(`/${PrivateRoute}/reports/membership`, {
          state: { id: tran?.memberShipId },
        });
        break;
      case TransactionType.ADDED_FACILITIES:
        navigate(`/${PrivateRoute}/reports/facilities`, {
          state: { id: tran?.memberFacilityId },
        });
        break;
      case TransactionType.SAVING_WITHDRAWAL:
      case TransactionType.SAVING_DEPOSIT:
      case TransactionType.SAVING_ACCOUNT:
        navigate(`/${PrivateRoute}/add/finance/savings/${tran?.savingId}`);
        break;
      default:
        break;
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    try {
      await getTransaction();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [filters]);

  const getTransactionColor = (type: TransactionType) => {
    switch (type) {
      case TransactionType.PURCHASE:
      case TransactionType.EXPENSE:
      case TransactionType.PAYMENT_OUTGOING:
      case TransactionType.SALES_RETURN: // ⬅️ Sales return = loss
        return "text-red-500";
      case TransactionType.SALES:
      case TransactionType.PAYMENT_INCOMING:
      case TransactionType.PURCHASE_RETURN: // ⬅️ Purchase return = gain
        return "text-green-500";
      default:
        return "text-blue-500";
    }
  };

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.PURCHASE:
        return "🛒";
      case TransactionType.PURCHASE_RETURN:
        return "🔄"; // Or any icon you prefer
      case TransactionType.SALES:
        return "💰";
      case TransactionType.SALES_RETURN:
        return "↩️";
        return "💰";
      case TransactionType.EXPENSE:
        return "💸";
      case TransactionType.PAYMENT_INCOMING:
        return "⬇️";
      case TransactionType.PAYMENT_OUTGOING:
        return "⬆️";
      default:
        return "🔹";
    }
  };

  // Helper to format dates more attractively
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const dateParts = dateStr.split("-");
    if (dateParts.length < 3) return dateStr;

    return `${dateParts[2]} ${nepMonths[parseInt(dateParts[1]) - 1]}, ${
      dateParts[0]
    }`;
  };

  return (
    <Sheet open={isOpenTransaction} onOpenChange={setIsOpenTransaction}>
      {/* Bell icon trigger with notification indicator */}

      <SheetContent
        side="right"
        className="overflow-y-auto w-full sm:max-w-md  md:max-w-lg lg:max-w-xl border-l border-gray-200 font-poppins"
      >
        <SheetHeader className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center mt-10">
            <h2 className="text-xl font-bold text-gray-800 bg-gradient-to-r from-[#E26300] to-[#FF8A3D] bg-clip-text text-transparent">
              Recent Transactions
            </h2>

            <div className="flex items-center gap-3 ">
              {/* Refresh Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={refreshData}
                disabled={isLoading}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
                aria-label="Refresh transactions"
              >
                <FiRefreshCw
                  className={`w-4 h-4 text-gray-600 ${
                    isLoading ? "animate-spin" : ""
                  }`}
                />
              </motion.button>
            </div>
          </div>
        </SheetHeader>

        {/* Filter Bar */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm  font-semibold">
            Showing {transactions?.length || 0} transactions
          </p>

          {/* Period Selector */}
          <TransactionFilter refreshData={refreshData} />
        </div>

        {/* Transactions List */}
        <div className="overflow-hidden overflow-y-auto max-h-[calc(100vh-240px)]">
          <AnimatePresence>
            {isLoading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E26300]"></div>
              </div>
            ) : transactions?.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 text-gray-500"
              >
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium">No transactions found</p>
                <p className="mt-2 text-sm">
                  Try changing the filter or refreshing the data
                </p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {transactions?.map((tran) => (
                  <SheetTrigger
                    asChild
                    key={tran?.id}
                    onClick={() => handleNav(tran)}
                    className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tran?.transactionType === TransactionType.SALES ||
                            tran?.transactionType ===
                              TransactionType.PAYMENT_INCOMING
                              ? "bg-green-100"
                              : tran?.transactionType ===
                                  TransactionType.PURCHASE ||
                                tran?.transactionType ===
                                  TransactionType.EXPENSE ||
                                tran?.transactionType ===
                                  TransactionType.PAYMENT_OUTGOING
                              ? "bg-red-100"
                              : "bg-blue-100"
                          }`}
                        >
                          <span className="text-xl">
                            {getTransactionIcon(tran?.transactionType)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 capitalize">
                            {tran?.transactionType
                              .toLowerCase()
                              .replace(/_/g, " ")}
                          </h3>
                          ({tran?.paymentMode})
                          <div className="text-xs text-gray-500 mt-1">
                            {formatDate(tran?.createdNepDate)} •{" "}
                            {tran?.localTimeZone || ""}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div
                          className={`text-right ${getTransactionColor(
                            tran?.transactionType
                          )} font-medium`}
                        >
                          {tran?.transactionType === TransactionType.SALES ||
                          tran?.transactionType ===
                            TransactionType.PURCHASE_RETURN ||
                          tran?.transactionType ===
                            TransactionType.PAYMENT_INCOMING
                            ? "+"
                            : tran?.transactionType ===
                                TransactionType.PURCHASE ||
                              tran?.transactionType ===
                                TransactionType.EXPENSE ||
                              tran?.transactionType ===
                                TransactionType.PAYMENT_OUTGOING ||
                              tran?.transactionType ===
                                TransactionType.SALES_RETURN
                            ? "-"
                            : ""}
                          {tran?.amt?.toLocaleString()}
                        </div>
                        <FiArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </SheetTrigger>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}
