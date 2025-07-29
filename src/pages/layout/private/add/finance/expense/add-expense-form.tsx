import { ExpenseType, PaymentMode } from "@/global/components/enums/enums";
import React, { useEffect, useMemo } from "react";
import Select from "react-select";
import { useGlobalStore } from "../../../../../../global/store";
import { useAddExpenseFormStore } from "./store";

import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";

import Back from "@/global/components/back/back";
import { zenSelectStyles } from "@/global/components/desing/design";
import { defaultNepaliDate } from "@/global/config";
import { FiCalendar, FiCreditCard, FiSave, FiTrash2 } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { ExpenseHelper } from "./helper";
import ExpenseDeleteModal from "./helper-components/expense-delete-modal";
import ExpenseHeader from "./helper-components/expense-header-for-expense";
import HelpCardForExpense from "./helper-components/help-card-for-expense";
import PreviewCardForExpense from "./helper-components/preview-card-for-expense";

const AddExpenseForm: React.FC = () => {
  // hooks

  const location = useLocation();
  const ids = location.state;
  const id = (ids || 0) as number;

  // stores
  const { setToasterData } = useGlobalStore();
  const {
    data,
    setData,
    clearData,
    createExpense,
    updateExpense,
    getExpenseById,
    showPreview,
    setShowPreview,
    isSubmitting,
    setIsSubmitting,
    openDelete,
    setOpenDelete,
  } = useAddExpenseFormStore();

  // handlers
  const handleNepaliDateChange = (e: NepaliDate | null) => {
    setData({ ...data, date: (e as NepaliDate)?.toString() });
    if (!showPreview && e) setShowPreview(true);
  };
  //class
  const helper = useMemo(() => new ExpenseHelper(), []);
  const handleConfirm = async () => {
    helper.saveExpense(
      id,
      data,
      updateExpense,
      createExpense,
      clearData,
      setShowPreview,
      setIsSubmitting,
      setToasterData
    );
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Show preview when user starts filling the form
    if (value && !showPreview) {
      setShowPreview(true);
    }
  };

  //for popup
  const handleDelete = () => {
    if (!id || id === 0) return;

    setOpenDelete(true);
  };

  useEffect(() => {
    setData({ ...data, date: defaultNepaliDate.toString() });
    if (ids) {
      getExpenseById(id);
      setShowPreview(true);
    }
  }, [ids]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      <div className="max-w-4xl sm:max-w-6xl mx-auto">
        <Back />
        {/* Header Card */}
        <ExpenseHeader id={id} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            {/* Main Form Card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <form className="p-6 md:p-8">
                {id > 0 && (
                  <div className="flex justify-end mb-4">
                    <button
                      type="button"
                      onClick={() => handleDelete()}
                      className="flex items-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-lg transition-all duration-200"
                      title="Delete Expense"
                      disabled={isSubmitting}
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                )}

                <div className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
                  {/* Expense Type */}
                  <div className="flex flex-col">
                    <label className="text-[#1A1A1A] font-medium mb-2 text-sm">
                      Expense Type <span className="text-[#E26300]">*</span>
                    </label>
                    <Select<{ label: string; value: string }>
                      options={Object.values(ExpenseType).map((type) => ({
                        label: type,
                        value: type,
                      }))}
                      styles={zenSelectStyles}
                      value={
                        data?.expenseType
                          ? { label: data.expenseType, value: data.expenseType }
                          : null
                      }
                      onChange={(selectedOption) =>
                        setData({
                          ...data,
                          expenseType: selectedOption?.value as ExpenseType,
                        })
                      }
                      placeholder="Select expense type..."
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>

                  {/* Date Picker */}
                  <div className="flex flex-col">
                    <label className="text-[#1A1A1A] font-medium mb-2 text-sm">
                      Date <span className="text-[#E26300]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
                        <FiCalendar className="w-4 h-4" />
                      </div>
                      <NepaliDatePicker
                        value={data?.date || defaultNepaliDate}
                        placeholder="Select date"
                        onChange={(e) => handleNepaliDateChange(e)}
                        className="pl-9 w-full text-sm text-[#2E2E2E] border border-gray-200 py-2.5 
                                  rounded-lg bg-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-[#E26300] focus:border-[#E26300]"
                      />
                    </div>
                  </div>

                  {/* Payment Mode */}
                  <div className="flex flex-col">
                    <label className="text-[#1A1A1A] font-medium mb-2 text-sm">
                      Payment Mode <span className="text-[#E26300]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] z-10">
                        <FiCreditCard className="w-4 h-4" />
                      </div>
                      <Select<{ label: string; value: string }>
                        options={Object.values(PaymentMode)

                          .filter(
                            (type) =>
                              type === PaymentMode.CASH ||
                              type === PaymentMode.BANK
                          )
                          .map((mode) => ({
                            label: mode,
                            value: mode,
                          }))}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            backgroundColor: "#FAFAFA",
                            borderColor: state.isFocused
                              ? "#E26300"
                              : "#E5E7EB",
                            boxShadow: state.isFocused
                              ? "0 0 0 1px #E26300"
                              : "none",
                            minHeight: "42px",
                            borderRadius: "0.5rem",
                            paddingLeft: "1.75rem",
                            color: "#2E2E2E",
                            "&:hover": {
                              borderColor: "#E26300",
                            },
                          }),
                          input: (base) => ({
                            ...base,
                            color: "#2E2E2E",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#9CA3AF",
                          }),
                          singleValue: (base) => ({
                            ...base,
                            color: "#2E2E2E",
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused
                              ? "#F3F4F6"
                              : state.isSelected
                              ? "#E5E7EB"
                              : "white",
                            color: "#2E2E2E",
                            cursor: "pointer",
                            ":active": {
                              backgroundColor: "#E5E7EB",
                            },
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "white",
                            color: "#2E2E2E",
                            zIndex: 10,
                            borderRadius: "0.5rem",
                            overflow: "hidden",
                            boxShadow:
                              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          }),
                        }}
                        value={
                          data?.paymentMode
                            ? {
                                label: data.paymentMode,
                                value: data.paymentMode,
                              }
                            : null
                        }
                        onChange={(selectedOption) =>
                          setData({
                            ...data,
                            paymentMode: selectedOption?.value as PaymentMode,
                          })
                        }
                        placeholder="Select payment method..."
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="flex flex-col">
                    <label className="text-[#1A1A1A] font-medium mb-2 text-sm">
                      Total Amount <span className="text-[#E26300]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
                        रु
                      </span>
                      <input
                        type="number"
                        className="bg-[#FAFAFA] pl-9 pr-12 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E] focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200"
                        value={data?.totalAmt || ""}
                        name="totalAmt"
                        onChange={handleChange}
                        placeholder="0.00"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                        NPR
                      </div>
                    </div>
                  </div>

                  {/* Notes - Span 2 columns */}
                  <div className="flex flex-col sm:col-span-2">
                    <label className="text-[#1A1A1A] font-medium mb-2 text-sm">
                      Notes
                    </label>
                    <textarea
                      className="bg-[#FAFAFA] p-3 text-[#2E2E2E] block w-full rounded-lg focus:outline-none border border-gray-200 focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] resize-none transition-all duration-200"
                      rows={3}
                      placeholder="Additional notes about this expense..."
                      value={data?.notes || ""}
                      name="notes"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      clearData();
                      setShowPreview(false);
                    }}
                    className="w-full sm:w-auto px-5 py-2 rounded-lg border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                    disabled={isSubmitting}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Clear Form
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#E26300] hover:bg-[#D25200] text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span className="text-sm">
                          {id ? "Updating..." : "Creating..."}
                        </span>
                      </>
                    ) : (
                      <>
                        <FiSave className="h-4 w-4" />
                        <span className="text-sm">
                          {id ? "Update" : "Create"} Expense
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Help Card */}
            <HelpCardForExpense />
          </div>

          {/* Preview Card */}
          <PreviewCardForExpense />
        </div>
      </div>

      {openDelete && <ExpenseDeleteModal />}
    </div>
  );
};

export default AddExpenseForm;
