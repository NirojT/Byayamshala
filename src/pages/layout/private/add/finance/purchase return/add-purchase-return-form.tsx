import { useLocation } from "react-router-dom";
import { useGlobalStore } from "../../../../../../global/store";
import PurchaseItemCard from "./component/return-purchase-items-card";
import { useAddPurchaseReturnFormStore } from "./store";
import { useEffect, useMemo } from "react";
import {
  Search,
  RotateCcw,
  FileText,
  RefreshCcw,
  Loader,
  ShoppingBag,
  AlertCircle,
  CheckCircle2, 
  Calendar,
  Building,
} from "lucide-react";
import { TbReceiptRefund } from "react-icons/tb";
import Back from "@/global/components/back/back";
import { PurchaseReturnHelper } from "./helper";

const AddPurchaseReturnForm: React.FC = () => {
  // hooks
  const location = useLocation();
  const ids = location.state;
  const id = (ids || 0) as number;

  // stores
  const { setToasterData } = useGlobalStore();
  const {
    purchaseDetail,
    clearData,
    returnPurchase,
    billNo,
    setBillNo,
    getPurchaseByBillNo,
    getPurchaseById,
    isSubmitting,
    setIsSearching,
    isSearching,
    setIsSubmitting,
    showSucesssMessage,
    setShowSuccessMessage,
  } = useAddPurchaseReturnFormStore();

  //class
  const purchaseReturnHelper = useMemo(() => new PurchaseReturnHelper(), []);

  const handleSearch = async () => {
    await purchaseReturnHelper.searchPurchaseByBillNo(
      billNo,
      getPurchaseByBillNo,
      setIsSearching,
      setToasterData
    );
  };

  const handleConfirm = async () => {
    await purchaseReturnHelper.returnPurchaseById(
      purchaseDetail,
      returnPurchase,
      setIsSubmitting,
      setToasterData,
      setShowSuccessMessage,
      clearData
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (ids) {
      getPurchaseById(id);
    }
  }, [ids]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      <Back />
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 text-center">
            <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2 flex items-center justify-center">
              <TbReceiptRefund className="mr-2 text-[#E26300]" size={20} />
              Purchase Return
            </h1>
            <p className="text-[#2E2E2E] text-sm">
              Process returns for previously completed purchase transactions
            </p>
          </div>
          {/* Subtle orange accent line at bottom */}
          <div className="h-0.5 bg-[#E26300]/20 w-full"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-8">
            {/* Main Form Card */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="p-6">
                {/* Search Section */}
                <section className="mb-6">
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                    <h2 className="text-sm font-medium text-[#1A1A1A] flex items-center">
                      <Search className="mr-2 text-[#E26300] w-4 h-4" />
                      Find Purchase Record
                    </h2>
                    {purchaseDetail && (
                      <button
                        className="flex items-center text-sm text-orange-500 hover:text-[#E26300] transition-colors"
                        onClick={clearData}
                      >
                        <RefreshCcw size={14} className="mr-1" />
                        Search Again
                      </button>
                    )}
                  </div>

                  <div className="space-y-5 sm:grid sm:grid-cols-5 sm:gap-6 sm:space-y-0">
                    {/* Bill Number */}
                    <div className="sm:col-span-4 flex flex-col">
                      <label
                        htmlFor="billNo"
                        className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                      >
                        Bill Number{" "}
                        <span className="text-[#E26300] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
                          <FileText size={16} />
                        </span>
                        <input
                          id="billNo"
                          type="text"
                          className="bg-[#FAFAFA] pl-9 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E] focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200"
                          value={billNo}
                          onChange={(e) => setBillNo(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Enter bill number"
                          disabled={isSearching}
                        />
                      </div>
                    </div>

                    {/* Search Button */}
                    <div className="flex flex-col justify-end">
                      <button
                        type="button"
                        onClick={handleSearch}
                        disabled={isSearching || !billNo}
                        className={`px-4 py-2.5 rounded-lg bg-[#1A1A1A] hover:bg-[#2E2E2E] text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                          isSearching || !billNo
                            ? "opacity-70 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {isSearching ? (
                          <Loader className="animate-spin h-4 w-4" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                        <span>Search</span>
                      </button>
                    </div>
                  </div>
                </section>

                {/* Purchase Record Information */}
                {purchaseDetail && (
                  <section className="mb-6 bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
                    <h3 className="text-[#1A1A1A] text-sm font-medium mb-3 flex items-center">
                      <ShoppingBag className="mr-2 text-[#E26300]" size={16} />
                      Original Purchase Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="flex items-start">
                        <div className="text-[#2E2E2E]/70 w-24">
                          Bill Number:
                        </div>
                        <div className="text-[#1A1A1A] font-medium">
                          {purchaseDetail?.billNo || "N/A"}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="text-[#2E2E2E]/70 w-24">Date:</div>
                        <div className="text-[#2E2E2E]">
                          {purchaseDetail?.createdNepDate || "N/A"}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="text-[#2E2E2E]/70 w-24">Supplier:</div>
                        <div className="text-[#2E2E2E]">
                          {purchaseDetail?.partyName || "N/A"}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="text-[#2E2E2E]/70 w-24">Total:</div>
                        <div className="text-[#1A1A1A] font-medium">
                          NPR {purchaseDetail?.totalAmt?.toFixed(2) || "0.00"}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Return Items Section */}
                <section className="mb-6">
                  <h2 className="text-[#1A1A1A] text-sm font-medium mb-4 flex items-center border-b border-gray-100 pb-3">
                    <TbReceiptRefund className="mr-2 text-[#E26300] w-4 h-4" />
                    {purchaseDetail ? "Select Items to Return" : "Return Items"}
                  </h2>

                  {!purchaseDetail ? (
                    <div className="bg-[#FAFAFA] rounded-lg p-8 border border-gray-100 flex flex-col items-center justify-center text-center">
                      <Search className="h-10 w-10 text-gray-300 mb-3" />
                      <p className="text-[#2E2E2E]/70 text-sm">
                        Search for a purchase record by entering the bill number
                        above
                      </p>
                    </div>
                  ) : (
                    <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100 transition-all duration-200">
                      <PurchaseItemCard />
                    </div>
                  )}
                </section>

                {/* Success Message */}
                {showSucesssMessage && (
                  <div className="mb-6 bg-green-50 text-green-800 px-4 py-3 rounded-lg border border-green-200 flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                    Purchase return processed successfully!
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    type="button"
                    onClick={clearData}
                    className="w-full sm:w-auto px-5 py-2 rounded-lg border border-gray-300 text-[#2E2E2E] hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                    disabled={isSubmitting}
                  >
                    <RotateCcw size={16} />
                    <span>Clear Form</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={isSubmitting || !purchaseDetail}
                    className={`w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#E26300] hover:bg-[#D25200] text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm ${
                      isSubmitting || !purchaseDetail
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin h-4 w-4" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCcw className="h-4 w-4" />
                        <span>Return Purchase</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5">
                <h3 className="text-[#1A1A1A] text-sm font-medium mb-3 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-[#E26300]" />
                  How to Process Returns
                </h3>
                <div className="text-[#2E2E2E] text-xs space-y-2.5">
                  <p>
                    <span className="text-[#E26300] font-medium">
                      Purchase Returns
                    </span>{" "}
                    let you process returns for items bought from suppliers.
                  </p>
                  <ol className="list-decimal pl-5 space-y-1.5">
                    <li>Enter the bill number of the original purchase</li>
                    <li>
                      Click{" "}
                      <span className="text-[#1A1A1A] font-medium">Search</span>{" "}
                      to find the purchase record
                    </li>
                    <li>Select the items to be returned</li>
                    <li>Adjust quantities if partial return is needed</li>
                    <li>
                      Click{" "}
                      <span className="text-[#E26300] font-medium">
                        Return Purchase
                      </span>{" "}
                      to complete the process
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Preview Card */}
          <div className="xl:col-span-4">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden sticky top-6">
              <div className="p-5">
                <h3 className="text-[#1A1A1A] text-sm font-medium mb-4 flex items-center border-b border-gray-100 pb-3">
                  <TbReceiptRefund className="h-4 w-4 mr-2 text-[#E26300]" />
                  Return Summary
                </h3>

                {!purchaseDetail ? (
                  <div className="bg-[#FAFAFA] rounded-lg p-6 text-center">
                    <FileText className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                    <p className="text-[#2E2E2E]/70 text-xs">
                      No purchase record found. Enter a bill number and search
                      to view return details.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-4">
                    <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[#2E2E2E]/70 text-xs uppercase tracking-wider">
                          Bill Number
                        </span>
                        <span className="text-[#1A1A1A] font-medium bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 text-xs">
                          #{purchaseDetail?.billNo}
                        </span>
                      </div>
                      <div className="flex items-center text-[#2E2E2E] text-xs">
                        <Calendar size={14} className="mr-1.5 text-[#E26300]" />
                        <span>
                          {purchaseDetail?.createdNepDate ||
                            "No date available"}
                        </span>
                      </div>
                    </div>

                    {purchaseDetail?.partyName && (
                      <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
                        <span className="text-[#2E2E2E]/70 text-xs uppercase tracking-wider block mb-2">
                          Supplier
                        </span>
                        <div className="flex items-center text-[#1A1A1A]">
                          <Building
                            size={14}
                            className="mr-1.5 text-[#E26300]"
                          />
                          <span className="font-medium text-sm">
                            {purchaseDetail?.partyName}
                          </span>
                        </div>
                        {purchaseDetail?.partyType && (
                          <p className="text-[#2E2E2E]/70 text-xs mt-1 ml-6">
                            {purchaseDetail?.partyType}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
                      <span className="text-[#2E2E2E]/70 text-xs uppercase tracking-wider block mb-2">
                        Return Items
                      </span>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {purchaseDetail &&
                          purchaseDetail?.purchaseItemsRes?.length > 0 &&
                          purchaseDetail?.purchaseItemsRes?.map((item) => (
                            <div
                              key={item?.itemName}
                              className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-b-0 last:pb-0"
                            >
                              <span className="text-[#1A1A1A] text-sm">
                                {item?.itemName || "Unnamed item"}
                              </span>
                              <span className="text-[#2E2E2E]/80 text-xs">
                                {item?.quantity} x NPR {item?.price?.toFixed(2)}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="bg-[#E26300]/5 rounded-lg p-4 border border-[#E26300]/10">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[#E26300] font-medium text-sm">
                          Total Return
                        </h4>
                        <p className="text-[#1A1A1A] text-base font-bold">
                          NPR{" "}
                          {purchaseDetail?.totalAmt
                            ? purchaseDetail?.totalAmt.toFixed(2)
                            : "0.00"}
                        </p>
                      </div>
                    </div>

                    <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
                      <div className="flex items-center">
                        <AlertCircle
                          size={14}
                          className="text-amber-600 mr-2 flex-shrink-0"
                        />
                        <p className="text-[#2E2E2E] text-xs">
                          Returns will affect your inventory and financial
                          records. Make sure all details are correct.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPurchaseReturnForm;