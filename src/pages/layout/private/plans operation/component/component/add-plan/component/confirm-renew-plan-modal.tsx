import { useListPlansStore } from "@/pages/layout/private/list/gymoperatiions/plans/store";
import { NepaliDate } from "@zener/nepali-datepicker-react";
import { useEffect } from "react";
import { usePlansOperationFormStore } from "../../../../store";
import {
  CheckCircle,
  XCircle,
  Calendar,
  Tag,
  Gift,
  Percent,
  BadgeDollarSign,
} from "lucide-react";
import { IoMdCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

const ConfirmRenewPlanModal = () => {
  const {
    setOpenRenewPlanModal,
    setConfirmAction,
    data,
    setData,
    printBill,
    setPrintBill,
    notify,
    setNotify,
  } = usePlansOperationFormStore();
  const { plans } = useListPlansStore();

  const plan = plans.find((p) => p.id === Number(data?.plansId));

  // Calculate end date based on the plan's duration and start date
  useEffect(() => {
    if (plan?.durationInDays && data?.startDate) {
      const startDate = new NepaliDate(data?.startDate as string);
      startDate.setDate(startDate?.getDate() + plan?.durationInDays);
      const endDate = startDate?.toString();
      setData({
        ...data,
        endDate,
      });
    }
    // eslint-disable-next-line
  }, [plan?.durationInDays, data?.startDate]);

  // Net price calculation
  const price = plan?.price || 0;
  const discount = Number(data?.discount) || 0;
  const net = price - discount;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm font-poppins flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white p-0 rounded-2xl shadow-2xl max-w-3xl w-full overflow-y-auto max-h-[85vh] border border-gray-200 animate-fadeInUp">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b px-8 py-6 bg-[#FAFAFA] rounded-t-2xl">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-[#E26300]" size={32} />
            <div>
              <h3 className="text-2xl font-bold text-[#2E2E2E] leading-tight">
                Confirm Renewal Details
              </h3>
              <p className="text-[#4B5563] text-sm">
                Please review the plan and renewal information before
                confirming.
              </p>
            </div>
          </div>
          <button
            className="text-gray-400 hover:text-[#E26300] transition-all p-2"
            onClick={() => setOpenRenewPlanModal(false)}
            title="Close"
          >
            <XCircle size={28} />
          </button>
        </div>

        {/* Checkbox for print bill */}
        <div className="flex gap-2 p-4">
          {" "}
          {/* Print Bill */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-800 block">
                    Print Bill
                  </span>
                  <span className="text-sm text-gray-500">
                    Generate receipt after confirmation
                  </span>
                </div>
              </div>
              <div
                className="hover:cursor-pointer transform hover:scale-110 transition-transform"
                onClick={() => setPrintBill(!printBill)}
              >
                {printBill ? (
                  <IoMdCheckbox size={28} className="text-green-600" />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    size={28}
                    className="text-gray-400"
                  />
                )}
              </div>
            </div>
          </div>
          {/* Send Notification */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5v-5zM4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-800 block">
                    Send Notification
                  </span>
                  <span className="text-sm text-gray-500">
                    Notify member via email & WhatsApp message
                  </span>
                </div>
              </div>
              <div
                className="hover:cursor-pointer transform hover:scale-110 transition-transform"
                onClick={() => setNotify(!notify)}
              >
                {notify ? (
                  <IoMdCheckbox size={28} className="text-green-600" />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank
                    size={28}
                    className="text-gray-400"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full px-8 py-6">
          {/* Plan Details */}
          {plan && (
            <div className="bg-[#F9FAFB] border border-gray-100 p-6 rounded-xl shadow-sm mb-6 md:mb-0 md:mr-2">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                <Tag className="text-[#E26300]" size={20} />
                <h4 className="text-lg font-semibold text-[#2E2E2E]">
                  Plan Overview
                </h4>
              </div>
              <div className="space-y-4 text-base">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600 flex items-center gap-1">
                    <Tag size={16} /> Plan:
                  </span>
                  <span className="font-semibold text-[#2E2E2E]">
                    {plan?.planName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600 flex items-center gap-1">
                    <Calendar size={16} /> Duration:
                  </span>
                  <span className="bg-gray-100 text-[#1A1A1A] px-3 py-1 rounded-md text-sm border border-gray-200">
                    {plan?.durationInDays} days
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-600 block mb-1">
                    Facilities:
                  </span>
                  {plan?.facilities?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {plan?.facilities?.map((facility, index) => (
                        <span
                          key={index}
                          className="bg-[#F3F4F6] border border-gray-200 px-3 py-1 rounded-md text-sm text-[#2E2E2E]"
                        >
                          {facility?.facilityName}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">No facilities</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600 flex items-center gap-1">
                    <Calendar size={16} /> Start:
                  </span>
                  <span className="text-[#2E2E2E]">
                    {data?.startDate as string}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600 flex items-center gap-1">
                    <Calendar size={16} /> End:
                  </span>
                  <span className="text-[#2E2E2E]">
                    {data?.endDate as string}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Details */}
          <div className="bg-[#F9FAFB] border border-gray-100 p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
              <BadgeDollarSign className="text-[#E26300]" size={20} />
              <h4 className="text-lg font-semibold text-[#2E2E2E]">
                Payment Summary
              </h4>
            </div>
            <div className="space-y-3 text-base">
              {(plan?.discount || 0) > 0 && (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-600 flex items-center gap-1">
                    <Percent size={16} /> Package Discount:
                  </span>
                  <span className="text-[#16A34A] font-semibold">
                    - Rs {plan?.discount}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600 flex items-center gap-1">
                  <Gift size={16} /> Base Price:
                </span>
                <span className="text-[#2E2E2E] font-bold">
                  Rs {plan?.price}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600 flex items-center gap-1">
                  <Percent size={16} /> Renewal Discount:
                </span>
                <span className="text-[#0EA5E9] font-semibold">
                  - Rs {discount}
                </span>
              </div>
              <div className="flex justify-between items-center border-t pt-2 border-dashed border-gray-300 mt-2">
                <span className="font-bold text-[#2E2E2E] text-lg">
                  Net Payable
                </span>
                <span className="font-bold text-lg text-[#E26300]">
                  Rs {net}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-col sm:flex-row justify-end gap-4 px-8 pb-6">
          <button
            className="px-6 py-2.5 rounded-md border border-gray-300 bg-white text-[#2E2E2E] hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
            onClick={() => setOpenRenewPlanModal(false)}
          >
            <XCircle className="h-5 w-5" />
            Cancel
          </button>
          <button
            className="px-6 py-2.5 rounded-md text-white bg-[#E26300] hover:bg-[#D25200] transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
            onClick={() => setConfirmAction(true)}
          >
            <CheckCircle className="h-5 w-5" />
            Confirm Renewal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRenewPlanModal;
