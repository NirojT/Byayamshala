import { PartyType, PaymentMode } from "@/global/components/enums/enums";
import "@zener/nepali-datepicker-react/index.css";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { useGlobalStore } from "../../../../../../global/store";
import PurchaseItemCard from "./component/purchase-items-card";
import { useAddPurchaseFormStore } from "./store";

import Back from "@/global/components/back/back";
import { zenSelectStyles } from "@/global/components/desing/design";
import {
  Building,
  CreditCard,
  Info,
  Loader,
  PlusIcon,
  RotateCcw,
  Save,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import PurchaseDeleteModal from "./component/purchase-delete-modal";
import PurchaseShowAdditonal from "./component/purchase-show-additonal";
import PurchaseFormNames from "./component/purchse-form-names";
import { PurchaseHelper } from "./helper";
import Header from "./purchase-helper-componnets/header";
import HelpCard from "./purchase-helper-componnets/helper";
import PreviewCard from "./purchase-helper-componnets/preview";

const AddPurchaseForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ids = location.state;
  const id = (ids || 0) as number;

  // states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addAdditionalDetails, setAddAdditionalDetails] = useState(false);

  // stores
  const { setToasterData } = useGlobalStore();
  const {
    data,
    setData,
    clearData,
    createPurchase,
    updatePurchase,
    getPurchaseById,
    openDelete,
    setOpenDelete,
  } = useAddPurchaseFormStore();

  const helper = useMemo(() => new PurchaseHelper(), []);

  const handleConfirm = async () => {
    await helper.savePurchase(
      id,
      data,
      updatePurchase,
      createPurchase,
      clearData,
      setIsSubmitting,
      setToasterData,
      navigate
    );
  };

  //for popup
  const handleDelete = () => {
    if (!id || id === 0) return;

    setOpenDelete(true);
  };

  useEffect(() => {
    //if update than dont calcultate total amount
    if (id > 0) return;
    //total amount calculation
    const totalAmt = data.purchaseItemsReq.reduce(
      (acc, item) =>
        acc + (item?.price * item?.quantity - item?.discount * item?.quantity),
      0
    );
    setData({ ...data, totalAmt });
  }, [data.purchaseItemsReq]);

  useEffect(() => {
    if (ids) {
      getPurchaseById(id);
    }
  }, [ids]);
  //reset it
  useEffect(() => {
    if (!ids) {
      clearData();
    }
  }, []);
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      <Back />
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <Header id={id} />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-3">
            {/* Main Form Card */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                {id > 0 && (
                  <div className="flex justify-end mb-4">
                    <button
                      type="button"
                      onClick={() => handleDelete()}
                      className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg transition-all duration-200 text-sm hover:bg-red-100"
                      title="Delete Purchase Record"
                      disabled={isSubmitting}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
                {/* Basic Information Section */}
                <section aria-labelledby="basic-info-title" className="mb-6">
                  <h2
                    id="basic-info-title"
                    className="text-[#1A1A1A] text-sm font-medium mb-4 flex items-center border-b border-gray-100 pb-3"
                  >
                    <Info className="mr-2 text-[#E26300] w-4 h-4" />
                    Basic Information
                  </h2>

                  <div className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
                    {/* Purchase From */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="purchaseFrom"
                        className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                      >
                        Purchase From{" "}
                        <span className="text-[#E26300] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] z-10">
                          <Building size={16} />
                        </div>
                        <Select<{ label: string; value: string }>
                          inputId="purchaseFrom"
                          options={Object.values(PartyType)
                            .filter((type) => type !== PartyType.MEMBER)
                            .map((type) => ({
                              label: type,
                              value: type,
                            }))}
                          styles={zenSelectStyles}
                          placeholder="Select party type"
                          value={
                            data?.partyType
                              ? { label: data.partyType, value: data.partyType }
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
                        <PurchaseFormNames />
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
                    />
                  </div>
                </div>
                {/* Purchase Items Section */}
                <section
                  aria-labelledby="purchase-items-title"
                  className="mb-6"
                >
                  <h2
                    id="purchase-items-title"
                    className="text-[#1A1A1A] text-sm font-medium mb-4 flex items-center border-b border-gray-100 pb-3"
                  >
                    <ShoppingBag className="mr-2 text-[#E26300] w-4 h-4" />
                    Purchase Items
                  </h2>
                  {/* items component */}
                  <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100 transition-all duration-200">
                    <PurchaseItemCard />
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
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
                        रु
                      </span>
                      <input
                        id="totalAmt"
                        type="number"
                        onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                        className="bg-[#FAFAFA] pl-9 pr-12 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E] focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200"
                        value={data.totalAmt || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            totalAmt: Number(e.target.value),
                          })
                        }
                        placeholder="0.00"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                        NPR
                      </div>
                    </div>
                  </div>

                  {/* Partial Amount - Only shown if payment mode is PARTIAL_CREDIT */}
                  {data?.paymentMode === PaymentMode.PARTIAL_CREDIT && (
                    <div className="flex flex-col">
                      <label
                        htmlFor="partialAmt"
                        className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                      >
                        Partial Amount{" "}
                        <span className="text-[#E26300] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
                          रु
                        </span>
                        <input
                          id="partialAmt"
                          type="number"
                          onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                          className="bg-[#FAFAFA] pl-9 pr-12 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E] focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200"
                          value={data?.partialAmt || ""}
                          onChange={(e) =>
                            setData({
                              ...data,
                              partialAmt: Number(e.target.value),
                            })
                          }
                          placeholder="0.00"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                          NPR
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Additional Details Section */}

                {!id && (
                  <button
                    onClick={() => {
                      setAddAdditionalDetails(!addAdditionalDetails);
                    }}
                    className="text-[#E26300] text-sm hover:underline mb-4 flex items-center mt-4"
                  >
                    {addAdditionalDetails ? "Hide" : "Show"} Additional Details
                    <PlusIcon
                      className={`ml-1 h-3 w-3 ${
                        addAdditionalDetails ? "rotate-45" : ""
                      } transition-transform`}
                    />
                  </button>
                )}

                {(addAdditionalDetails || id > 0) && <PurchaseShowAdditonal />}
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
                        <span>{id ? "Update" : "Create"} Purchase</span>
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
      {openDelete && <PurchaseDeleteModal />}
    </div>
  );
};

export default AddPurchaseForm;
