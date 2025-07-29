import { useGlobalStore } from "../../../../../../global/store";
import Select from "react-select";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEditSupplierFormStore } from "./store";
import { ISupplierDetails } from "../../../list/gymoperatiions/supplier/interface";
import { PartyMoneyType } from "@/global/components/enums/enums";
import {
  Building,
  MapPin,
  Phone,
  AtSign,
  CreditCard,
  DollarSign,
  Wallet,
  Truck,
} from "lucide-react";
import Back from "@/global/components/back/back";

const EditSupplierForm = () => {
  // hooks
  const { state } = useLocation();
  const navigate = useNavigate();
  const supplier: ISupplierDetails = { ...state };

  // stores
  const { data, setData, updateSupplier } = useEditSupplierFormStore();
  const { setToasterData } = useGlobalStore();

  // handlers
  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value }); // Update the specific field
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await updateSupplier(supplier?.id);

      navigate(-1);

      setToasterData({
        open: true,
        message: res?.message,
        severity: res?.severity,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (supplier) {
      setData(supplier);
    }
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 bg-[#FAFAFA] text-[#2E2E2E] font-poppins">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden font-poppins">
          <div className="p-5 text-center">
            <Back />

            <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2 flex items-center justify-center">
              <Truck className="mr-2 text-[#E26300]" size={20} />
              Edit Supplier
            </h1>
            <p className="text-[#2E2E2E] text-sm">
              Update supplier information and contact details
            </p>
          </div>
          {/* Subtle orange accent line at bottom */}
          <div className="h-0.5 bg-[#E26300]/20 w-full"></div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* Supplier Name */}
              <div className="flex flex-col">
                <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                  <Building size={18} className="text-[#E26300]" />
                  <span className="ml-2">Supplier Name</span>
                  <span className="text-[#E26300] ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={data?.name || ""}
                    onChange={handleChange}
                    className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                    placeholder="Enter supplier name"
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                  <MapPin size={18} className="text-[#E26300]" />
                  <span className="ml-2">Address</span>
                  <span className="text-[#E26300] ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={data?.address || ""}
                    onChange={handleChange}
                    className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                    placeholder="Enter address"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                  <Phone size={18} className="text-[#E26300]" />
                  <span className="ml-2">Phone Number</span>
                  <span className="text-[#E26300] ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="phoneNo"
                    value={data?.phoneNo || ""}
                    onChange={handleChange}
                    className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                  <AtSign size={18} className="text-[#E26300]" />
                  <span className="ml-2">Email</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={data?.email || ""}
                    onChange={handleChange}
                    className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              {/* PAN Number */}
              <div className="flex flex-col">
                <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                  <CreditCard size={18} className="text-[#E26300]" />
                  <span className="ml-2">PAN Number</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="panNo"
                    value={data?.panNo || ""}
                    onChange={handleChange}
                    className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                    placeholder="Enter PAN number"
                  />
                </div>
              </div>

              {/* Initial Balance */}
              <div className="flex flex-col">
                <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                  <DollarSign size={18} className="text-[#E26300]" />
                  <span className="ml-2">Initial Balance</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="initialBalance"
                    value={data?.initialBalance || ""}
                    onChange={handleChange}
                    className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
                    placeholder="Enter initial balance"
                  />
                </div>
              </div>

              {/* Party Money Type - conditionally rendered */}
              {data?.initialBalance > 0 && (
                <div className="flex flex-col">
                  <label className="text-[#1A1A1A] text-sm font-medium mb-2 flex items-center">
                    <Wallet size={18} className="text-[#E26300]" />
                    <span className="ml-2">Party Balance Mode</span>
                    <span className="text-[#E26300] ml-1">*</span>
                  </label>
                  <div className="relative">
                    <Select<{ label: string; value: string }>
                      options={Object.values(PartyMoneyType).map((mode) => ({
                        label: mode,
                        value: mode,
                      }))}
                      value={{
                        label: data.partyMoneyType,
                        value: data.partyMoneyType,
                      }}
                      onChange={(selectedOption) =>
                        setData({
                          ...data,
                          partyMoneyType:
                            selectedOption?.value as PartyMoneyType,
                        })
                      }
                      styles={{
                        control: (base, state) => ({
                          ...base,
                          borderRadius: "0",
                          borderTop: "none",
                          borderLeft: "none",
                          borderRight: "none",
                          borderBottom: `2px solid ${
                            state.isFocused ? "#E26300" : "#d1d5db"
                          }`,
                          boxShadow: "none",
                          padding: "2px 0",
                          backgroundColor: "transparent",
                          "&:hover": {
                            borderColor: "#E26300",
                          },
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: "#6b7280",
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "#E26300"
                            : state.isFocused
                            ? "#E2630020"
                            : "white",
                          color: state.isSelected ? "white" : "#2E2E2E",
                          "&:hover": {
                            backgroundColor: state.isSelected
                              ? "#E26300"
                              : "#E2630010",
                          },
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "#2E2E2E",
                        }),
                        clearIndicator: (base) => ({
                          ...base,
                          color: "#6b7280",
                          "&:hover": {
                            color: "#E26300",
                          },
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "#6b7280",
                          "&:hover": {
                            color: "#E26300",
                          },
                        }),
                        menu: (base) => ({
                          ...base,
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          borderRadius: "0.5rem",
                          zIndex: 10,
                        }),
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Form actions */}
              <div className="col-span-1 md:col-span-2 mt-3 pt-6 flex justify-end flex-end gap-5">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#FAFAFA] text-[#2E2E2E] border transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#E26300] text-white hover:bg-[#D25200] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Update Supplier</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSupplierForm;
