import Select from "react-select";
import { PaymentMode } from "@/global/components/enums/enums";
import { defaultNepaliDate } from "@/global/config";
import { useGlobalStore } from "@/global/store";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import { useEffect, useState } from "react";
import CofirmRenewFacilityModal from "./confirm-renew-facility-modal";
import { usePlansOperationFormStore } from "../../../../store";
import { useListFacilitiesStore } from "@/pages/layout/private/list/gymoperatiions/facilities/store";

const AddNewFacilityForm = () => {
  const { setToasterData } = useGlobalStore();
  const {
    openRenewFacilityModal,
    confirmAction,
    setConfirmAction,
    setOpenRenewFacilityModal,

    clearFacilitiesData,
    facilitiesData,
    setFacilitiesData,
    addNewFacility,
    setFacility,
    searchedMember,
  } = usePlansOperationFormStore();

  const [loading, setLoading] = useState(false);
  const { facilities } = useListFacilitiesStore();

  // Handle Nepali date changes for start and renewal dates
  const handleNepaliDateChange = (
    e: NepaliDate | null,
    key: "startDate" | "renewDate"
  ) => {
    setFacilitiesData({
      ...facilitiesData,
      [key]: e?.toString(),
    });
  };

  // Handle generic input changes (e.g., description, days)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFacilitiesData({
      ...facilitiesData,
      [id]: value,
    });
  };

  // Handle discount input with validation
  const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const discount = parseInt(e.target.value);

    if (discount > (facilitiesData?.originalPrice || 0)) {
      setToasterData({
        open: true,
        message: "Discount cannot be greater than the original price.",
        severity: "error",
      });
      return;
    }
    setFacilitiesData({ ...facilitiesData, discount });
  };

  // Confirm and submit the new facility
  const handleConfirm = async () => {
    if (loading) return;

    try {
      setLoading(true);

      // Basic form validations
      if (!searchedMember) {
        setToasterData({
          open: true,
          message: "Please select a member.",
          severity: "error",
        });
        return;
      }
      if (!facilitiesData?.facilityId) {
        setToasterData({
          open: true,
          message: "Please select a facility.",
          severity: "error",
        });
        return;
      }
      if (!facilitiesData?.paymentMode) {
        setToasterData({
          open: true,
          message: "Please select a Payment Mode.",
          severity: "error",
        });
        return;
      }

      // Attach member ID before submission
      setFacilitiesData({ ...facilitiesData, memberId: searchedMember?.id });

      const res = await addNewFacility();
      setToasterData({
        open: true,
        message: res.message,
        severity: res.severity,
      });

      if (res.severity === "success") {
            clearFacilitiesData(); // Clear form data on success
        setOpenRenewFacilityModal(false); // Close confirmation modal
      }
    } catch (error: any) {
      console.error("Failed to add facility:", error);
      setToasterData({
        open: true,
        message: "Something went wrong while adding the facility.",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setConfirmAction(false); // Reset confirmation action
    }
  };

  // Open the confirmation modal
  const handleOpenModal = () => {
    setOpenRenewFacilityModal(true);
  };

  // Effect to calculate original price based on days and base price
  useEffect(() => {
    if (facilitiesData?.days && facilitiesData?.basePrice) {
      const months = Math.ceil(facilitiesData.days / 30);
      const totalPrice = facilitiesData.basePrice * months;
      setFacilitiesData({
        ...facilitiesData,
        originalPrice: totalPrice,
      });
    }
  }, [facilitiesData?.days, facilitiesData?.basePrice, setFacilitiesData]);

  // Effect to trigger handleConfirm when `confirmAction` is true
  useEffect(() => {
    if (confirmAction) {
      handleConfirm();
    }
  }, [confirmAction]); // eslint-disable-line react-hooks/exhaustive-deps

  // Custom styles for React Select
  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      padding: "0.75rem",
      width: "100%",
      color: "#2E2E2E",
      fontSize: "0.875rem",
      border: "none",
      borderBottom: "2px solid #d1d5db",
      borderRadius: "0",
      boxShadow: "none",
      "&:hover": {
        borderBottomColor: "#d1d5db",
      },
      "&:focus": {
        outline: "none",
        borderBottomColor: "#E26300",
      },
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#2E2E2E",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#FFF4EC"
        : state.isSelected
        ? "#FFF4EC"
        : "white",
      color: "#2E2E2E",
    }),
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg w-full max-w-2xl mx-auto space-y-6 font-poppins transform transition-all duration-300 ease-in-out">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New Facility Plan
      </h2>

      {/* Select Facility */}
      <div>
        <label
          htmlFor="facilitySelect"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select Facility <span className="text-red-500">*</span>
        </label>
        <Select
          id="facilitySelect"
          styles={customSelectStyles}
          options={facilities}
          getOptionLabel={(facility) =>
            `${facility?.facilityName} - Rs ${facility?.price}`
          }
          getOptionValue={(facility) => facility?.id?.toString()}
          onChange={(selectedOption) => {
            if (selectedOption) {
              const months = Math.ceil((facilitiesData?.days || 0) / 30);
              setFacilitiesData({
                ...facilitiesData,
                facilityId: selectedOption?.id,
                basePrice: selectedOption?.price,
                originalPrice: selectedOption?.price * (months || 1),
              });
              setFacility(selectedOption); // Set selected facility details
            }
          }}
        />
      </div>

      {/* Start Date and Days */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Start Date <span className="text-red-500">*</span>
          </label>
          <NepaliDatePicker
            value={facilitiesData?.startDate}
            placeholder="Select start date"
            onChange={(e) => handleNepaliDateChange(e, "startDate")}
            className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors duration-200"
          />
        </div>
        <div>
          <label
            htmlFor="days"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Days <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            onWheel={(e) => e.currentTarget.blur()} // Prevents scroll from changing number
            id="days"
            placeholder="Enter number of days"
            value={facilitiesData?.days || ""}
            onChange={handleChange}
            className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors duration-200"
          />
        </div>
      </div>

      {/* Total Amount and Discount */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="totalAmount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Total Amount <span className="text-red-500">*</span>
          </label>
          <p
            id="totalAmount"
            className="p-3 w-full text-[#2E2E2E] bg-gray-50 border-b-2 border-b-gray-300 text-sm rounded-sm"
          >
            {facilitiesData?.originalPrice === 0
              ? "Select a facility"
              : `रु ${facilitiesData?.originalPrice?.toLocaleString()}`}
          </p>
        </div>
        <div>
          <label
            htmlFor="discount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Discount Amount
          </label>
          <input
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            id="discount"
            placeholder="Enter discount amount"
            value={facilitiesData?.discount || ""}
            onChange={handleDiscount}
            className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors duration-200"
          />
        </div>
      </div>

      {/* Net Amount and Payment Mode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facilitiesData?.discount > 0 && (
          <div>
            <label
              htmlFor="netAmount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Net Amount <span className="text-red-500">*</span>
            </label>
            <p
              id="netAmount"
              className="p-3 w-full text-[#2E2E2E] bg-gray-50 border-b-2 border-b-gray-300 text-sm rounded-sm"
            >
              रु{" "}
              {(
                (facilitiesData?.originalPrice || 0) -
                (facilitiesData?.discount || 0)
              ).toLocaleString()}
            </p>
          </div>
        )}
        <div>
          <label
            htmlFor="paymentMode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Payment Mode <span className="text-red-500">*</span>
          </label>
          <select
            id="paymentMode"
            value={facilitiesData?.paymentMode || ""}
            onChange={(e) =>
              setFacilitiesData({
                ...facilitiesData,
                paymentMode: e.target.value as PaymentMode,
              })
            }
            className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors duration-200 bg-white"
          >
            <option value="">Select Payment Mode</option>
            {Object.values(PaymentMode)
              .filter(
                (m) =>
                  m !== PaymentMode.FULL_CREDIT &&
                  m !== PaymentMode.PARTIAL_CREDIT
              )
              .map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="description"
          placeholder="Add a brief description"
          value={facilitiesData?.description || ""}
          onChange={handleChange}
          className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors duration-200"
        />
      </div>

      {/* Renew Date */}
      <div>
        <label
          htmlFor="renewDate"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Renew Date <span className="text-red-500">*</span>
        </label>
        <NepaliDatePicker
          value={
            facilitiesData?.renewDate
              ? new NepaliDate(facilitiesData?.renewDate)
              : defaultNepaliDate
          }
          placeholder="Select renewal date"
          onChange={(e) => handleNepaliDateChange(e, "renewDate")}
          className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors duration-200"
        />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2 pt-4">
        <button
          disabled={loading}
          onClick={handleOpenModal}
          className="w-full py-3 px-6 text-base font-semibold text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:outline-none rounded-md shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Adding Facility..." : "Add Facility"}
        </button>
      </div>

      {openRenewFacilityModal && <CofirmRenewFacilityModal />}
    </div>
  );
};
export default AddNewFacilityForm;
