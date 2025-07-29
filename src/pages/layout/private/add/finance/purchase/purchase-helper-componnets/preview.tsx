import { useAddPurchaseFormStore } from "../store";
import { Eye, Calendar, CreditCard, FileText,  } from "lucide-react";
import { PaymentMode } from "@/global/components/enums/enums";
import { defaultNepaliDate } from "@/global/config";

const PreviewCard: React.FC = () => {
  const { data } = useAddPurchaseFormStore();

  return (
    <div className="xl:col-span-2">
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden sticky top-6">
        <div className="p-5">
          <h3 className="text-[#1A1A1A] text-sm font-medium mb-4 flex items-center border-b border-gray-100 pb-3">
            <Eye className="h-4 w-4 mr-2 text-[#E26300]" />
            Purchase Preview
          </h3>

          <div className="mt-4 space-y-4">
            {data.partyName && (
              <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
                <h4 className="text-[#2E2E2E]/70 text-xs uppercase tracking-wider mb-2">
                  Supplier
                </h4>
                <p className="text-[#1A1A1A] font-medium text-sm">
                  {data.partyName}
                </p>
                <p className="text-[#2E2E2E]/80 text-xs mt-0.5">
                  {data.partyType || "N/A"}
                </p>
              </div>
            )}

            <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
              <h4 className="text-[#2E2E2E]/70 text-xs uppercase tracking-wider mb-2">
                Payment Details
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[#2E2E2E]/70 text-xs">Payment Mode</p>
                  <div className="flex items-center text-[#2E2E2E] mt-1 text-sm">
                    <CreditCard size={13} className="mr-1.5 text-[#E26300]" />
                    <span>{data.paymentMode || "Not selected"}</span>
                  </div>
                </div>
                <div>
                  <p className="text-[#2E2E2E]/70 text-xs">Date</p>
                  <div className="flex items-center text-[#2E2E2E] mt-1 text-sm">
                    <Calendar size={13} className="mr-1.5 text-[#E26300]" />
                    <span>{data.date || defaultNepaliDate.toString()}</span>
                  </div>
                </div>
              </div>

              {data.billNo && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-[#2E2E2E]/70 text-xs">Bill Number</p>
                  <div className="flex items-center text-[#2E2E2E] mt-1 text-sm">
                    <FileText size={13} className="mr-1.5 text-[#E26300]" />
                    <span>{data.billNo}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
              <h4 className="text-[#2E2E2E]/70 text-xs uppercase tracking-wider mb-2">
                Items
              </h4>
              <div className="space-y-2">
                {data.purchaseItemsReq && data.purchaseItemsReq.length > 0 ? (
                  data.purchaseItemsReq.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-b-0 last:pb-0"
                    >
                      <span className="text-[#1A1A1A] text-sm">
                        {item.itemName || "Unnamed item"}
                      </span>
                      <span className="text-[#2E2E2E]/80 text-xs">
                        {item.quantity} x NPR {item.price.toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-[#2E2E2E]/50 italic text-xs">No items added</p>
                )}
              </div>
            </div>

            <div className="bg-[#E26300]/5 rounded-lg p-4 border border-[#E26300]/10">
              <div className="flex justify-between items-center">
                <h4 className="text-[#E26300] font-medium text-sm">Total Amount</h4>
                <p className="text-[#1A1A1A] text-base font-bold">
                  NPR {data.totalAmt ? data.totalAmt.toFixed(2) : "0.00"}
                </p>
              </div>
              {data.paymentMode === PaymentMode.PARTIAL_CREDIT &&
                data.partialAmt && (
                  <div className="mt-2 pt-2 border-t border-[#E26300]/10 flex justify-between items-center">
                    <h4 className="text-[#E26300] font-medium text-sm">
                      Partial Payment
                    </h4>
                    <p className="text-[#1A1A1A] text-sm">
                      NPR {data.partialAmt.toFixed(2)}
                    </p>
                  </div>
                )}
            </div>

            {data.notes && (
              <div className="bg-[#FAFAFA] rounded-lg p-4 border border-gray-100">
                <h4 className="text-[#2E2E2E]/70 text-xs uppercase tracking-wider mb-2">
                  Notes
                </h4>
                <p className="text-[#2E2E2E] text-xs">{data.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;