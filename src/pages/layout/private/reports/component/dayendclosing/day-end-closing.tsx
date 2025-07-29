 


import Back from "@/global/components/back/back";
import { defaultNepaliDate, PrivateRoute } from "@/global/config";
import { useGlobalStore } from "@/global/store";
import { useEffect } from "react";
import { FaArrowRight, FaCalendarAlt, FaChartLine, FaCheck, FaExclamationTriangle, FaFileAlt, FaHistory, FaMoneyBillWave, FaTimes, FaUniversity, FaUserCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDayEndClosingStore } from "./store";

const DayEndClosings: React.FC = () => {
  const navigate = useNavigate();
  const { getToday, dayEndClosingDetails, data, setData, entry, currentTab, setCurrentTab } = useDayEndClosingStore();
  const { setToasterData } = useGlobalStore();

  useEffect(() => {
    getToday();
  }, [getToday]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);

    const newData = {
      ...data,
      [name]: parsedValue || 0,
    };

    if (name === "actualClosingCash") {
      newData.cashDiscrepancy =
        (parsedValue || 0) - (dayEndClosingDetails?.expectedClosingCash || 0);
    }

    if (name === "actualClosingBank") {
      newData.bankDiscrepancy =
        (parsedValue || 0) - (dayEndClosingDetails?.expectedClosingBank || 0);
    }

    setData(newData);
  };

  const handleTextareaChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    // if (data?.actualClosingCash <= 0 || data?.actualClosingBank <= 0) {
    //   setToasterData({
    //     message: "Please fill the Closing Cash and Closing Bank",
    //     severity: "error",
    //     open: true,
    //   });
    //   return;
    // }

    const expectedCash = dayEndClosingDetails?.expectedClosingCash || 0;
    const expectedBank = dayEndClosingDetails?.expectedClosingBank || 0;

    const cashDiscrepancy = data?.actualClosingCash - expectedCash;
    const bankDiscrepancy = data?.actualClosingBank - expectedBank;

    setData({
      ...data,
      cashDiscrepancy,
      bankDiscrepancy,
    });

    const res = await entry();
    setToasterData({
      message: res.message,
      severity: res.severity,
      open: true,
    });
  };

 
  // Get discrepancy class
  const getDiscrepancyClass = (amount: number | undefined) => {
    if (!amount) return "text-[#2E2E2E]";
    if (amount > 0) return "text-green-600";
    if (amount < 0) return "text-red-600";
    return "text-[#2E2E2E]";
  };

  // Calculate total discrepancy
  const totalDiscrepancy = (data?.cashDiscrepancy || 0) + (data?.bankDiscrepancy || 0);
  const hasDiscrepancy = totalDiscrepancy !== 0;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2E2E2E]">
      {/* Header */}
      <div className="border-b border-[#1A1A1A]/10 p-5 flex justify-between items-center bg-white shadow-sm">
         <Back />
        <div className="flex items-center">
          <div className="bg-[#E26300]/10 p-2.5 rounded-lg mr-3">
            <FaCalendarAlt className="text-[#E26300]" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1A1A1A]">Day-End Closing</h1>
            <p className="text-sm text-[#2E2E2E]/70 mt-0.5">
              {defaultNepaliDate.toString()}
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/${PrivateRoute}/reports/day_end_closing/list`)}
          className="flex items-center px-4 py-2 bg-[#E26300]/10 hover:bg-[#E26300]/20 text-[#E26300] rounded-lg transition-colors"
        >
          <FaHistory className="mr-2" size={14} />
          <span className="font-medium">View History</span>
        </button>
      </div>

      <div className="max-w-5xl mx-auto p-5 sm:p-6 md:p-8">
        <div className="bg-white rounded-xl border border-[#1A1A1A]/10 overflow-hidden shadow-sm">
          {/* Main Card Header */}
          <div className="p-6 border-b border-[#1A1A1A]/10 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A] flex items-center">
                <span className="mr-2">Financial Summary</span>
                {hasDiscrepancy && (
                  <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${totalDiscrepancy > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {totalDiscrepancy > 0 ? <FaCheck size={10} className="mr-1" /> : <FaExclamationTriangle size={10} className="mr-1" />}
                    {totalDiscrepancy > 0 ? 'Surplus' : 'Deficit'}
                  </span>
                )}
              </h2>
              <p className="text-sm text-[#2E2E2E]/70">Complete your end of day financial reconciliation</p>
            </div>
            <div className="flex items-center">
              <span className="bg-[#E26300]/10 text-[#E26300] px-3 py-1 rounded-full text-sm font-medium">
                Daily Closing
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-[#1A1A1A]/10">
            <div className="flex">
              <button
                onClick={() => setCurrentTab("cash")}
                className={`px-6 py-4 text-sm font-medium flex items-center transition-colors relative ${currentTab === "cash"
                    ? "text-[#E26300]"
                    : "text-[#2E2E2E]/70 hover:text-[#2E2E2E]"
                  }`}
              >
                <FaMoneyBillWave className="mr-2" size={16} />
                Cash Summary
                {currentTab === "cash" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E26300]"></div>
                )}
              </button>

              <button
                onClick={() => setCurrentTab("bank")}
                className={`px-6 py-4 text-sm font-medium flex items-center transition-colors relative ${currentTab === "bank"
                    ? "text-[#E26300]"
                    : "text-[#2E2E2E]/70 hover:text-[#2E2E2E]"
                  }`}
              >
                <FaUniversity className="mr-2" size={16} />
                Bank Summary
                {currentTab === "bank" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E26300]"></div>
                )}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Cash Summary Tab */}
            {currentTab === "cash" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Expected Values Card */}
                  <div className="bg-[#FAFAFA] rounded-lg p-5 border border-[#1A1A1A]/10">
                    <h3 className="text-base font-medium text-[#1A1A1A] mb-4 flex items-center">
                      <FaChartLine className="mr-2 text-[#E26300]" size={16} />
                      Expected Cash Values
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                        <span className="text-sm text-[#2E2E2E]/70">Opening Cash</span>
                        <span className="font-medium"> रु {dayEndClosingDetails?.openingCash}</span>
                      </div>

                      <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                        <span className="flex items-center text-sm text-[#2E2E2E]/70">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          Cash Income
                        </span>
                        <span className="font-medium text-green-600">+ रु {(dayEndClosingDetails?.totalCashIncome || 0)?.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                        <span className="flex items-center text-sm text-[#2E2E2E]/70">
                          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                          Cash Expense
                        </span>
                        <span className="font-medium text-red-600">- रु {dayEndClosingDetails?.totalCashExpense}</span>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-base font-medium">Expected Closing</span>
                        <span className="text-lg font-bold text-[#1A1A1A]">
                           रु {dayEndClosingDetails?.expectedClosingCash}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actual Values Card */}
                  <div className="bg-[#FAFAFA] rounded-lg p-5 border border-[#1A1A1A]/10">
                    <h3 className="text-base font-medium text-[#1A1A1A] mb-4 flex items-center">
                      <FaMoneyBillWave className="mr-2 text-[#E26300]" size={16} />
                      Actual Cash Entry
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border border-[#1A1A1A]/10 shadow-sm">
                        <label htmlFor="actualClosingCash" className="block text-sm text-[#2E2E2E]/70 mb-2">
                          Enter Actual Closing Cash Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]/70">रु</span>
                          <input
                            id="actualClosingCash"
                            name="actualClosingCash"
                            value={data?.actualClosingCash || ""}
                            onChange={handleInputChange}
                            type="number"
                            placeholder="0.00"
                            className="p-3 pl-8 w-full text-[#2E2E2E] focus:outline-none text-lg font-medium rounded-md border border-[#1A1A1A]/20 focus:border-[#E26300] transition-colors bg-transparent"
                          />
                        </div>
                      </div>

                      <div className={`px-4 py-3 rounded-lg flex justify-between items-center ${!data?.cashDiscrepancy
                          ? "bg-[#1A1A1A]/5"
                          : data?.cashDiscrepancy > 0
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                        }`}>
                        <div className="flex items-center">
                          {data?.cashDiscrepancy ? (
                            data?.cashDiscrepancy > 0 ? (
                              <FaCheck size={14} className="mr-2 text-green-600" />
                            ) : (
                              <FaTimes size={14} className="mr-2 text-red-600" />
                            )
                          ) : (
                            <FaArrowRight size={14} className="mr-2 text-[#2E2E2E]/50" />
                          )}
                          <span className="text-sm font-medium">Discrepancy:</span>
                        </div>
                        <div className={`${getDiscrepancyClass(data?.cashDiscrepancy)} font-bold`}>
                           रु {data?.cashDiscrepancy}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="cashDiscrepancyReason" className="block text-sm text-[#2E2E2E]/70 mb-2">
                          {data?.cashDiscrepancy && data?.cashDiscrepancy !== 0 ? (
                            <>
                              <span className={data?.cashDiscrepancy > 0 ? "text-green-600" : "text-red-600"}>
                                {data?.cashDiscrepancy > 0 ? "Surplus" : "Deficit"} Reason
                              </span>
                              <span className="text-[#2E2E2E]/70"> (required)</span>
                            </>
                          ) : (
                            "Notes (optional)"
                          )}
                        </label>
                        <textarea
                          id="cashDiscrepancyReason"
                          name="cashDiscrepancyReason"
                          value={data?.cashDiscrepancyReason || ""}
                          onChange={handleTextareaChange}
                          placeholder={data?.cashDiscrepancy && data?.cashDiscrepancy !== 0
                            ? "Explain the reason for the cash discrepancy"
                            : "Add any notes about today's cash closing"}
                          className={`p-3 w-full text-[#2E2E2E] focus:outline-none text-sm rounded-md border ${data?.cashDiscrepancy && data?.cashDiscrepancy !== 0
                              ? "border-[#E26300]/50 focus:border-[#E26300]"
                              : "border-[#1A1A1A]/20 focus:border-[#1A1A1A]/40"
                            } transition-colors bg-white resize-none min-h-[80px]`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Summary Tab */}
            {currentTab === "bank" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Expected Values Card */}
                  <div className="bg-[#FAFAFA] rounded-lg p-5 border border-[#1A1A1A]/10">
                    <h3 className="text-base font-medium text-[#1A1A1A] mb-4 flex items-center">
                      <FaChartLine className="mr-2 text-[#E26300]" size={16} />
                      Expected Bank Values
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                        <span className="text-sm text-[#2E2E2E]/70">Opening Bank</span>
                        <span className="font-medium"> रु {dayEndClosingDetails?.openingBank}</span>
                      </div>

                      <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                        <span className="flex items-center text-sm text-[#2E2E2E]/70">
                          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          Bank Income
                        </span>
                        <span className="font-medium text-green-600">+ रु {dayEndClosingDetails?.totalBankIncome}</span>
                      </div>

                      <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A]/5">
                        <span className="flex items-center text-sm text-[#2E2E2E]/70">
                          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                          Bank Expense
                        </span>
                        <span className="font-medium text-red-600">- रु {dayEndClosingDetails?.totalBankExpense}</span>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-base font-medium">Expected Closing</span>
                        <span className="text-lg font-bold text-[#1A1A1A]">
                           रु {dayEndClosingDetails?.expectedClosingBank}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actual Values Card */}
                  <div className="bg-[#FAFAFA] rounded-lg p-5 border border-[#1A1A1A]/10">
                    <h3 className="text-base font-medium text-[#1A1A1A] mb-4 flex items-center">
                      <FaUniversity className="mr-2 text-[#E26300]" size={16} />
                      Actual Bank Entry
                    </h3>

                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border border-[#1A1A1A]/10 shadow-sm">
                        <label htmlFor="actualClosingBank" className="block text-sm text-[#2E2E2E]/70 mb-2">
                          Enter Actual Closing Bank Amount
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]/70">रु</span>
                          <input
                            id="actualClosingBank"
                            name="actualClosingBank"
                            value={data?.actualClosingBank || ""}
                            onChange={handleInputChange}
                            type="number"
                            placeholder="0.00"
                            className="p-3 pl-8 w-full text-[#2E2E2E] focus:outline-none text-lg font-medium rounded-md border border-[#1A1A1A]/20 focus:border-[#E26300] transition-colors bg-transparent"
                          />
                        </div>
                      </div>

                      <div className={`px-4 py-3 rounded-lg flex justify-between items-center ${!data?.bankDiscrepancy
                          ? "bg-[#1A1A1A]/5"
                          : data?.bankDiscrepancy > 0
                            ? "bg-green-50 border border-green-200"
                            : "bg-red-50 border border-red-200"
                        }`}>
                        <div className="flex items-center">
                          {data?.bankDiscrepancy ? (
                            data?.bankDiscrepancy > 0 ? (
                              <FaCheck size={14} className="mr-2 text-green-600" />
                            ) : (
                              <FaTimes size={14} className="mr-2 text-red-600" />
                            )
                          ) : (
                            <FaArrowRight size={14} className="mr-2 text-[#2E2E2E]/50" />
                          )}
                          <span className="text-sm font-medium">Discrepancy:</span>
                        </div>
                        <div className={`${getDiscrepancyClass(data?.bankDiscrepancy)} font-bold`}>
                           रु {data?.bankDiscrepancy}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="bankDiscrepancyReason" className="block text-sm text-[#2E2E2E]/70 mb-2">
                          {data?.bankDiscrepancy && data?.bankDiscrepancy !== 0 ? (
                            <>
                              <span className={data?.bankDiscrepancy > 0 ? "text-green-600" : "text-red-600"}>
                                {data?.bankDiscrepancy > 0 ? "Surplus" : "Deficit"} Reason
                              </span>
                              <span className="text-[#2E2E2E]/70"> (required)</span>
                            </>
                          ) : (
                            "Notes (optional)"
                          )}
                        </label>
                        <textarea
                          id="bankDiscrepancyReason"
                          name="bankDiscrepancyReason"
                          value={data?.bankDiscrepancyReason || ""}
                          onChange={handleTextareaChange}
                          placeholder={data?.bankDiscrepancy && data?.bankDiscrepancy !== 0
                            ? "Explain the reason for the bank discrepancy"
                            : "Add any notes about today's bank closing"}
                          className={`p-3 w-full text-[#2E2E2E] focus:outline-none text-sm rounded-md border ${data?.bankDiscrepancy && data?.bankDiscrepancy !== 0
                              ? "border-[#E26300]/50 focus:border-[#E26300]"
                              : "border-[#1A1A1A]/20 focus:border-[#1A1A1A]/40"
                            } transition-colors bg-white resize-none min-h-[80px]`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Information */}
            <div className="mt-8 pt-6 border-t border-[#1A1A1A]/10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 border border-[#1A1A1A]/10">
                <div className="flex items-center mb-3">
                  <div className="bg-[#E26300]/10 p-2 rounded-lg mr-2">
                    <FaUserCheck className="text-[#E26300]" size={14} />
                  </div>
                  <label htmlFor="handledBy" className="block text-sm font-medium text-[#1A1A1A]">
                    Handled By
                  </label>
                </div>
                <input
                  id="handledBy"
                  name="handledBy"
                  value={data?.handledBy || ""}
                  onChange={handleTextareaChange}
                  placeholder="Name of person handling the closing"
                  className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm rounded-md border border-[#1A1A1A]/20 focus:border-[#E26300] transition-colors bg-transparent"
                />
              </div>

              <div className="bg-white rounded-lg p-4 border border-[#1A1A1A]/10">
                <div className="flex items-center mb-3">
                  <div className="bg-[#E26300]/10 p-2 rounded-lg mr-2">
                    <FaFileAlt className="text-[#E26300]" size={14} />
                  </div>
                  <label htmlFor="remarks" className="block text-sm font-medium text-[#1A1A1A]">
                    Additional Remarks
                  </label>
                </div>
                <input
                  id="remarks"
                  name="remarks"
                  value={data?.remarks || ""}
                  onChange={handleTextareaChange}
                  placeholder="Any additional notes or observations"
                  className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm rounded-md border border-[#1A1A1A]/20 focus:border-[#E26300] transition-colors bg-transparent"
                />
              </div>
            </div>

            {/* Summary Section */}
            <div className="mt-8 pt-6 border-t border-[#1A1A1A]/10">
              <div className="bg-[#FAFAFA] rounded-lg p-5 border border-[#1A1A1A]/10 mb-6">
                <h3 className="text-base font-medium text-[#1A1A1A] mb-4 flex items-center">
                  <FaChartLine className="mr-2 text-[#E26300]" size={16} />
                  Closing Summary
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1A1A1A]/10">
                      <span className="text-sm text-[#2E2E2E]/70">Expected Cash:</span>
                      <span className="font-medium"> रु {dayEndClosingDetails?.expectedClosingCash}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#2E2E2E]/70">Actual Cash:</span>
                      <span className="font-medium"> रु {data?.actualClosingCash}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#1A1A1A]/10">
                      <span className="text-sm text-[#2E2E2E]/70">Expected Bank:</span>
                      <span className="font-medium"> रु {dayEndClosingDetails?.expectedClosingBank}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#2E2E2E]/70">Actual Bank:</span>
                      <span className="font-medium"> रु {data?.actualClosingBank}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row gap-4 justify-between">
                  <div>
                    <div className="text-sm text-[#2E2E2E]/70 mb-1">Total Expected</div>
                    <div className="text-lg font-bold">
                      रु  {(dayEndClosingDetails?.expectedClosingCash || 0) + (dayEndClosingDetails?.expectedClosingBank || 0)}
                    </div>
                  </div>

                  <div className="text-right sm:border-l sm:pl-4 border-[#1A1A1A]/10">
                    <div className="text-sm text-[#2E2E2E]/70 mb-1">Total Actual</div>
                    <div className={`text-lg font-bold ${hasDiscrepancy ? (totalDiscrepancy > 0 ? 'text-green-600' : 'text-red-600') : 'text-[#E26300]'}`}>
                      रु  {(data?.actualClosingCash || 0) + (data?.actualClosingBank || 0)}
                    </div>
                  </div>

                  {hasDiscrepancy && (
                    <div className="text-right sm:border-l sm:pl-4 border-[#1A1A1A]/10">
                      <div className="text-sm text-[#2E2E2E]/70 mb-1">Net Discrepancy</div>
                      <div className={`text-lg font-bold ${totalDiscrepancy > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      रु  {totalDiscrepancy}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="py-3 px-6 rounded-lg border border-[#1A1A1A]/20 hover:bg-[#1A1A1A]/5 transition-colors flex items-center justify-center"
                >
                  <FaTimes className="mr-2" size={16} />
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="py-3 px-6 bg-[#E26300] text-white rounded-lg hover:bg-[#D25800] transition-colors flex-1 sm:flex-none sm:min-w-[180px] flex items-center justify-center font-medium"
                >
                  <FaCheck className="mr-2" size={16} />
                  Submit Day-End Entry
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-[#1A1A1A]/[0.02] border-t border-[#1A1A1A]/10 text-center">
            <p className="text-xs text-[#2E2E2E]/70">
              Last updated by {data?.handledBy || 'IamAshish2'} • {new Date().toLocaleTimeString()} • All financial entries will be finalized upon submission
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayEndClosings;