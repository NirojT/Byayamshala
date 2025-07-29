import Back from "@/global/components/back/back";
import { zenSelectStyles } from "@/global/components/desing/design";
import {
  PartyType,
  PaymentMode,
  PrintFormat,
} from "@/global/components/enums/enums";
import { PrivateRoute } from "@/global/config";
import "@zener/nepali-datepicker-react/index.css";
import {
  CreditCard,
  Info,
  Loader,
  PlusIcon,
  Printer,
  RotateCcw,
  Save,
  ShoppingCart,
  Trash2,
  User
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useGlobalStore } from "../../../../../../global/store";
import { useListSalesStore } from "../../../reports/component/sales/store";
import SalesDeleteModal from "./component/sales-delete-modal";
import SalesFormNames from "./component/sales-form-names";
import SalesItemCard from "./component/sales-items-card";
import SalesModal from "./component/sales-print-modal";
import SalesAdditonalDetails from "./component/sales-show-additonal";
import { SalesHelper } from "./helper";
import Header from "./sales-helper-components/header";
import HelpCard from "./sales-helper-components/help-card";
import PreviewCard from "./sales-helper-components/preview-card";
import { useAddSalesFormStore } from "./store";

const AddSales: React.FC = () => {
  //hookes
  const navigate = useNavigate();
  const location = useLocation();
  const ids = location.state;
  const id = (ids || 0) as number;

  // states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // stores
  const { setToasterData ,scrollPosition} = useGlobalStore();

  const {
    data,
    setData,
    clearData,
    createSales,
    updateSales,
    getSalesById,
    pdf,
    addAdditionalDetails,
    setAddAdditioalDetails,
    openDelete,
    setOpenDelete,
  } = useAddSalesFormStore();
  const { printSales, printFormat, setPrintFormat } = useListSalesStore();

  //class
  const salesHelper = useMemo(() => new SalesHelper(), []);

  const handleConfirm = async () => {
    await salesHelper.saveSales(
      id,
      data,
      updateSales,
      createSales,
      clearData,
      setIsSubmitting,
      setToasterData
    );
  };

  //for popup
  const handleDelete = () => {
    if (!id || id === 0) return;

    setOpenDelete(true);
  };

  const handlePrint = async (id: number) => {
    await salesHelper.printSales(
      id,
      printSales,
      setToasterData,
      setIsSubmitting,
      navigate,
      PrivateRoute
    );
  };


  useEffect(() => {
    //if update than dont calcultate total amount but calculate if quantity changes
    if (id > 0 ) return;

    // Total amount calculation
    const totalAmt = data?.salesItemsReq?.reduce(
      (acc, item) =>
        acc + (item?.price * item?.quantity - item?.discount * item?.quantity),
      0
    );
    setData({ ...data, totalAmt });
  }, [data?.salesItemsReq]);

  useEffect(() => {
    if (ids) {
      getSalesById(id);
    }
  }, [ids]);

  //reset it
  useEffect(() => {
    if (!ids) {
      clearData();
    }
  }, []);
 
useEffect(() => {
  window.scrollTo(0, scrollPosition);
}, [scrollPosition]);
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      <div className="max-w-7xl mx-auto">
        <Back />
        {/* Header Card */}
        <Header id={id} />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-3">
            {/* Main Form Card */}
            <div className="bg-white border   border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                {id > 0 && (
                  <div className="flex justify-end gap-3 mb-4">
                    {/* delete */}
                    <button
                      type="button"
                      onClick={() => handleDelete()}
                      className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg transition-all duration-200 text-sm hover:bg-red-100"
                      title="Delete Sales Record"
                      disabled={isSubmitting}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>

                    {/* print */}
                    <button
                      type="button"
                      onClick={() => handlePrint(id)}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg transition-all duration-200 text-sm hover:bg-blue-100"
                      title="Print Sales Record"
                      disabled={isSubmitting}
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print</span>
                    </button>

                    {/* print Format */}
                    <select
                      onChange={(e) =>
                        setPrintFormat(e.target.value as PrintFormat)
                      }
                      value={printFormat}
                      className="px-3 py-2 bg-[#FAFAFA] text-[#2E2E2E] rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300]"
                      title="Select Print Format"
                      disabled={isSubmitting}
                    >
                      {Object.values(PrintFormat).map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Basic Information Section */}
                <section aria-labelledby="basic-info-title" className="mb-6">
                  <div className="flex mb-4">
                    <h2
                      id="basic-info-title"
                      className="text-[#1A1A1A] font-medium text-sm flex items-center border-b border-gray-100 pb-3 w-full"
                    >
                      <Info className="mr-2 text-[#E26300] w-4 h-4" />
                      Basic Information
                    </h2>
                  </div>

                  <div className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
                    {/* Sales For */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="salesFor"
                        className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                      >
                        Sales For <span className="text-[#E26300] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] z-10">
                          <User size={16} />
                        </div>
                        <Select<{ label: string; value: string }>
                          inputId="salesFor"
                          options={Object.values(PartyType)
                            .filter((type) => type !== PartyType.SUPPLIER)
                            .map((type) => ({
                              label: type,
                              value: type,
                            }))}
                          styles={zenSelectStyles}
                          placeholder="Select party type"
                          value={
                            data?.partyType
                              ? {
                                  label: data?.partyType,
                                  value: data?.partyType,
                                }
                              : null
                          }
                          onChange={(selectedOption) =>
                            setData({
                              ...data,
                              partyType: selectedOption?.value as PartyType,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Party Name */}
                    <div className="flex flex-col">
                      <div className="party-name-container">
                        <SalesFormNames />
                      </div>
                    </div>
                  </div>
                </section>
                {/* Payment Mode */}
                <div className="flex flex-col mb-4">
                  <label
                    htmlFor="paymentMode"
                    className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                  >
                    Payment Mode <span className="text-[#E26300] ml-1">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] z-10">
                      <CreditCard size={16} />
                    </div>
                    <Select<{ label: string; value: string }>
                      inputId="paymentMode"
                      options={Object.values(PaymentMode).map((mode) => ({
                        label: mode,
                        value: mode,
                      }))}
                      styles={zenSelectStyles}
                      placeholder="Select payment mode"
                      value={
                        data?.paymentMode
                          ? {
                              label: data?.paymentMode,
                              value: data?.paymentMode,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        setData({
                          ...data,
                          paymentMode: selectedOption?.value as PaymentMode,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Sales Items Section */}
                <section aria-labelledby="sales-items-title" className="mb-6">
                  <h2
                    id="sales-items-title"
                    className="text-[#1A1A1A] font-medium text-sm flex items-center border-b border-gray-100 pb-3 mb-4"
                  >
                    <ShoppingCart className="mr-2 text-[#E26300] w-4 h-4" />
                    Sales Items
                  </h2>
                  <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100 transition-all duration-200">
                    <SalesItemCard />
                  </div>
                </section>

                {/* wrapper for bottom */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Total Amount */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="totalAmt"
                      className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                    >
                      Total Amount{" "}
                      <span className="text-[#E26300] ml-1">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] mr-4 text-xs">
                        रु
                      </span>
                      <input
                        id="totalAmt"
                        type="number"
                        className="bg-[#FAFAFA] pl-9 pr-9 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E]
                           focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200
                           "
                        value={data?.totalAmt || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            totalAmt: Number(e.target.value),
                          })
                        }
                        placeholder="0.00"
                        onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                      />
                      {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                          NPR
                        </div> */}
                    </div>
                  </div>

                  {/* Partial Amount - Only shown if payment mode is PARTIAL_CREDIT */}
                  {data?.paymentMode === PaymentMode.PARTIAL_CREDIT && (
                    <div className="flex flex-col">
                      <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] mr-4 text-xs">
                        रु
                      </span>
                      <label
                        htmlFor="partialAmt"
                        className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                      >
                        Partial Amount{" "}
                        <span className="text-[#E26300] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="partialAmt"
                          type="number"
                          className="bg-[#FAFAFA] pl-9 pr-12 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E] focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200"
                          value={data?.partialAmt || ""}
                          onChange={(e) =>
                            setData({
                              ...data,
                              partialAmt: Number(e.target.value),
                            })
                          }
                          placeholder="0.00"
                          onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                          रु
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {!id && (
                  <button
                    onClick={() => {
                      setAddAdditioalDetails(!addAdditionalDetails);
                    }}
                    className="text-[#E26300] text-sm hover:underline mb-4 flex items-center mt-4"
                  >
                    {addAdditionalDetails ? "Hide" : ""} Additional Details
                    <PlusIcon
                      className={`ml-1 h-3 w-3 ${
                        addAdditionalDetails ? "rotate-45" : ""
                      } transition-transform`}
                    />
                  </button>
                )}

                {(addAdditionalDetails || id > 0) && <SalesAdditonalDetails />}

                {/* action buttons */}
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
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#E26300] hover:bg-[#D25200] text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin h-4 w-4" />
                        <span>{id ? "Updating..." : "Creating..."}</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>{id ? "Update" : "Create"} Sales</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <HelpCard />
          </div>

          {/* Right side - Preview Card */}
          <PreviewCard />
        </div>
      </div>

      {pdf && <SalesModal />}
      {openDelete && <SalesDeleteModal />}
    </div>
  );
};

export default AddSales;
