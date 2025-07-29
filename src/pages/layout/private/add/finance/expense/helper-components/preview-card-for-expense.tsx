import { FiCalendar, FiCreditCard, FiDollarSign } from "react-icons/fi";
import { useAddExpenseFormStore } from "../store";
import { defaultNepaliDate } from "@/global/config";

const PreviewCardForExpense = () => {
  const { data, showPreview } = useAddExpenseFormStore();

  return (
    <div className="lg:col-span-2">
      <div
        className={`sticky top-6 transition-all duration-500 ${
          showPreview ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-[#FAFAFA] border-b border-gray-100 p-4">
            <h3 className="text-[#1A1A1A] font-medium text-sm flex items-center">
              <span className="mr-2">Expense Preview</span>
              <span className="bg-[#E26300]/10 text-[#E26300] text-xs px-2 py-0.5 rounded-full">
                Live Preview
              </span>
            </h3>
          </div>

          <div className="p-5">
            {data?.expenseType ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <div className="p-2.5 rounded-full bg-[#FAFAFA] border border-gray-100">
                    <FiDollarSign className="h-4 w-4 text-[#E26300]" />
                  </div>
                  <div>
                    <h4 className="text-[#1A1A1A] font-medium">
                      {data.expenseType}
                    </h4>
                    <div className="text-[#2E2E2E]/70 text-xs">Expense Record</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[#2E2E2E]/70 text-xs">Date</p>
                    <p className="text-[#2E2E2E] text-sm flex items-center gap-2">
                      <FiCalendar className="text-[#1A1A1A] w-3 h-3" />
                      {(data.date || defaultNepaliDate).toString()}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[#2E2E2E]/70 text-xs">Payment Method</p>
                    <p className="text-[#2E2E2E] text-sm flex items-center gap-2">
                      <FiCreditCard className="text-[#1A1A1A] w-3 h-3" />
                      {data.paymentMode || "Not selected"}
                    </p>
                  </div>
                </div>

                {data.totalAmt && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <span className="text-[#2E2E2E]/80 text-sm">Amount:</span>
                      <span className="text-base font-medium text-[#E26300]">
                        NPR {data.totalAmt}
                      </span>
                    </div>
                  </div>
                )}

                {data.notes && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-[#2E2E2E]/70 text-xs mb-2">Notes:</p>
                    <p className="text-[#2E2E2E] text-xs bg-[#FAFAFA] p-3 rounded-lg border border-gray-100">
                      {data.notes}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="bg-[#FAFAFA] p-4 rounded-full mb-3 border border-gray-100">
                  <FiDollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-[#2E2E2E]/70 text-sm">
                  Fill in the expense details to see a preview
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Example Report Card */}
        {showPreview && data?.expenseType && (
          <div className="mt-6 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden animate-fadeIn">
            <div className="p-4 border-b border-gray-100">
              <h4 className="text-[#1A1A1A] font-medium text-sm">Expense Information</h4>
            </div>

            <div className="p-4">
              <div className="bg-[#FAFAFA] rounded-lg p-3 mb-3 border border-gray-100">
                <p className="text-xs text-[#2E2E2E]/70">
                  This expense will appear in:
                </p>
                <ul className="mt-2 space-y-2.5">
                  <li className="flex items-center text-xs">
                    <span className="bg-[#E26300]/10 p-1 rounded-full mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-[#E26300]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                        />
                      </svg>
                    </span>
                    <span className="text-[#1A1A1A]">Expense Reports</span>
                  </li>
                  <li className="flex items-center text-xs">
                    <span className="bg-[#E26300]/10 p-1 rounded-full mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 text-[#E26300]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </span>
                    <span className="text-[#1A1A1A]">Financial Analytics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewCardForExpense;