import { useListPlansStore } from "@/pages/layout/private/list/gymoperatiions/plans/store";
import Select from "react-select";
import { usePlansOperationFormStore } from "../../../../store";

import { PaymentMode } from "@/global/components/enums/enums";
import { defaultNepaliDate } from "@/global/config";
import { useGlobalStore } from "@/global/store";
import NepaliDatePicker, { NepaliDate } from "@zener/nepali-datepicker-react";
import { useEffect, useState } from "react";
import Header from "./component/header";
import CofirmRenewPlanModal from "./confirm-renew-plan-modal";

const AddNewPlanForm = () => {
  const { setToasterData } = useGlobalStore();
  const {
    openRenewPlanModal,
    confirmAction,
    setConfirmAction,
    setOpenRenewPlanModal,
    clearData,
  } = usePlansOperationFormStore();
  const [loading, setLoading] = useState(false);

  const { plans } = useListPlansStore();
  const { data, setData, addNewPlan, setPlan, searchedMember } =
    usePlansOperationFormStore();

  //for nepali date change
 
  const handleNepaliDateChange = (
    e: NepaliDate | null,
    key: "startDate" | "renewDate"
  ) => {
    setData({
      ...data,
      [key]: (e as NepaliDate)?.toString(),
    });
  };


  //for discount
  const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const discount = parseInt(e.target.value);

    if (discount > data?.originalPrice) {
      setToasterData({
        open: true,
        message: "Discount cannot be greater than original price",
        severity: "error",
      });
      return;
    }

    setData({ ...data, discount });
  };

  //  for confirming the submission
  const handleConfirm = async () => {
    if (loading) return;
    try {
      setLoading(true);
      if (!searchedMember) {
        setToasterData({
          open: true,
          message: "Please select a member",
          severity: "error",
        });
        return;
      }
      // validate
      if (!data?.plansId) {
        setToasterData({
          open: true,
          message: "Please select a plan",
          severity: "error",
        });
        return;
      }
      //setting the member id to data
      setData({ ...data, memberId: searchedMember?.id });

      if (!data?.paymentMode) {
        setToasterData({
          open: true,
          message: "Please select a Payment Mode",
          severity: "error",
        });
        return;
      }
      const res = await addNewPlan();
      setToasterData({
        open: true,
        message: res.message,
        severity: res.severity,
      });
      if (res.severity === "success") {
        clearData();
        setOpenRenewPlanModal(false);
      }
    } catch (error: any) {
      setToasterData({
        open: true,
        message: "Something went wrong",
        severity: error,
      });

      console.log(error);
    } finally {
      setLoading(false);
      setConfirmAction(false);
    }
  };

  //  for opening the modal for confirmation
  const handleOpenModal = () => {
    setOpenRenewPlanModal(true);
  };

  // useEffect to listen to the confirmAction state, if the user clicks continuew in the modal, it is
  // set to true, if it is true the handle cofirm function is called.
  useEffect(() => {
    if (confirmAction) {
      handleConfirm();
    }
  }, [confirmAction]);

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
    <div>
      {/* Header Card */}
      <Header />

      <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl w-full mx-auto space-y-6 font-poppins">
        {/* for select plan */}dddddddd
        <div>
          <label
            htmlFor="planSelect"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Plan <span className="text-red-500">*</span>
          </label>
          <Select
            id="planSelect"
            styles={customSelectStyles}
            options={plans}
            getOptionLabel={(plan) =>
              `${plan?.planName}-Rs ${plan?.price}-(${
                plan?.facilities?.length > 3
                  ? `${plan?.facilities?.length} facilities`
                  : plan?.facilities?.map((i) => i?.facilityName).join(", ") ||
                    "0"
              })`
            }
            getOptionValue={(plan) => plan?.id?.toString()}
            onChange={(selectedOption) => {
              if (selectedOption) {
                setData({
                  ...data,
                  plansId: selectedOption?.id,
                  originalPrice: selectedOption?.price,
                });
                setPlan(selectedOption);
              }
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Total Amount */}
          <div>
            <label
              htmlFor="totalAmount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Total Amount <span className="text-red-500">*</span>
            </label>
            <p
              id="totalAmount"
              className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 bg-gray-50"
            >
              {data?.originalPrice === 0
                ? "Please select a plan"
                : `रु ${data?.originalPrice}`}
            </p>
          </div>

          {/* Discount */}
          <div>
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Discount Amount
            </label>
            <input
              type="number"
              onWheel={(e) => e.currentTarget.blur()} // ⛔ prevent scroll from changing number
              id="discount"
              placeholder="Enter discount amount"
              value={data?.discount || ""}
              onChange={handleDiscount}
              className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
            />
          </div>

          {/* Net Amount */}
          {data?.discount > 0 && (
            <div>
              <label
                htmlFor="netAmount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Net Amount <span className="text-red-500">*</span>
              </label>
              <p
                id="netAmount"
                className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 bg-gray-50"
              >
                रु {data?.originalPrice - data?.discount}
              </p>
            </div>
          )}

          {/* Payment Mode */}
          <div>
            <label
              htmlFor="paymentMode"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Payment Mode <span className="text-red-500">*</span>
            </label>
            <select
              id="paymentMode"
              value={data?.paymentMode}
              onChange={(e) =>
                setData({
                  ...data,
                  paymentMode: e.target.value as PaymentMode,
                })
              }
              className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
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

          {/* Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Start Date <span className="text-red-500">*</span>
            </label>
            <NepaliDatePicker
              value={
                data?.startDate
                  ? new NepaliDate(data?.startDate)
                  : defaultNepaliDate
              }
              placeholder="Select date"
              onChange={(e) => handleNepaliDateChange(e, "startDate")}
              className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
            />
          </div>
          {/* Renew Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Renew Date <span className="text-red-500">*</span>
            </label>
            <NepaliDatePicker
              value={
                data?.renewDate
                  ? new NepaliDate(data?.renewDate)
                  : defaultNepaliDate
              }
              placeholder="Select date"
              onChange={(e) => handleNepaliDateChange(e, "renewDate")}
              className="p-3 w-full text-[#2E2E2E] focus:outline-none text-sm border-b-2 border-b-gray-300 focus:border-b-[#E26300] transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              disabled={loading}
              onClick={() => {
                handleOpenModal();
              }}
              className="w-full py-3 px-6 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:outline-none rounded-md shadow-sm transition-colors duration-200"
            >
              {loading ? "Loading..." : "Add Plan"}
            </button>
          </div>
        </div>
      </div>

      {openRenewPlanModal && <CofirmRenewPlanModal />}
    </div>
  );
};

export default AddNewPlanForm;
