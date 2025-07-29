import { PartyMoneyType } from "@/global/components/enums/enums";
import { useMemo, useState } from "react";
import Select from "react-select";
import { useGlobalStore } from "../../../../../../global/store";
import { useAddSupplierFormStore } from "./store";

import Back from "@/global/components/back/back";
import { GmailField } from "@/global/components/email/GmailField"; // <-- Import GmailField
import {
    Building,
    Eye,
    FileText,
    HelpCircle,
    Loader,
    Mail,
    MapPin,
    Phone,
    Save,
    Truck,
    Wallet,
} from "lucide-react";
import { zenSelectStyles } from "../components/zenstyles";
import { SupplierHelper } from "./helper";

const AddSupplierForm: React.FC = () => {
  // states
  const [isSubmitting, setIsSubmitting] = useState(false);

  // stores
  const { setToasterData } = useGlobalStore();
  const { data, setData, clearData, createSupplier } =
    useAddSupplierFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  //class
  const helper = useMemo(() => new SupplierHelper(), []);
  const handleConfirm = async () => {
    await helper.saveSupplier(
      data,
      createSupplier,
      clearData,
      setIsSubmitting,
      setToasterData
    );
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      <Back />
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 text-center">
            <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2 flex items-center justify-center">
              <Truck className="mr-2 text-[#E26300]" size={20} />
              Create Supplier
            </h1>
            <p className="text-[#2E2E2E] text-sm">
              Add a new supplier to your business contacts
            </p>
          </div>
          {/* Subtle orange accent line at bottom */}
          <div className="h-0.5 bg-[#E26300]/20 w-full"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-3">
            {/* Main Form Card */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                {/* Basic Information Section */}
                <section aria-labelledby="basic-info-title" className="mb-6">
                  <h2
                    id="basic-info-title"
                    className="text-[#1A1A1A] text-sm font-medium mb-4 flex items-center border-b border-gray-100 pb-3"
                  >
                    <Building className="mr-2 text-[#E26300] w-4 h-4" />
                    Basic Information
                  </h2>

                  <div className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
                    {/* Supplier Name */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="name"
                        className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                      >
                        Supplier Name{" "}
                        <span className="text-[#E26300] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
                          <Building size={16} />
                        </span>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          className="bg-[#FAFAFA] pl-9 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E] focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200"
                          value={data?.name || ""}
                          onChange={handleChange}
                          placeholder="Enter supplier name"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="address"
                        className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                      >
                        Address <span className="text-[#E26300] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
                          <MapPin size={16} />
                        </span>
                        <input
                          id="address"
                          type="text"
                          name="address"
                          className="bg-[#FAFAFA] pl-9 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E] focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200"
                          value={data?.address || ""}
                          onChange={handleChange}
                          placeholder="Enter full address"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="phoneNo"
                        className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                      >
                        Phone Number{" "}
                        <span className="text-[#E26300] ml-1">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
                          <Phone size={16} />
                        </span>
                        <input
                          id="phoneNo"
                          type="text"
                          name="phoneNo"
                          className="bg-[#FAFAFA] pl-9 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E] focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200"
                          value={data?.phoneNo || ""}
                          onChange={handleChange}
                          placeholder="Enter contact number"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="email"
                        className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
                          <Mail size={16} />
                        </span>
                        <div className="w-full">
                          <GmailField
                            value={data?.email || ""}
                            onChange={(val) => setData({ ...data, email: val })}
                            placeholder="email"
                            className="pl-9 py-2.5"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Financial Information Section */}
                <section aria-labelledby="financial-info-title">
                  <h2
                    id="financial-info-title"
                    className="text-[#1A1A1A] text-sm font-medium mb-4 flex items-center border-b border-gray-100 pb-3"
                  >
                    <FileText className="mr-2 text-[#E26300] w-4 h-4" />
                    Financial Details
                  </h2>

                  <div className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
                    {/* PAN Number */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="panNo"
                        className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                      >
                        PAN Number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2E2E2E]">
                          <FileText size={16} />
                        </span>
                        <input
                          id="panNo"
                          type="text"
                          name="panNo"
                          className="bg-[#FAFAFA] pl-9 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E] focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200"
                          value={data?.panNo || ""}
                          onChange={handleChange}
                          placeholder="Enter PAN number"
                        />
                      </div>
                    </div>

                    {/* Initial Balance */}
                    <div className="flex flex-col">
                      <label
                        htmlFor="initialBalance"
                        className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                      >
                        Initial Balance
                      </label>
                      <div className="relative">
                        <div className="absolute left-4   top-4 bottom-6 text-green-500 font-bold text-xs mt-auto mb-auto">
                          रु
                        </div>
                        <input
                          id="initialBalance"
                          type="number"
                          name="initialBalance"
                          className="bg-[#FAFAFA] pl-16 py-2.5 w-full border border-gray-200 rounded-lg text-[#2E2E2E] focus:border-[#E26300] focus:ring-1 focus:ring-[#E26300] focus:outline-none transition-all duration-200"
                          value={data?.initialBalance || ""}
                          onChange={handleChange}
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    {/* Party Money Type - Only shown if initialBalance > 0 */}
                    {data?.initialBalance > 0 && (
                      <div className="flex flex-col sm:col-span-2">
                        <label
                          htmlFor="partyMoneyType"
                          className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center"
                        >
                          Party Balance Mode{" "}
                          <span className="text-[#E26300] ml-1">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2  text-[#2E2E2E]">
                            <Wallet size={16} />
                          </div>
                          <Select
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
                            placeholder="Select balance mode"
                            value={
                              data?.partyMoneyType
                                ? {
                                    label: data.partyMoneyType,
                                    value: data.partyMoneyType,
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
                    )}
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
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Create Supplier</span>
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
                  Help Information
                </h3>
                <div className="text-[#2E2E2E] text-xs space-y-2.5">
                  <p>
                    <span className="text-[#E26300] font-medium">
                      Suppliers
                    </span>{" "}
                    are companies or individuals who provide products or
                    services to your business.
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
                      Initial balance represents any existing financial
                      transaction with this supplier
                    </span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-[#E26300] mr-2 text-xs leading-5">
                      •
                    </span>
                    <span>
                      Use <span className="text-[#E26300]">TO_PAY</span> when
                      you owe money to this supplier
                    </span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-[#E26300] mr-2 text-xs leading-5">
                      •
                    </span>
                    <span>
                      Use <span className="text-[#E26300]">TO_RECEIVE</span>{" "}
                      when the supplier owes you money
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
                  Supplier Preview
                </h3>

                <div className="mt-4 space-y-4">
                  {data?.name && (
                    <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
                      <h4 className="text-[#2E2E2E]/70 text-xs uppercase tracking-wider mb-2">
                        Company Details
                      </h4>
                      <p className="text-[#1A1A1A] font-medium text-sm">
                        {data.name}
                      </p>
                      <div className="mt-2 flex items-center text-[#2E2E2E]/80 text-xs">
                        <MapPin size={14} className="mr-1.5" />
                        <span>{data.address || "No address provided"}</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
                    <h4 className="text-[#2E2E2E]/70 text-xs uppercase tracking-wider mb-2">
                      Contact Information
                    </h4>
                    <div className="space-y-2">
                      {data.phoneNo && (
                        <div className="flex items-center text-[#2E2E2E] text-xs">
                          <Phone size={14} className="mr-1.5 text-[#E26300]" />
                          <span>{data.phoneNo}</span>
                        </div>
                      )}

                      {data.email && (
                        <div className="flex items-center text-[#2E2E2E] text-xs">
                          <Mail size={14} className="mr-1.5 text-[#E26300]" />
                          <span>{data.email}</span>
                        </div>
                      )}

                      {data.panNo && (
                        <div className="flex items-center text-[#2E2E2E] text-xs">
                          <FileText
                            size={14}
                            className="mr-1.5 text-[#E26300]"
                          />
                          <span>PAN: {data.panNo}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {data?.initialBalance > 0 && (
                    <div className="bg-[#E26300]/5 rounded-lg p-4 border border-[#E26300]/10">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[#E26300] font-medium text-sm">
                          Opening Balance
                        </h4>
                        <p className="text-[#1A1A1A] text-base font-bold">
                          NPR {data.initialBalance}
                        </p>
                      </div>
                      {data?.partyMoneyType && (
                        <div className="mt-2 pt-2 border-t border-[#E26300]/10 flex justify-between items-center">
                          <h4 className="text-[#E26300] font-medium text-sm">
                            Balance Type
                          </h4>
                          <div className="flex items-center">
                            <Wallet
                              size={14}
                              className={`mr-1.5 ${
                                data.partyMoneyType ===
                                PartyMoneyType.TO_RECEIVE
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            />
                            <p
                              className={`text-xs font-medium ${
                                data.partyMoneyType ===
                                PartyMoneyType.TO_RECEIVE
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {data.partyMoneyType}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSupplierForm;
