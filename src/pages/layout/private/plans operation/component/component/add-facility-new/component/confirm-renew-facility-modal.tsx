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
import { useListFacilitiesStore } from "@/pages/layout/private/list/gymoperatiions/facilities/store";

const ConfirmRenewPlanModal = () => {
  const {
    setConfirmAction,
    facilitiesData,
    setFacilitiesData,

    setOpenRenewFacilityModal,
  } = usePlansOperationFormStore();
  const { facilities } = useListFacilitiesStore();

  const facility = facilities.find(
    (p) => p.id === Number(facilitiesData?.facilityId)
  );
  if (facility) {
    facility.price = Number(facilitiesData?.originalPrice) || 0;
  }

  // Calculate end date based on the facility's duration and start date
  useEffect(() => {
    if (facilitiesData?.days && facilitiesData?.startDate) {
      const startDate = new NepaliDate(facilitiesData?.startDate as string);
      startDate.setDate(startDate?.getDate() + facilitiesData?.days);
      const endDate = startDate?.toString();
      setFacilitiesData({
        ...facilitiesData,
        endDate,
      });
    }
    // eslint-disable-next-line
  }, [facilitiesData?.days, facilitiesData?.startDate]);

  // Net price calculation
  const price = facility?.price || 0;
  const discount = Number(facilitiesData?.discount) || 0;
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
                Confirm Details
              </h3>
              <p className="text-[#4B5563] text-sm">
                Please review the facility and renewal information before
                confirming.
              </p>
            </div>
          </div>
          <button
            className="text-gray-400 hover:text-[#E26300] transition-all p-2"
            onClick={() => setOpenRenewFacilityModal(false)}
            title="Close"
          >
            <XCircle size={28} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full px-8 py-6">
          {/* Failities Details */}
          {facility && (
            <div className="bg-[#F9FAFB] border border-gray-100 p-6 rounded-xl shadow-sm mb-6 md:mb-0 md:mr-2">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                <Tag className="text-[#E26300]" size={20} />
                <h4 className="text-lg font-semibold text-[#2E2E2E]">
                  Failities Overview
                </h4>
              </div>
              <div className="space-y-4 text-base">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600 flex items-center gap-1">
                    <Tag size={16} /> Failities:
                  </span>
                  <span className="font-semibold text-[#2E2E2E]">
                    {facility?.facilityName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600 flex items-center gap-1">
                    <Calendar size={16} /> Start:
                  </span>
                  <span className="text-[#2E2E2E]">
                    {facilitiesData?.startDate as string}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-600 flex items-center gap-1">
                    <Calendar size={16} /> End:
                  </span>
                  <span className="text-[#2E2E2E]">
                    {facilitiesData?.endDate as string}
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
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-600 flex items-center gap-1">
                  <Gift size={16} /> Base Price:
                </span>
                <span className="text-[#2E2E2E] font-bold">
                  Rs {facility?.price}
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
            onClick={() => setOpenRenewFacilityModal(false)}
          >
            <XCircle className="h-5 w-5" />
            Cancel
          </button>
          <button
            className="px-6 py-2.5 rounded-md text-white bg-[#E26300] hover:bg-[#D25200] transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
            onClick={() => setConfirmAction(true)}
          >
            <CheckCircle className="h-5 w-5" />
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRenewPlanModal;
