import Back from "@/global/components/back/back";
import { PartyMoneyType, PartyType } from "@/global/components/enums/enums";
import {
    CreditCard,
    Eye,
    FileText,
    HelpCircle,
    Info,
    Loader,
    Save,
    Trash2,
    User,
    Wallet,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { useGlobalStore } from "../../../../../../global/store";
import CreditNames from "./component/credit-names";
import { useAddCreditFormStore } from "./store";

import { zenSelectStyles } from "@/global/components/desing/design";
import { IOrderDetails } from "../../../cafe/orders/interface";
import CreditDeleteModal from "./component/credit-delete-modal";
import { CreditHelper } from "./helper";

const AddCreditForm: React.FC = () => {
  // hooks
  const location = useLocation();

  const state = location.state || {};
  const creditId = state?.creditId;
  const isFromMember = state?.fromMember;
  const isFromOrders = state?.fromOrders;
  const memberData = state?.memberData;
  const orders: IOrderDetails = state?.orders;
  const memberCreditPrice = state?.price;

  // states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // stores
  const { setToasterData, scrollPosition } = useGlobalStore();
  const {
    data,
    setData,
    clearData,
    createCredit,
    updateCredit,
    getPartyAccById,

    openDelete,
    setOpenDelete,
  } = useAddCreditFormStore();

  //class
  const creditHelper = useMemo(() => new CreditHelper(), []);

  const handleConfirm = async () => {
    await creditHelper.saveCredit(
      creditId,
      data,
      updateCredit,
      createCredit,
      clearData,
      setIsSubmitting,
      setToasterData
    );
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  //for popup
  const handleDelete = () => {
    if (!creditId) return;

    setOpenDelete(true);
  };

  useEffect(() => {
    if (creditId) {
      // This is an update operation
      getPartyAccById(creditId);
    } else if (isFromMember && memberData && memberCreditPrice) {
      // Coming from Member Form, prefill some values if needed
      setData({
        ...data,
        partyType: PartyType.MEMBER,
        partyName: memberData?.fullName,
        partyMoneyType: PartyMoneyType.TO_RECEIVE,
        amount: parseFloat(memberCreditPrice), // Example - if member data has amount
        notes: `Credit created while registering member: ${
          memberData?.name || ""
        }`,
      });
    } else if (isFromOrders && orders) {
      // Coming from Member Form, prefill some values if needed
      setData({
        ...data,
        partyType: PartyType.MEMBER,
        partyName: "",
        partyMoneyType: PartyMoneyType.TO_RECEIVE,
        amount: orders?.price, // Example - if member data has amount
        notes: `Credit created while Ordering food in gym cafe `,
      });
    }
  }, [creditId, isFromMember, memberData, isFromOrders, orders]);

   
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      <Back />
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 text-center">
            <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2 flex items-center justify-center">
              <CreditCard className="mr-2 text-[#E26300]" size={20} />
              {creditId ? "Update" : "Create"} Credit Record
            </h1>
            <p className="text-[#2E2E2E] text-lg">
              {creditId
                ? "Update existing credit details"
                : "Enter new credit information"}{" "}
              for your financial records
            </p>
          </div>
          {/* Subtle orange accent line at bottom */}
          <div className="h-0.5 bg-[#E26300]/20 w-full"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-3">
            {/* Main Form Card */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              {creditId && (
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={() => handleDelete()}
                    className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg transition-all duration-200 text-sm hover:bg-red-100"
                    title="Delete Credit Record"
                    disabled={isSubmitting}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
              <div className="p-6">
                {/* Basic Information Section */}
                <section aria-labelledby="basic-info-title" className="mb-6">
                  <h2
                    id="basic-info-title"
                    className="text-[#1A1A1A] text-sm font-medium mb-4 flex items-center border-b border-gray-100 pb-3"
                  >
                    <Info className="mr-2 text-[#E26300] w-4 h-4" />
                    Credit Information
                  </h2>

                  <div className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
                    {/* Credit For */}
                    {!creditId && (
                      <div className="flex flex-col">
                        <label
                          htmlFor="creditFor"
                          className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                        >
                          Credit For{" "}
                          <span className="text-[#E26300] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] z-10">
                            <User size={16} />
                          </div>
                          <Select<{ label: string; value: string }>
                            inputId="creditFor"
                            options={Object.values(PartyType).map((type) => ({
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
                    )}

                    {/* Party Name */}
                    <div className="flex flex-col">
                      <div className="party-name-container">
                        <CreditNames />
                      </div>
                    </div>
                    {/* Party Money Mode */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="partyMoneyType"
                        className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                      >
                        Party Money Type{" "}
                        <span className="text-[#E26300] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E] z-10">
                          <Wallet size={16} />
                        </div>
                        <Select<{ label: string; value: string }>
                          inputId="partyMoneyType"
                          options={Object.values(PartyMoneyType)
                            .filter(
                              (mode) =>
                                mode !== PartyMoneyType.SETTLED &&
                                mode !== PartyMoneyType.YOU_GAVE &&
                                mode !== PartyMoneyType.YOU_RECEIVED
                            )
                            .map((mode) => ({
                              label: mode,
                              value: mode,
                            }))}
                          styles={zenSelectStyles}
                          placeholder="Select money type"
                          value={
                            data?.partyMoneyType
                              ? {
                                  label: data?.partyMoneyType,
                                  value: data?.partyMoneyType,
                                }
                              : null
                          }
                          onChange={(selectedOption) =>
                            setData({
                              ...data,
                              partyMoneyType:
                                selectedOption?.value as PartyMoneyType,
                            })
                          }
                        />
                      </div>
                    </div>
                    {/* Amount */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="amount"
                        className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                      >
                        Amount <span className="text-[#E26300] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
                          रु
                        </span>
                        <input
                          id="amount"
                          type="number"
                          className="bg-[#FAFAFA] pl-9 pr-12 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E] focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200"
                          value={data?.amount || ""}
                          name="amount"
                          onChange={handleChange}
                          placeholder="0.00"
                          onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs">
                          NPR
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Notes Section */}
                <section aria-labelledby="notes-title">
                  <h2
                    id="notes-title"
                    className="text-[#1A1A1A] text-sm font-medium mb-4 flex items-center border-b border-gray-100 pb-3"
                  >
                    <FileText className="mr-2 text-[#E26300] w-4 h-4" />
                    Additional Details
                  </h2>
                  <div className="space-y-4">
                    {/* Notes */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="notes"
                        className="text-[#1A1A1A] text-sm font-medium mb-2"
                      >
                        Notes
                      </label>
                      <textarea
                        id="notes"
                        className="bg-[#FAFAFA] p-3 text-[#2E2E2E] text-sm block w-full rounded-lg focus:outline-none border border-gray-200 focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] resize-none transition-all duration-200"
                        rows={4}
                        placeholder="Additional notes or comments about this credit transaction..."
                        value={data?.notes || ""}
                        name="notes"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </section>

                <div className="mt-6 pt-5 border-t border-gray-100 flex justify-center">
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
                        <span>{creditId ? "Updating..." : "Creating..."}</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>{creditId ? "Update" : "Create"} Credit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="mt-6 bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5">
                <h3 className="text-[#1A1A1A] text-sm font-medium mb-3 flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2 text-[#E26300]" />
                  Need Help?
                </h3>
                <div className="text-[#2E2E2E] text-xs space-y-2.5">
                  <p>
                    <span className="text-[#E26300] font-medium">
                      Credit Records
                    </span>{" "}
                    help you track financial obligations between your business
                    and others.
                  </p>
                  <p className="flex items-start">
                    <span className="text-[#E26300] mr-2 text-xs leading-5">
                      •
                    </span>
                    <span>
                      Fill out all required fields marked with an asterisk (*)
                    </span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-[#E26300] mr-2 text-xs leading-5">
                      •
                    </span>
                    <span>
                      Use <span className="text-[#E26300]">TO_RECEIVE</span>{" "}
                      when someone owes you money
                    </span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-[#E26300] mr-2 text-xs leading-5">
                      •
                    </span>
                    <span>
                      Use <span className="text-[#E26300]">TO_PAY</span> when
                      you owe money to someone
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Preview Card */}
          <div className="xl:col-span-2">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden sticky top-6">
              <div className="p-5">
                <h3 className="text-[#1A1A1A] text-sm font-medium mb-4 flex items-center border-b border-gray-100 pb-3">
                  <Eye className="h-4 w-4 mr-2 text-[#E26300]" />
                  Credit Preview
                </h3>

                <div className="mt-4 space-y-4">
                  {data?.partyName && (
                    <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
                      <h4 className="text-[#2E2E2E]/70 text-xs uppercase tracking-wider mb-2">
                        Party Details
                      </h4>
                      <p className="text-[#1A1A1A] font-medium text-sm">
                        {data?.partyName}
                      </p>
                      <p className="text-[#2E2E2E]/80 text-xs mt-0.5">
                        {data?.partyType || "N/A"}
                      </p>
                    </div>
                  )}

                  <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
                    <h4 className="text-[#2E2E2E]/70 text-xs uppercase tracking-wider mb-2">
                      Transaction Type
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Wallet
                        size={14}
                        className={
                          data?.partyMoneyType === PartyMoneyType.TO_RECEIVE
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      />
                      <p
                        className={`text-sm font-medium ${
                          data?.partyMoneyType === PartyMoneyType.TO_RECEIVE
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {data?.partyMoneyType || "Not selected"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#E26300]/5 rounded-lg p-4 border border-[#E26300]/10">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[#E26300] font-medium text-sm">
                        Amount
                      </h4>
                      <p className="text-[#1A1A1A] text-base font-bold">
                        NPR {(Number(data?.amount) || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {data?.notes && (
                    <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
                      <h4 className="text-[#2E2E2E]/70 text-xs uppercase tracking-wider mb-2">
                        Notes
                      </h4>
                      <p className="text-[#2E2E2E] text-xs">{data?.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openDelete && <CreditDeleteModal />}
    </div>
  );
};

export default AddCreditForm;
